import Constant from "@/constant/Constant";
import Api from "@/constant/Api";
import ActionConstant from "../constant";

import {
  IUserConfig,
  IUserRole,
  IHospitalList,
  IClinicList,
  IUnitList,
  ISubUnitList,
  IChangeReason,
  IPatientData,
  ISystemData,
  IReportConfig,
} from "@/interface";

const ACTION_SET_USER_INFO = (
  userdata: IUserConfig,
  userrole: IUserRole,
  hosplist: IHospitalList,
  cliniclist: IClinicList,
  unitlist: IUnitList,
  subunitlist: ISubUnitList,
  changereasonlist: IChangeReason,
  reportconfig: IReportConfig
) => ({
  type: ActionConstant.SET_USER_INFO,
  userData: userdata,
  userRoleData: userrole,
  hospitallistData: hosplist,
  cliniclistData: cliniclist,
  unitlistData: unitlist,
  subunitlistData: subunitlist,
  changereasonData: changereasonlist,
  reportConfigData: reportconfig
});

const ACTION_UPDATE_PATIENT_DATA = (patientData: IPatientData) => ({
  type: ActionConstant.UPDATE_PATIENT_DATA,
  patientData: patientData,
});

const ACTION_UPDATE_SYSTEM_STATE = (appState: ISystemData) => ({
  type: ActionConstant.UPDATE_SYSTEM_STATE,
  appStateData: appState,
});

export const getUserConfig =
  (hospital_cde: string, user_id: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_USER_CONFIG,
        [Constant.FETCH_HEADERS]: { hospital_cde, user_id },
        [Constant.FETCH_REQUEST_BODY]: {},
      });

      if (response.ret_cde === Constant.API_SUCCESS && response !== null) {

        if (response.result.cmspatient !== null) {
          dispatch(ACTION_UPDATE_PATIENT_DATA(response.result.cmspatient));
        }
        if (
          response.result.hospitallist !== null &&
          response.result.cliniclist !== null &&
          response.result.unitlist !== null &&
          response.result.subunitlist !== null
        ) {
          dispatch(
            ACTION_SET_USER_INFO(
              response.result.userinfo,
              response.result.userrole,
              response.result.hospitallist,
              response.result.cliniclist,
              response.result.unitlist,
              response.result.subunitlist,
              response.result.changereasonlist,
              response.result.reportconfig
            )
          );
        } else {
          let hosplist: IHospitalList = { cluster_cde : "ALL", hospital_cde : "ALL"};
          let cliniclist: IClinicList = {};
          let unitlist: IUnitList = {};
          let subunitlist: ISubUnitList = {};
          let changereasonlist: IChangeReason = {};
          dispatch(
            ACTION_SET_USER_INFO(
              response.result.userinfo,
              response.result.userrole,
              hosplist,
              cliniclist,
              unitlist,
              subunitlist,
              changereasonlist,
              response.result.reportconfig
            )
          );
        }
        let masterData = {
          ...{ isAuthenticated: true },
        };
        dispatch(ACTION_UPDATE_SYSTEM_STATE(masterData));
      }
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const getDoctorList =
  (hospital_cde: string, user_id: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_DOCTOR_LIST,
        [Constant.FETCH_HEADERS]: { hospital_cde, user_id },
        [Constant.FETCH_REQUEST_BODY]: {},
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const getHospitalList =
  (hospital_cde: string, user_id: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_HOSPITAL_LIST,
        [Constant.FETCH_HEADERS]: { hospital_cde, user_id },
        [Constant.FETCH_REQUEST_BODY]: {},
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const getUnitList =
  (hospital_cde: string, user_id: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_UNIT_LIST,
        [Constant.FETCH_HEADERS]: { hospital_cde, user_id },
        [Constant.FETCH_REQUEST_BODY]: {},
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };
