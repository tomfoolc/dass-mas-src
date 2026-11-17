import ActionConstant from "../constant";
import Session from "../../common/SessionStorage";
import SessionVar from "@/constant/SessionVar";
import { IAppData } from "@/interface";

interface ISystemAction {
  type: string;
  appData: IAppData;
}

const initAppData: IAppData = {};

export const AppData = (state = initAppData, action: ISystemAction) => {
  let dassStateData = [];
  let dassState = {};

  if (Session.checkSession(SessionVar.DASS_DATA)) {
    dassStateData = JSON.parse(
      Session.getSession(SessionVar.DASS_DATA) || "{}"
    );
  }

  if (dassStateData.APP_DATA !== undefined) {
    let data = dassStateData.APP_DATA;
    state = {
      ...state,
      ...data
    };
  }

  switch (action.type) {
    case ActionConstant.UPDATE_APP_DATA:
      state = {
        ...state,
        ...action.appData,
      };

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        APP_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    default:
      return state;
  }
};
