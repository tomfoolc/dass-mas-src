import ActionConstant from "../constant";

import Session from "../../common/SessionStorage";
import SessionVar from "@/constant/SessionVar";
import { IClinicList, IHospitalList, IOptionRptItem, IReportConfig, ISubUnitList, IUnitList, IUserConfig, IChangeReason } from "@/interface";
import { destroySession } from "@/dass/common/DASSUtils";
import AppConstant from "@/constant/AppConstant";

interface IUserConfigAction {
  type: string;
  userData: IUserConfig;
  userRoleData: [];
  hospitallistData: Array<IHospitalList>;
  cliniclistData: Array<IClinicList>;
  unitlistData: Array<IUnitList>;
  subunitlistData: Array<ISubUnitList>;
  changereasonData : Array<IChangeReason>;
  reportConfigData: IReportConfig
}

const initUserData = {};

export const UserData = (state = initUserData, action: IUserConfigAction) => {
  let dassStateData = [];
  let dassState = {};

  if (Session.checkSession(SessionVar.DASS_DATA)) {
    dassStateData = JSON.parse(
      Session.getSession(SessionVar.DASS_DATA) || "{}"
    );
  }

  if (dassStateData.USER_CONFIG_DATA !== undefined) {
    let data = dassStateData.USER_CONFIG_DATA;
    state = {
      ...state,
      ...data
    };
  }

  switch (action.type) {
    case ActionConstant.SET_USER_INFO:
      
      let aryHospital = [];
      let optHospitalList: Array<IOptionRptItem> = [];
      optHospitalList.push({ id: "ALL", displayText: "ALL", value: "ALL", cluster: "ALL" });

      for (let i = 0; i < action.hospitallistData.length; i++) {
        aryHospital.push([
          action.hospitallistData[i].hospital_cde +
          " - " +
          action.hospitallistData[i].hospital_eng_name,
          action.hospitallistData[i].hospital_cde,
        ]);

        let clusterCde = action.hospitallistData[i].cluster_cde;
        let hospitalCde = action.hospitallistData[i].hospital_cde;

        if (clusterCde?.trim() !== "HO") {
          if (action.hospitallistData[i].hospital_cde !== null) {
            optHospitalList.push({
              id: hospitalCde,
              displayText: hospitalCde,
              value: hospitalCde,
              cluster: clusterCde
            });
          }
        }
      }

      let aryClinic = [];
      for (let i = 0; i < action.cliniclistData.length; i++) {
        aryClinic.push([
          action.cliniclistData[i].clinic_desc,
          action.cliniclistData[i].clinic_cde,
        ]);
      }

      let arySpecialty = [];
      for (let i = 0; i < action.unitlistData.length; i++) {
        if (
          action.unitlistData[i].unit_type === AppConstant.DASS_UNIT_TYPE.SPEC
        )
          arySpecialty.push([
            action.unitlistData[i].unit_short_desc,
            action.unitlistData[i].unit_code,
          ]);
      }

      let aryWard = [];
      for (let i = 0; i < action.unitlistData.length; i++) {
        if (
          action.unitlistData[i].unit_type === AppConstant.DASS_UNIT_TYPE.WARD
        )
          aryWard.push([
            action.unitlistData[i].unit_short_desc,
            action.unitlistData[i].unit_code,
          ]);
      }

      let reportConfig: IReportConfig = {
        cluster_cde : action.reportConfigData.cluster_cde,
        hospitalOptList : optHospitalList,
      };

      state = {
        ...state,
        ...action.userData,
        role: action.userRoleData,
        hospitalListAry: aryHospital,
        clinicListAry: aryClinic,
        specialtyListAry: arySpecialty,
        wardListAry: aryWard,
        subUnitList: action.subunitlistData,
        changeReasonList: action.changereasonData,
        reportConfig: reportConfig,
      };

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        USER_CONFIG_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    case ActionConstant.UPDATE_USER_PROFILE:
      state = {
        ...state,
        ...action.userData,
        role: action.userRoleData,
      };

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        USER_CONFIG_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    case ActionConstant.SET_USER_CONFIG:
      state = {
        ...state,
        ...action.userData,
        unit: action.userData.unit_code,
        specialty: action.userData.specialty,
        ward: action.userData.ward,
        reportConfig: action.reportConfigData,
      };

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        USER_CONFIG_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    case ActionConstant.LOGOUT_SYSTEM:
      destroySession();
      return state;
    default:
      return state;
  }

};
