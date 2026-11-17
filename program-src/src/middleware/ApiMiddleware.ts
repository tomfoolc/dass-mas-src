import Session from "../common/SessionStorage";

import SessionVar from "@/constant/SessionVar";
import Constant from "@/constant/Constant";

import { writeLog } from "@/dass/common/DASSUtils";
const TAG = "Api";

const ApiMiddleware = (store: any) => (next: any) => async (action: any) => {
  let { method, url, headers, requestBody = {} } = action;

  if (action.type === Constant.API) {
    let hospital_cde = "";
    let user_id = "";
    let access_token = "";
    let scretAuth = "ZGFzc3N5czpkYXNzcGFzcw==";
    let Authorization = "Basic " + scretAuth;

    let dassStateData = [];
    if (Session.checkSession(SessionVar.DASS_DATA)) {
      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
    }

    if (dassStateData.SYSTEM_DATA !== undefined) {
      let data = dassStateData.SYSTEM_DATA;
      hospital_cde = data.hospital_cde ? data.hospital_cde : "";
      user_id = data.user_id ? data.user_id : "";
      access_token = data.access_token ? data.access_token : "";
    }

    let commonHeader = {};
    if (url.indexOf("/auth/renewToken") >= 0) {
      commonHeader = {
        ...commonHeader,
        Authorization,
        api_key: access_token,
        hospital_cde,
        user_id,
      };
    } else if (url.indexOf("/auth") >= 0) {
      commonHeader = { ...commonHeader, Authorization };
    } else {
      commonHeader = {
        ...commonHeader,
        Authorization,
        "x-gateway-dass-apikey": access_token,
        hospital_cde,
        user_id,
      };
    }

    let commonBody = { hospital_cde, user_id };

    let reqOpts = {};

    if (method === "POST") {
      reqOpts = {
        [Constant.FETCH_METHOD]: method,
        [Constant.FETCH_HEADERS]: {
          [Constant.FETCH_CONTENT_TYPE]: Constant.CONTENT_TYPE_JSON,
          ...commonHeader,
          ...headers,
        },
        [Constant.FETCH_BODY]: JSON.stringify({
          ...commonBody,
          ...requestBody,
        }),
      };
    } else {
      reqOpts = {
        [Constant.FETCH_METHOD]: method,
        [Constant.FETCH_HEADERS]: {           
          ...commonHeader,
          ...headers, 
        },
      };
    }

    try {
      let response;

      writeLog(TAG, "request", [url, reqOpts]);

      response = await Promise.race([
        new Promise((resolve, reject) => {
          // Delay response
          setTimeout(() => {
            handleRoute();
          }, Constant.DELAY);

          function handleRoute(): any {
            return fetch(url, reqOpts)
              .catch((error) => handlError(error))
              .then((response) => handleResult(handleResponse(response)));
          }

          function handleResponse(response: any) {
            if (response !== undefined) {
              if (
                !response.ok ||
                response.status === 401 ||
                response.status === 404
              ) {
                return Promise.reject("Connection error.");
              } else {
                return response.text().then((text: any) => {
                  let result = text && JSON.parse(text);
                  return result;
                });
              }
            } else {
              return {
                ret_cde: Constant.API_FAIL,
                ret_msg: Constant.SYSTEM_ERROR_MSG,
                validation_cde: Constant.CONNECTION_TIMEOUT_VCDE,
                result: null,
              };
            }
          }

          function handleResult(body: any) {
            writeLog(TAG, "response", body);
            resolve(body);
          }

          function handlError(message: string) {
            resolve({
              ret_cde: Constant.API_FAIL,
              ret_msg: Constant.SYSTEM_ERROR_MSG,
              validation_cde: Constant.CONNECTION_TIMEOUT_VCDE,
            });
          }
        }),
      ]);

      return response;
    } catch (exception) {
      return null;
    }
  } else {
    return next(action);
  }
};

export default ApiMiddleware;
