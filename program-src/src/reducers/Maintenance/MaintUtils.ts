import Constant from "@/constant/Constant";
import Api from "@/constant/Api";

import { IUserProfile } from "@/interface";

export const getOwnUserAcc = () => async (dispatch: any, getState: any) => {
  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.GET_OWN_USER_ACC,
      [Constant.FETCH_HEADERS]: {},
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

export const updateUserProfile =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.UPDATE_USER_PROFILE,
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

export const changeUserSecret =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.CHANGE_USER_SECRET,
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

export const getUserAcc =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.GET_USER_ACC,
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

export const createUserAcc =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.CREATE_USER_ACC,
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

export const updateUserAcc =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.UPDATE_USER_ACC,
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

export const resetSecretKey =
  (appData: IUserProfile) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.POST,
        [Constant.URL]: Api.RESET_SECRET_KEY,
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
