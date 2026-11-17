import Constant from "./Constant";
import { ApiEndpoint } from "./ApiConfig";

const Api_type = {
  Application: "Application",
  Maintenance: "Maintenance",
  Patient: "Patient",
  System: "System",
  User: "User",
  Report: "Report",
};

const Api = {
  // Application
  GET_APPLICATION_BY_APPNO: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_APPLICATION_BY_APPNO
  ),
  GET_APPLICATION_BY_HKID: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_APPLICATION_BY_HKID
  ),
  GET_APPLICATION_LIST: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_APPLICATION_LIST
  ),
  NEW_APPLICATION_CHECK: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.NEW_APPLICATION_CHECK
  ),
  NEW_APPLICATION: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.NEW_APPLICATION
  ),
  UPDATE_APPLICATION: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.UPDATE_APPLICATION
  ),
  CHANGE_APP_STATUS: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.CHANGE_APP_STATUS
  ),
  ASSIGN_DOCTOR: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.ASSIGN_DOCTOR
  ),
  REOPEN_APP: getEnvironmentEndPoint(Api_type.Application, Constant.REOPEN_APP),
  RECALL_APP: getEnvironmentEndPoint(Api_type.Application, Constant.RECALL_APP),
  CANCEL_APP: getEnvironmentEndPoint(Api_type.Application, Constant.CANCEL_APP),
  SET_SIGN_METHOD: getEnvironmentEndPoint(Api_type.Application, Constant.SET_SIGN_METHOD),

  GET_APPLICATION_LOG: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_APPLICATION_LOG
  ),
  GET_MESSAGE_CENTER: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_MESSAGE_CENTER
  ),
  ADD_MESSAGE_CENTER: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.ADD_MESSAGE_CENTER
  ),
  GET_UNREAD_MESSAGE_CNT: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_UNREAD_MESSAGE_CNT
  ),
  MARK_UNREAD_MESSAGE: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.MARK_UNREAD_MESSAGE
  ),

  CREATE_DAMAF_PRINTOUT: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.CREATE_DAMAF_PRINTOUT
  ),

  GET_DAMAF_PRINTOUT: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_DAMAF_PRINTOUT
  ),

  GET_ESIGNED_DAMAF: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_ESIGNED_DAMAF
  ),

  APPLY_ESIGNATURE: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.APPLY_ESIGNATURE
  ),

  GET_PATIENT_INFO: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.GET_PATIENT_INFO
  ),

  EDIT_APP_DATE: getEnvironmentEndPoint(
    Api_type.Application,
    Constant.EDIT_APP_DATE
  ),  

  //Maintenance
  GET_OWN_USER_ACC: getEnvironmentEndPoint(
    Api_type.Maintenance,
    Constant.GET_OWN_USER_ACC
  ),
  GET_USER_ACC: getEnvironmentEndPoint(
    Api_type.Maintenance,
    Constant.GET_USER_ACC
  ),
  CREATE_USER_ACC: getEnvironmentEndPoint(
    Api_type.Maintenance,
    Constant.CREATE_USER_ACC
  ),
  UPDATE_USER_ACC: getEnvironmentEndPoint(
    Api_type.Maintenance,
    Constant.UPDATE_USER_ACC
  ),
  RESET_SECRET_KEY: getEnvironmentEndPoint(
    Api_type.Maintenance,
    Constant.RESET_SECRET_KEY
  ),

  // System
  DASS_AUTH: getEnvironmentEndPoint(Api_type.System, Constant.DASS_AUTH),
  CHECK_USER_SESSION: getEnvironmentEndPoint(
    Api_type.System,
    Constant.CHECK_USER_SESSION
  ),
  GET_lOGIN_HOSP: getEnvironmentEndPoint(
    Api_type.System,
    Constant.GET_lOGIN_HOSP
  ),

  // User
  GET_USER_CONFIG: getEnvironmentEndPoint(
    Api_type.User,
    Constant.GET_USER_CONFIG
  ),
  GET_DOCTOR_LIST: getEnvironmentEndPoint(
    Api_type.User,
    Constant.GET_DOCTOR_LIST
  ),
  GET_HOSPITAL_LIST: getEnvironmentEndPoint(
    Api_type.User,
    Constant.GET_HOSPITAL_LIST
  ),
  GET_UNIT_LIST: getEnvironmentEndPoint(Api_type.User, Constant.GET_UNIT_LIST),
  UPDATE_USER_PROFILE: getEnvironmentEndPoint(
    Api_type.User,
    Constant.UPDATE_USER_PROFILE
  ),
  CHANGE_USER_SECRET: getEnvironmentEndPoint(
    Api_type.User,
    Constant.CHANGE_USER_SECRET
  ),

  // Report
  GET_RPT_APPLICATION_DETAIL: getEnvironmentEndPoint(
    Api_type.Report,
    Constant.GET_RPT_APPLICATION_DETAIL
  ),
  GET_RPT_APPLICATION_UTILS: getEnvironmentEndPoint(
    Api_type.Report,
    Constant.GET_RPT_APPLICATION_UTILS
  ),
  GET_RPT_CHANGE_STATUS_REASON: getEnvironmentEndPoint(
    Api_type.Report,
    Constant.GET_RPT_CHANGE_STATUS_REASON
  ),
};

