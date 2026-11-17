import ActionConstant from "../constant";
import Session from "../../common/SessionStorage";
import SessionVar from "@/constant/SessionVar";
import { ISystemData } from "@/interface";

interface ISystemAction {
  type: string;
  appStateData: ISystemData;
}

const initUserData: ISystemData = {};

export const SystemData = (state = initUserData, action: ISystemAction) => {
  let dassStateData = [];
  let dassState = {};

  if (Session.checkSession(SessionVar.DASS_DATA)) {
    dassStateData = JSON.parse(
      Session.getSession(SessionVar.DASS_DATA) || "{}"
    );
  }

  if (dassStateData.SYSTEM_DATA !== undefined) {
    let data = dassStateData.SYSTEM_DATA;
    state = {
      ...state,
      ...data,
    };
  }

  switch (action.type) {
    case ActionConstant.UPDATE_SYSTEM_STATE:
      state = {
        ...state,
        ...action.appStateData,
      };

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        SYSTEM_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    default:
      return state;
  }

};
