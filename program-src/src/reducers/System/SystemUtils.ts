import Constant from "@/constant/Constant";
import Api from "@/constant/Api";
import ActionConstant from "../constant";
import { ISystemData } from "@/interface";

const ACTION_UPDATE_SYSTEM_STATE = (appState: ISystemData) => ({
  type: ActionConstant.UPDATE_SYSTEM_STATE,
  appStateData: appState,
});

export const validateSession = () => async (dispatch: any, getState: any) => {
  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.CHECK_USER_SESSION,
      [Constant.FETCH_REQUEST_BODY]: {},
    });
    return Promise.resolve(response);
  } catch (exception) {
    return Promise.resolve({ ret_cde: Constant.API_FAIL, ret_msg: exception });
  }
};

export const cmsAuthenticate =
  (hospital_cde: string, user_id: string, access_token: string) =>
  async (dispatch: any, getState: any) => {
    let cmslogin = { hospital_cde, user_id, access_token };

    try {
      let masterData = {
        ...cmslogin,
        ...{ isAuthenticated: true, isCMSLogon: true },
      };
      dispatch(ACTION_UPDATE_SYSTEM_STATE(masterData));
      return Promise.resolve({ ret_cde: Constant.API_SUCCESS, ret_msg: "" });
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const ewsAuthenticate =
  (hospital_cde: string, user_id: string, access_token: string) =>
  async (dispatch: any, getState: any) => {
    let cmslogin = { hospital_cde, user_id, access_token };

    try {
      let masterData = {
        ...cmslogin,
        ...{ isAuthenticated: true, isCMSLogon: false },
      };
      dispatch(ACTION_UPDATE_SYSTEM_STATE(masterData));
      return Promise.resolve({ ret_cde: Constant.API_SUCCESS, ret_msg: "" });
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const authenticate =
  (hospital_cde: string, user_id: string, password: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.DASS_AUTH,
        [Constant.FETCH_HEADERS]: { hospital_cde, user_id, password },
        [Constant.FETCH_REQUEST_BODY]: {},
      });

      if (response.ret_cde === Constant.API_SUCCESS) {
        let masterData = {
          ...response.result,
          ...{ isCMSLogon: false },
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

export const updateTokenStore = (access_token: string) => (dispatch: any) => {
  let tokenData = {
    ...{ access_token: access_token },
  };
  dispatch(ACTION_UPDATE_SYSTEM_STATE(tokenData));
};

export const getLoginHospital = () => async (dispatch: any, getState: any) => {
  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.GET_lOGIN_HOSP,
      [Constant.FETCH_HEADERS]: {},
      [Constant.FETCH_REQUEST_BODY]: {},
    });
    return Promise.resolve(response);
  } catch (exception) {
    return Promise.resolve({ ret_cde: Constant.API_FAIL, ret_msg: exception });
  }
};
