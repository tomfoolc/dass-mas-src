let DASSApiServer = process.env.REACT_APP_API_LOCAL_SVR;

if (window.location.origin.toUpperCase().indexOf("DASS-DEV") > 0){
  DASSApiServer = process.env.REACT_APP_API_DEV_SVR;;
} else if (window.location.origin.toUpperCase().indexOf("DASS-SIT") > 0){
  DASSApiServer = process.env.REACT_APP_API_SIT_SVR;;
} else if (window.location.origin.toUpperCase().indexOf("DASS-AAT") > 0){
  DASSApiServer = process.env.REACT_APP_API_AAT_SVR;;
} else if (window.location.origin.toUpperCase().indexOf("DASS-PRD") > 0){
  DASSApiServer = process.env.REACT_APP_API_PRD_SVR;;
}

export const ApiEndpoint = {
  DASS_AUTH: DASSApiServer + "/auth/dass",
  CHECK_USER_SESSION: DASSApiServer + "/auth/renewToken",
  GET_lOGIN_HOSP: DASSApiServer + "/auth/getloginhosp",

  GET_OWN_USER_ACC: DASSApiServer + "/api/user/getuseracc",
  GET_USER_ACC: DASSApiServer + "/api/maint/getuseracc",
  CREATE_USER_ACC: DASSApiServer + "/api/maint/createnewuser",
  UPDATE_USER_ACC: DASSApiServer + "/api/maint/updateuseracc",
  RESET_SECRET_KEY: DASSApiServer + "/api/maint/resetsecretkey",

  UPDATE_USER_PROFILE: DASSApiServer + "/api/user/edituserprofile",
  CHANGE_USER_SECRET: DASSApiServer + "/api/user/changesecret",

  GET_PATIENT_INFO: DASSApiServer + "/api/patient/getpatient",

  GET_USER_CONFIG: DASSApiServer + "/api/user/getuserconfig",
  GET_DOCTOR_LIST: DASSApiServer + "/api/user/getdoctorlist",
  GET_HOSPITAL_LIST: DASSApiServer + "/api/user/gethosplist",
  GET_UNIT_LIST: DASSApiServer + "/api/user/getunitlist",

  GET_APPLICATION_BY_APPNO: DASSApiServer + "/api/app/getappbyappno",
  GET_APPLICATION_BY_HKID: DASSApiServer + "/api/app/getappbyhkid",

  GET_APPLICATION_LIST: DASSApiServer + "/api/app/getapplist",
  NEW_APPLICATION_CHECK: DASSApiServer + "/api/app/newappcheck",
  NEW_APPLICATION: DASSApiServer + "/api/app/newapp",
  UPDATE_APPLICATION: DASSApiServer + "/api/app/updateapp",
  ASSIGN_DOCTOR: DASSApiServer + "/api/app/assigndoctor",
  CHANGE_APP_STATUS: DASSApiServer + "/api/app/changeappstatus",
  REOPEN_APP: DASSApiServer + "/api/app/reopenapp",
  RECALL_APP: DASSApiServer + "/api/app/recallapp",
  CANCEL_APP: DASSApiServer + "/api/app/cancelapp",
  SET_SIGN_METHOD : DASSApiServer + "/api/app/setsignmethod",
  EDIT_APP_DATE: DASSApiServer + "/api/app/editappdate",

  GET_APPLICATION_LOG: DASSApiServer + "/api/app/getapplog",
  GET_MESSAGE_CENTER: DASSApiServer + "/api/app/getmsg",
  ADD_MESSAGE_CENTER: DASSApiServer + "/api/app/addmsg",
  GET_UNREAD_MESSAGE_CNT: DASSApiServer + "/api/app/getunreadmsgcnt",
  MARK_UNREAD_MESSAGE: DASSApiServer + "/api/app/markmsgread",

  CREATE_DAMAF_PRINTOUT: DASSApiServer + "/api/app/createdamafprintout",
  GET_DAMAF_PRINTOUT: DASSApiServer + "/api/app/getdamafprintout",
  APPLY_ESIGNATURE: DASSApiServer + "/api/app/applyesign",
  GET_ESIGNED_DAMAF: DASSApiServer + "/api/app/getesigndamaf",

  GET_RPT_APPLICATION_DETAIL: DASSApiServer + "/api/report/getappdetail",
  GET_RPT_APPLICATION_UTILS: DASSApiServer + "/api/report/getapputils",
  GET_RPT_CHANGE_STATUS_REASON: DASSApiServer + "/api/report/getappchgreason",
};
