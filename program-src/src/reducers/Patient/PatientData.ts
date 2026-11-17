import ActionConstant from "../constant";
import Session from "../../common/SessionStorage";
import SessionVar from "@/constant/SessionVar";
import { IPatientData } from "@/interface";

interface IPatientAction {
  type: string;
  patientData: IPatientData;
}

const initPatientData: IPatientData = {};

export const PatientData = (state = initPatientData, action: IPatientAction) => {
  let dassStateData = [];
  let dassState = {};

  if (Session.checkSession(SessionVar.DASS_DATA)) {
    dassStateData = JSON.parse(
      Session.getSession(SessionVar.DASS_DATA) || "{}"
    );
  }

  if (dassStateData.PATIENT_DATA !== undefined) {
    let data = dassStateData.PATIENT_DATA;
    state = {
      ...state,
      ...data,
    };
  }

  switch (action.type) {
    case ActionConstant.UPDATE_PATIENT_DATA:
      state = {
        ...state,
        ...action.patientData,
      };

      // To-do-list : Hard code for Testing : Chinese character problem - Begin
      if (
        process.env.REACT_APP_ENV !== "PROD" &&
        action.patientData.hkid === "I5555552"
      ) {
        state = {
          ...state,
          chi_name: "陳民",
        };
      }
      // End

      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        PATIENT_DATA: state,
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return state;

    case ActionConstant.REMOVE_PATIENT_DATA:
      dassStateData = JSON.parse(
        Session.getSession(SessionVar.DASS_DATA) || "{}"
      );
      dassState = {
        ...dassStateData,
        PATIENT_DATA: {},
      };
      Session.setSession(SessionVar.DASS_DATA, JSON.stringify(dassState));
      return initPatientData;
    default:
      return state;
  }
};
