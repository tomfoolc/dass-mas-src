import Constant from "@/constant/Constant";
import Api from "@/constant/Api";

export const getApplicationDetailReport = (type : string, userHospitalCde: string, clusterCde: string, hospitalCde : string, fromDate : string, toDate : string, userSpecialtyWard : string, userUnitType : string) => async (dispatch: any, getState: any) => {

  let user_hospital_cde = userHospitalCde;
  let cluster_cde = clusterCde; 
  let hospital_cde = hospitalCde;
  let from_date = fromDate;
  let to_date = toDate;
  let user_specialty_ward = userSpecialtyWard;
  let user_unit_type = userUnitType;

  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.GET_RPT_APPLICATION_DETAIL,
      [Constant.FETCH_HEADERS]: { type, user_hospital_cde, cluster_cde, hospital_cde, from_date, to_date, user_specialty_ward, user_unit_type },
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

export const getApplicationUtilsReport = (type : string, userHospitalCde: string, clusterCde: string, hospitalCde : string, fromDate : string, toDate : string, userSpecialtyWard : string, userUnitType : string) => async (dispatch: any, getState: any) => {

  let user_hospital_cde = userHospitalCde;
  let cluster_cde = clusterCde; 
  let hospital_cde = hospitalCde;
  let from_date = fromDate;
  let to_date = toDate;
  let user_specialty_ward = userSpecialtyWard;
  let user_unit_type = userUnitType;

  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.GET_RPT_APPLICATION_UTILS,
      [Constant.FETCH_HEADERS]: { type, user_hospital_cde, cluster_cde, hospital_cde, from_date, to_date, user_specialty_ward, user_unit_type },
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

export const getApplicationChangeReasonReport = (type : string, userHospitalCde: string, clusterCde: string, hospitalCde : string, fromDate : string, toDate : string, userSpecialtyWard : string, userUnitType : string) => async (dispatch: any, getState: any) => {

  let user_hospital_cde = userHospitalCde;
  let cluster_cde = clusterCde; 
  let hospital_cde = hospitalCde;
  let from_date = fromDate;
  let to_date = toDate;
  let user_specialty_ward = userSpecialtyWard;
  let user_unit_type = userUnitType;

  try {
    const response = await dispatch({
      [Constant.TYPE]: Constant.API,
      [Constant.FETCH_METHOD]: Constant.GET,
      [Constant.URL]: Api.GET_RPT_CHANGE_STATUS_REASON,
      [Constant.FETCH_HEADERS]: { type, user_hospital_cde, cluster_cde, hospital_cde, from_date, to_date, user_specialty_ward, user_unit_type },
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
