import React from "react";
import { connect, useSelector } from "react-redux";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";

import Constant from "@/constant/Constant";

import { goToPage } from "@/dass/common/DASSUtils";

import { IAppData, IUserConfig } from "@/interface";

import { updateApplicationStore, newApplicationCheck } from "@/reducers";

import { Button, Panel } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { datagridTheme } from "../common/DatagridTheme";
import { PatientGridColDef } from "./components/PatientGrid";
import "../css/ApplicationGrid.css";
import AppConstant from "@/constant/AppConstant";
import CommonFunc from "@/common/CommonFunc";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface AppProps {
  ref: any;
  hkid: string;
  patientData: any[];
  da_ref_no_req?: boolean;
  da_ref_no?: string;
}

interface DispatchProps {
  updateApplicationStore: (appData: IAppData) => void;
  newApplicationCheck: (hkid: string) => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  updateApplicationStore,
  newApplicationCheck,
};

const DisplayPatientResult = React.forwardRef<unknown, Props>((props, ref) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  React.useImperativeHandle(ref, () => ({ GoToApp }));
  function GoToApp() {
    setSelectedIndex(0);
    okHandler();
  }

  const userState = useSelector((state: StateProps) => state.das_data.UserData);

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [data, setData] = React.useState(props.patientData);
  const [lastTap, setLastTap] = React.useState<number | null>(null);

  React.useEffect(() => {
    setData(props.patientData);
    if (props.patientData !== undefined && props.patientData.length === 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [props.patientData]);

  const LoadingToApplication = () => {
    DassCommonRef.current?.handleLoadingOpen(
      "Loading application... Please wait"
    );
    setTimeout(() => {
      DassCommonRef.current?.handleLoadingClose();
      goToPage(Constant.CREATEAPP);
    }, Constant.DELAY);
  };

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    if (params.row.id > 0) {
      setSelectedIndex(params.row.id - 1);
    }
    const now = Date.now();
    const doubleTapThreshold = 300; 
    if (lastTap && (now - lastTap) < doubleTapThreshold) {
      okHandler();
      setLastTap(null);
    } else {
      setLastTap(now);
    }    
  };

  const handleDCEvent: GridEventListener<"rowClick"> = (params) => {
    if (params.row.id > 0) {
      setSelectedIndex(params.row.id - 1);
      okHandler();
    }
  };

  const okHandler = async () => {
    if (selectedIndex !== -1 && data.length > 0) {
      const { newApplicationCheck } = props;
      const response = await newApplicationCheck(props.hkid);

      if (response.ret_cde === Constant.API_SUCCESS) {
        let IsAllowToCreate = true;
        let message = "";
        if (response.result.ret_cde !== Constant.RESULT_SUCCESS) {
          IsAllowToCreate = false;
        }
        message = response.result.ret_msg;
        if (IsAllowToCreate) {
          if (message !== "") {
            DassCommonRef.current?.handleDialogOpen(message, "YN");
          } else {
            StartCreateApp();
          }
        } else {
          DassCommonRef.current?.handleDialogOpen(message);
        }
      }
    } else {
      DassCommonRef.current?.handleDialogOpen("No record.");
    }
  };

  const StartCreateApp = () => {
    const { updateApplicationStore } = props;

    let appData = data[selectedIndex];

    let app_date = CommonFunc.Date.today();
    let app_status = AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE;
    let da_app_no = "";
    let document_type = AppConstant.DASS_DOC_TYPE.HKIC;
    let app_type = AppConstant.DASS_APP_TYPE.NEW;

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

    let ax_sub_spec_ward = "";

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
      ax_sub_spec_ward,
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

    if (props.da_ref_no_req) {
      if (props.da_ref_no !== "") {
        appData = {
          ...appData,
          da_type: AppConstant.DASS_TYPE.REFER_FROM_SWD,
          da_ref_no: props.da_ref_no,
        };
        updateApplicationStore(appData);
        LoadingToApplication();
      } else {
        DassCommonRef.current?.handleDialogOpen("Please input SSFU Ref.");
      }
    } else {
      appData = {
        ...appData,
        da_type: AppConstant.DASS_TYPE.NEW_FROM_MSSU,
        da_ref_no: props.da_ref_no,
      };
      updateApplicationStore(appData);
      LoadingToApplication();
    }
  };

  return (
    <div className="page">
      <Panel
        Header={"Patient Records"}
        Content={
          <ThemeProvider theme={datagridTheme}>
            <div style={{ height: 250 }}>
              <DataGrid
                getRowId={(row) => row.hkid}
                onRowClick={handleEvent}
                onRowDoubleClick={handleDCEvent}
                columns={PatientGridColDef}
                rows={data}
                rowHeight={32}
                autoPageSize
                rowsPerPageOptions={[20]}
                checkboxSelection={false}
              />
            </div>
          </ThemeProvider>
        }
        Footer={<Button text="OK" onClick={okHandler} />}
      />

      <DassCommon ref={DassCommonRef} confirmCallBack={StartCreateApp} />
    </div>
  );
});

export default connect(null, mapDispatchToProps, null, {
  forwardRef: true,
})(DisplayPatientResult);