function getEnvironmentEndPoint(type: string, name: string) {
  if (type === Api_type.Application) {
    switch (name) {
      case Constant.GET_APPLICATION_BY_APPNO:
        return ApiEndpoint.GET_APPLICATION_BY_APPNO;
      case Constant.GET_APPLICATION_BY_HKID:
        return ApiEndpoint.GET_APPLICATION_BY_HKID;
      case Constant.GET_APPLICATION_LIST:
        return ApiEndpoint.GET_APPLICATION_LIST;
      case Constant.NEW_APPLICATION_CHECK:
        return ApiEndpoint.NEW_APPLICATION_CHECK;
      case Constant.NEW_APPLICATION:
        return ApiEndpoint.NEW_APPLICATION;
      case Constant.UPDATE_APPLICATION:
        return ApiEndpoint.UPDATE_APPLICATION;
      case Constant.ASSIGN_DOCTOR:
        return ApiEndpoint.ASSIGN_DOCTOR;
      case Constant.CHANGE_APP_STATUS:
        return ApiEndpoint.CHANGE_APP_STATUS;
      case Constant.REOPEN_APP:
        return ApiEndpoint.REOPEN_APP;
      case Constant.RECALL_APP:
        return ApiEndpoint.RECALL_APP;
      case Constant.CANCEL_APP:
        return ApiEndpoint.CANCEL_APP;
      case Constant.SET_SIGN_METHOD:
        return ApiEndpoint.SET_SIGN_METHOD;
      case Constant.EDIT_APP_DATE:
        return ApiEndpoint.EDIT_APP_DATE;

      case Constant.GET_APPLICATION_LOG:
        return ApiEndpoint.GET_APPLICATION_LOG;
      case Constant.GET_MESSAGE_CENTER:
        return ApiEndpoint.GET_MESSAGE_CENTER;
      case Constant.ADD_MESSAGE_CENTER:
        return ApiEndpoint.ADD_MESSAGE_CENTER;
      case Constant.GET_UNREAD_MESSAGE_CNT:
        return ApiEndpoint.GET_UNREAD_MESSAGE_CNT;
      case Constant.MARK_UNREAD_MESSAGE:
        return ApiEndpoint.MARK_UNREAD_MESSAGE;

      case Constant.CREATE_DAMAF_PRINTOUT:
        return ApiEndpoint.CREATE_DAMAF_PRINTOUT;
      case Constant.GET_DAMAF_PRINTOUT:
        return ApiEndpoint.GET_DAMAF_PRINTOUT;
      case Constant.APPLY_ESIGNATURE:
        return ApiEndpoint.APPLY_ESIGNATURE;
      case Constant.GET_ESIGNED_DAMAF:
        return ApiEndpoint.GET_ESIGNED_DAMAF;

      case Constant.GET_PATIENT_INFO:
        return ApiEndpoint.GET_PATIENT_INFO;

      default:
        return null;
    }
  } else if (type === Api_type.Maintenance) {
    switch (name) {
      case Constant.GET_OWN_USER_ACC:
        return ApiEndpoint.GET_OWN_USER_ACC;
      case Constant.GET_USER_ACC:
        return ApiEndpoint.GET_USER_ACC;
      case Constant.CREATE_USER_ACC:
        return ApiEndpoint.CREATE_USER_ACC;
      case Constant.UPDATE_USER_ACC:
        return ApiEndpoint.UPDATE_USER_ACC;
      case Constant.RESET_SECRET_KEY:
        return ApiEndpoint.RESET_SECRET_KEY;
      default:
        return null;
    }
  } else if (type === Api_type.System) {
    switch (name) {
      case Constant.DASS_AUTH:
        return ApiEndpoint.DASS_AUTH;
      case Constant.CHECK_USER_SESSION:
        return ApiEndpoint.CHECK_USER_SESSION;
      case Constant.GET_lOGIN_HOSP:
        return ApiEndpoint.GET_lOGIN_HOSP;
      default:
        return null;
    }
  } else if (type === Api_type.User) {
    switch (name) {
      case Constant.GET_USER_CONFIG:
        return ApiEndpoint.GET_USER_CONFIG;
      case Constant.GET_DOCTOR_LIST:
        return ApiEndpoint.GET_DOCTOR_LIST;
      case Constant.GET_HOSPITAL_LIST:
        return ApiEndpoint.GET_HOSPITAL_LIST;
      case Constant.GET_UNIT_LIST:
        return ApiEndpoint.GET_UNIT_LIST;
      case Constant.UPDATE_USER_PROFILE:
        return ApiEndpoint.UPDATE_USER_PROFILE;
      case Constant.CHANGE_USER_SECRET:
        return ApiEndpoint.CHANGE_USER_SECRET;
      default:
        return null;
    }
  } else if (type === Api_type.Report) {
    switch (name) {
      case Constant.GET_RPT_APPLICATION_DETAIL:
        return ApiEndpoint.GET_RPT_APPLICATION_DETAIL;
      case Constant.GET_RPT_APPLICATION_UTILS:
        return ApiEndpoint.GET_RPT_APPLICATION_UTILS;
      case Constant.GET_RPT_CHANGE_STATUS_REASON:
        return ApiEndpoint.GET_RPT_CHANGE_STATUS_REASON;
      default:
        return null;
    }
  }

  return null;
}

export default Api;
