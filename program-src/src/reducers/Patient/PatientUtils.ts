import Constant from "@/constant/Constant";
import Api from "@/constant/Api";

export const getPatientData =
  (hkid: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await dispatch({
        [Constant.TYPE]: Constant.API,
        [Constant.FETCH_METHOD]: Constant.GET,
        [Constant.URL]: Api.GET_PATIENT_INFO,
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
