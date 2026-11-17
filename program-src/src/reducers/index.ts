import { combineReducers } from "redux";

import { AppData } from "./Application/AppData";
import {
  getApplicationByAppNo,
  getApplicationByHKID,
  getApplicationList,
  newApplicationCheck,
  createNewApplication,
  updateApplicationData,
  assignDoctor,
  changeAppStatus,
  reopenApplication,
  recallApplication,
  cancelApplication,
  setSignMethod,
  getApplicationLog,
  getMessageCenter,
  addMessageCenter,
  getUnreadMessageCenterCount,
  markUnreadMessage,
  updateApplicationStore,
  createDAMAFPrintoutData,
  getDAMAFPrintoutData,
  getESignedDAMAF,
  applyESignature,
  editAppDate,
} from "./Application/AppUtils";

import {
  getOwnUserAcc,
  getUserAcc,
  createUserAcc,
  updateUserAcc,
  updateUserProfile,
  changeUserSecret,
  resetSecretKey,
} from "./Maintenance/MaintUtils";

import { PatientData } from "./Patient/PatientData";
import { getPatientData } from "./Patient/PatientUtils";

import { SystemData } from "./System/SystemData";
import {
  validateSession,
  cmsAuthenticate,
  ewsAuthenticate,
  authenticate,
  updateTokenStore,
  getLoginHospital,
} from "./System/SystemUtils";

import { UserData } from "./User/UserData";

import {
  getUserConfig,
  getDoctorList,
  getHospitalList,
  getUnitList,
} from "./User/UserDataUtils";

import {
  getApplicationDetailReport,
  getApplicationUtilsReport,
  getApplicationChangeReasonReport,
} from "./Report/ReportUtils";

export default combineReducers({
  SystemData,
  AppData,
  PatientData,
  UserData,
});

export {
  getApplicationByAppNo,
  getApplicationByHKID,
  newApplicationCheck,
  createNewApplication,
  updateApplicationData,
  assignDoctor,
  changeAppStatus,
  reopenApplication,
  recallApplication,
  cancelApplication,
  setSignMethod,
  getApplicationLog,
  getMessageCenter,
  addMessageCenter,
  getUnreadMessageCenterCount,
  markUnreadMessage,
  updateApplicationStore,
  createDAMAFPrintoutData,
  getDAMAFPrintoutData,
  getESignedDAMAF,
  applyESignature,
  getPatientData,
  getApplicationList,
  validateSession,
  cmsAuthenticate,
  ewsAuthenticate,
  authenticate,
  updateTokenStore,
  getLoginHospital,
  getUserConfig,
  getDoctorList,
  getHospitalList,
  getUnitList,
  updateUserProfile,
  changeUserSecret,
  getOwnUserAcc,
  getUserAcc,
  createUserAcc,
  updateUserAcc,
  resetSecretKey,
  getApplicationDetailReport,
  getApplicationUtilsReport,
  getApplicationChangeReasonReport,
  editAppDate,
};
