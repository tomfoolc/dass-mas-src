import Constant from "@/constant/Constant";
import Api from "@/constant/Api";
import ActionConstant from "../constant";
import { IAppData, IMessageCenter, IESigature } from "@/interface";

const ACTION_UPDATE_APP_DATA = (appData: IAppData) => ({
  type: ActionConstant.UPDATE_APP_DATA,
  appData: appData,
});

export const getApplicationByAppNo =
  (da_app_no: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_APPLICATION_BY_APPNO,
        [Constant.FETCH_HEADERS]: { da_app_no },
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

export const getApplicationByHKID =
  (hkid: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_APPLICATION_BY_HKID,
        [Constant.FETCH_HEADERS]: { hkid },
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

export const getApplicationList =
  (unit_name: string, specialty_ward: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_APPLICATION_LIST,
        [Constant.FETCH_HEADERS]: { unit_name, specialty_ward },
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

export const newApplicationCheck =
  (hkid: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.NEW_APPLICATION_CHECK,
        [Constant.FETCH_HEADERS]: { hkid },
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

export const createNewApplication =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.NEW_APPLICATION,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const updateApplicationData =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.UPDATE_APPLICATION,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const assignDoctor =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.ASSIGN_DOCTOR,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const changeAppStatus =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.CHANGE_APP_STATUS,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const recallApplication =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.RECALL_APP,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const reopenApplication =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.REOPEN_APP,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

  export const cancelApplication =
    (appData: IAppData) => async (dispatch: any, getState: any) => {
      try {
        const response = await dispatch({
          [Constant.TYPE]: Constant.API,
          [Constant.FETCH_METHOD]: Constant.POST,
          [Constant.URL]: Api.CANCEL_APP,
          [Constant.FETCH_HEADERS]: {},
          [Constant.FETCH_REQUEST_BODY]: appData,
        });
        return Promise.resolve(response);
      } catch (exception) {
        return Promise.resolve({
          ret_cde: Constant.API_FAIL,
          ret_msg: exception,
        });
      }
    };  

  export const setSignMethod =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.SET_SIGN_METHOD,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };  

export const getApplicationLog =
  (da_app_no: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_APPLICATION_LOG,
        [Constant.FETCH_HEADERS]: { da_app_no },
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

export const getMessageCenter =
  (msgData: IMessageCenter) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.GET_MESSAGE_CENTER,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: msgData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const addMessageCenter =
  (msgData: IMessageCenter) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.ADD_MESSAGE_CENTER,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: msgData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const getUnreadMessageCenterCount =
  (msgData: IMessageCenter) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.GET_UNREAD_MESSAGE_CNT,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: msgData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const markUnreadMessage =
  (msgData: IMessageCenter) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.MARK_UNREAD_MESSAGE,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: msgData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

export const updateApplicationStore =
  (appData: IAppData) => (dispatch: any, getState: any) => {
    dispatch(ACTION_UPDATE_APP_DATA(appData));
  };

export const createDAMAFPrintoutData =
  (da_app_no: string, add_esign : string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.CREATE_DAMAF_PRINTOUT,
        [Constant.FETCH_HEADERS]: { da_app_no, add_esign : add_esign},
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

export const getDAMAFPrintoutData =
  (da_app_no: string, printout_type : string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_DAMAF_PRINTOUT,
        [Constant.FETCH_HEADERS]: { da_app_no, printout_type },
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

  export const applyESignature =
  (esign_request: IESigature) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.APPLY_ESIGNATURE,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: esign_request,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };

  export const getESignedDAMAF =
  (da_app_no: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_ESIGNED_DAMAF,
        [Constant.FETCH_HEADERS]: { da_app_no },
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

  export const editAppDate =
  (appData: IAppData) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.EDIT_APP_DATE,
        [Constant.FETCH_HEADERS]: {},
        [Constant.FETCH_REQUEST_BODY]: appData,
      });
      return Promise.resolve(response);
    } catch (exception) {
      return Promise.resolve({
        ret_cde: Constant.API_FAIL,
        ret_msg: exception,
      });
    }
  };  
