import Session from "@/common/SessionStorage";
import CommonFunc from "@/common/CommonFunc";

import Constant from "@/constant/Constant";
import { getEnvironment } from "@/constant/Environment";
import SessionVar from "@/constant/SessionVar";
import AppConstant from "@/constant/AppConstant";

import { IUserRole } from "@/interface";

export function writeLog(
  tag: string = "",
  message: string = "",
  value: any = ""
) {
  switch (getEnvironment()) {
    case Constant.HA:
      return console.log(message, value);
    case Constant.DEBUG:
      return console.log(tag, message, value);
    default:
      return;
  }
}

export function goToPage(url: string) {
  window.location.replace(url);
}

export function destroySession(hospitalCde?: string) {
  Session.removeSession(SessionVar.DASS_DATA);
  if (hospitalCde != null)
    goToPage(Constant.LOGINPAGE + "?&hospital_cde=" + hospitalCde);
  else goToPage(Constant.LOGINPAGE);
}

export function destroyAppData() {
  let dassStateData = [];
  let dassState = {};
  dassStateData = JSON.parse(Session.getSession(SessionVar.DASS_DATA) || "{}");
  dassState = {
    ...dassStateData,
    APP_DATA: {},
  };
  Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
}

export function destroyCMSPatientData() {
  let dassStateData = [];
  let dassState = {};
  dassStateData = JSON.parse(Session.getSession(SessionVar.DASS_DATA) || "{}");
  dassState = {
    ...dassStateData,
    PATIENT_DATA: {},
  };
  Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
}

export function getUrlParam(name: string) {
  let value = new URLSearchParams(document.location.href).get(name);
  return value ? value : "";
}

export function checkUrl(name: string) {
  return document.location.href.indexOf(name) >= 0;
}

export function maskHKID(value: string) {
  if (value.trim.length === 9) {
    return value.substring(0, 6) + "XXX(X)";
  } else return value.substring(0, 5) + "XXX(X)";
}

export function maskPatientEngName(value: string) {
  let lastName = value.substring(0, value.indexOf(","));
  let aryMiddleName = value
    .substring(value.indexOf(",") + 1, value.length)
    .replace(",", " ")
    .trim()
    .split(" ");
  let middleName = "";

  for (const element of aryMiddleName) {
    middleName = middleName + element.substring(0, 1) + "xxx ";
  }

  return lastName + ", " + middleName;
}

export function validSWDRefNo(value: string) {
  value = value || "";
  if (value === "") return false;
  else if (value.length !== 10) return false;
  else if (!CommonFunc.Validate.isAlphabetic(value.substring(0, 3)))
    return false;
  else if (!CommonFunc.Validate.isNumber(value.substring(4, 10))) return false;
  else if (value.charAt(3) !== "S") return false;
  else return true;
}

export function getAppConstantDesc(type: string, value: string) {
  if (type === "DASS_UNIT_TYPE") {
    if (value === AppConstant.DASS_UNIT_TYPE.MSSU) return "MSSU";
    else if (value === AppConstant.DASS_UNIT_TYPE.WARD) return "Ward";
    else if (value === AppConstant.DASS_UNIT_TYPE.SPEC) return "Specialty";
    else return "";
  } else {
    return "";
  }
}

export function getDisplayLength(value: string) {
  let cIdx, iBLength, cValue;
  iBLength = 0;
  cIdx = 0;
  while (cIdx < value.length) {
    cValue = value.charCodeAt(cIdx);
    if (cValue < 0 || cValue > 255) {
      iBLength = iBLength + 2;  //Chinese characters count as 2, for display purpose; oracle should be 3
    } else {
      iBLength = iBLength + 1;
    }
    cIdx = cIdx + 1;
  }
  return iBLength;
}

export function checkAccessPermission(pagePermission: IUserRole, userPermission: IUserRole) {

  if (pagePermission.creator === '1' && pagePermission.creator === userPermission.creator) {
    return true;
  } else if (pagePermission.distributor === '1' && pagePermission.distributor === userPermission.distributor) {
    return true;
  } else if (pagePermission.assessor === '1' && pagePermission.assessor === userPermission.assessor) {
    return true;
  } else if (pagePermission.reviewer === '1' && pagePermission.reviewer === userPermission.reviewer) {
    return true;
  } else if (pagePermission.haits === '1' && pagePermission.haits === userPermission.haits) {
    return true;
  } else if (pagePermission.sysadmin === '1' && pagePermission.sysadmin === userPermission.sysadmin) {
    return true;
  } else if (pagePermission.ho === '1' && pagePermission.ho === userPermission.ho) {
    return true;
  } else if (pagePermission.clustercoord === '1' && pagePermission.clustercoord === userPermission.clustercoord) {
    return true;
  } else {
    return false;
  }

}
