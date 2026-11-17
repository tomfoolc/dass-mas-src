import React from "react";
import { connect, useSelector } from "react-redux";

import Constant from "@/constant/Constant";

import { goToPage, validSWDRefNo } from "@/dass/common/DASSUtils";

import { IAppData, IPatientData, IUserConfig } from "@/interface";

import {
  getApplicationByHKID,
  updateApplicationStore,
  getPatientData,
} from "@/reducers";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";

import { Button } from "@/layouts";

import CMSPatientHeader from "./components/CMSPatientHeader";
import TopMenu from "./TopMenu";
import ErrorPage from "../common/ErrorPage";
import ShowAppRecord from "./ShowAppRecord";
import AppConstant from "@/constant/AppConstant";
import CommonFunc from "@/common/CommonFunc";
import InputDaRefNo from "./components/InputDaRefNo";

interface StateProps {
  das_data: {
    PatientData: IPatientData;
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  getApplicationByHKID: (hkid: string) => Promise<any>;
  updateApplicationStore: (appData: IAppData) => void;
  getPatientData: (hkid: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getApplicationByHKID,
  updateApplicationStore,
  getPatientData,
};

const CMSAppPanel = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);

  const patientDataState = useSelector(
    (state: StateProps) => state.das_data.PatientData
  );

  const [appData, setAppData] = React.useState<any[]>([]);

  const [enableCreateApp] = React.useState(true);
  const [sysRoleCaseCreator] = React.useState(
    userState.role?.creator ? userState.role?.creator : "0"
  );

  const [hkid] = React.useState(
    patientDataState.hkid ? patientDataState.hkid : ""
  );

  React.useEffect(() => {
    const SearchAppData = async () => {
      if (hkid !== "") {
        DassCommonRef.current?.handleLoadingOpen(
          "Retrieving applications... Please wait"
        );

        const { getApplicationByHKID } = props;
        const response = await getApplicationByHKID(hkid);
        if (response.ret_cde === Constant.API_SUCCESS) {
          setAppData(response.result);
        }
        DassCommonRef.current?.handleLoadingClose();
      }
    };

    SearchAppData();
  }, [props, hkid]);

  const inputSWDRefNo = () => {
    let modalContent = (
      <div>
        <div>
          <InputDaRefNo
            maxLength={10}
            remarkText={"Please input SSFU Ref.: [e.g. AAAS000000]"}
            buttonText={"Confirm"}
            closeInputDialog={createAppHandler}
          />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const createAppHandler = async (daRefNo: string) => {
    if (daRefNo && daRefNo.trim() === "") {
      DassCommonRef.current?.handleDialogOpen("Please input SSFU Ref.");
      return;
    } else if (daRefNo && !validSWDRefNo(daRefNo)) {
      DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
      return;
    } else {
      DassCommonRef.current?.handleLoadingOpen(
        "Creating applications... Please wait"
      );
    }

    const { getPatientData } = props;

    const response = await getPatientData(hkid);

    if (
      response.ret_cde === Constant.API_SUCCESS &&
      (response.ret_msg === null || response.ret_msg === "")
    ) {
      const { updateApplicationStore } = props;

      let appData = response.result;
      let app_date = CommonFunc.Date.today();
      let app_status = AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE;
      let da_app_no = "";
      let document_type = AppConstant.DASS_DOC_TYPE.HKIC;
      let app_type = AppConstant.DASS_APP_TYPE.NEW;
      let da_ref_no = daRefNo;

      let treat_hospital_type = AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL;
      let treat_hospital_cde = userState.hospital_cde;
      let treat_specialty_type = AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY;

      let create_by_hosp = userState.hospital_cde;
      let create_by_unit = userState.unit_code;
      let create_by_unit_type = userState.unit_type;
      let create_by = userState.user_id;

      let upd_by_hosp = userState.hospital_cde;
      let upd_by_unit = userState.unit_code;
      let upd_by_unit_type = userState.unit_type;
      let upd_by = userState.user_id;

      let ax_hospital_type = userState.clinic_code === "" ? AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL : AppConstant.DASS_HOSPITAL_TYPE.CLINIC;

      let ax_hospital_cde = userState.hospital_cde;
      let ax_clinic_code = userState.clinic_code;

      let ax_specialty_type =
        userState.unit_type === "MSSU"
          ? AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
          : userState.specialty
          ? AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
          : AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD;

      let ax_specialty_ward = userState.specialty
        ? userState.specialty
        : userState.ward || "";

      let remark = "";
      let next_follow_up_dte = "";
      let treat_specialty_ward = "";
      let treat_ref_no = "";
      let patient_cond = "";
      let med_rpt_attached = "";
      let form_return_dte = "";
      let contact = "";
      let contact_no = "";
      let msg_to_doctor = "";

      let maf_req_part2 = 1;
      let maf_req_part3 = 1;
      let maf_req_part4 = 1;
      let maf_req_part5 = 1;
      let maf_req_part6 = 1;
      let maf_req_part7 = 1;
      let is_above15 = 1;

      if (appData.age < 15) {
        is_above15 = 0;
      }

      if (appData.age < 18) {
        maf_req_part5 = 0;
      }

      appData = {
        ...appData,

        da_app_no,
        app_date,
        app_status,
        document_type,
        app_type,

        treat_hospital_type,
        treat_hospital_cde,
        treat_specialty_type,

        create_by_hosp,
        create_by_unit,
        create_by_unit_type,
        create_by,

        ax_hospital_type,
        ax_hospital_cde,
        ax_clinic_code,

        upd_by_hosp,
        upd_by_unit,
        upd_by_unit_type,
        upd_by,

        is_above15,
        maf_req_part2,
        maf_req_part3,
        maf_req_part4,
        maf_req_part5,
        maf_req_part6,
        maf_req_part7,

        ax_specialty_type,
        ax_specialty_ward,
        remark,
        treat_specialty_ward,
        treat_ref_no,
        patient_cond,
        med_rpt_attached,
        contact,
        contact_no,
        next_follow_up_dte,
        form_return_dte,
        msg_to_doctor,
      };

      appData = {
        ...appData,
        da_type: AppConstant.DASS_TYPE.REFER_FROM_SWD,
        da_ref_no,
      };

      updateApplicationStore(appData);

      setTimeout(() => {
        DassCommonRef.current?.handleLoadingClose();
        goToPage(Constant.CREATEAPP);
      }, Constant.DELAY);
    } else {
      DassCommonRef.current?.handleDialogOpen("Error : " + response.ret_msg);
      DassCommonRef.current?.handleLoadingClose();
    }
  };

  let pageContent = <ErrorPage />;

  if (hkid !== "") {
    pageContent = (
      <div className="page">
        <div id="mafapp_topmenu">
          <TopMenu isCMSLogon={true} />
        </div>

        <div className="header"></div>

        <CMSPatientHeader hkid={hkid} />

        <div className="alignRight">
          {enableCreateApp && sysRoleCaseCreator === "1" ? (
            <Button
              text="New Application"
              style={{ width: "200px" }}
              onClick={inputSWDRefNo}
            />
          ) : (
            <br />
          )}
        </div>

        <div>
          <ShowAppRecord appData={appData} />
        </div>

        <DassCommon ref={DassCommonRef} mdWidth={450} mdHeight={100} />
      </div>
    );
  }

  return pageContent;
};

export default connect(null, mapDispatchToProps)(CMSAppPanel);
