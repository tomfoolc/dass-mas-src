import React from "react";
import { connect, useSelector } from "react-redux";

import { Label, Button, AutoComplete } from "@/layouts";
import {
  IAppData,
  IDoctorList,
  IOptionItem,
  IOptionList,
  IUserConfig,
} from "@/interface";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { assignDoctor, getDoctorList } from "@/reducers";
import Constant from "@/constant/Constant";
import SelectCase from "./components/SelectCase";
import { destroySession } from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  appData: any[];
  closeWindow: () => void;
  assignDoctor: (appData: IAppData) => Promise<any>;
  getDoctorList: (hosp_cde: string, user_id: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  assignDoctor,
  getDoctorList,
};

const AssignDoctor = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const DassCommonLogout = React.useRef<DassCommonRefProps>(null);
  const DassCommonSuccess = React.useRef<DassCommonRefProps>(null);
  const DassCommonFail = React.useRef<DassCommonRefProps>(null);

  const { assignDoctor, getDoctorList } = props;

  const [isInit, setIsInit] = React.useState(true);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hospital_cde = userState.hospital_cde ? userState.hospital_cde : "";
  const userID = userState.user_id ? userState.user_id : "";

  const [data] = React.useState(props.appData);
  const [doctor, setDoctor] = React.useState({});
  const [selectedIds, setSelectedIds] = React.useState(Array<any>);
  const addSelectIds = (ids: Array<any>) => {
    setSelectedIds(ids);
  };

  const [doctorlist, setDoctorlist] = React.useState(Array<any>);
  const doctorOnChange = (opt: IOptionItem) => {
    setDoctor(opt);
  };

  React.useEffect(() => {
    const LoadDoctorList = async () => {
      const response = await getDoctorList(hospital_cde, userID);
      if (response.ret_cde === Constant.API_SUCCESS) {
        let arydoctor = [];
        for (const element of response.result) {
          let doctor: IDoctorList = element;
          arydoctor.push({ id: doctor.user_id, displayText: doctor.name + " [" + doctor.user_id + "]", value: doctor.user_id });
        }
        setDoctorlist(arydoctor);
      }
    };

    if (isInit) {
      if (data.length === 1) {
        setSelectedIds([data[0].da_app_no]);
      }
      LoadDoctorList();
      setIsInit(false);
    }

    // eslint-disable-next-line
  }, [data, isInit, hospital_cde, userID]);

  const handleLogout = () => {
    destroySession(userState.hospital_cde);
  };

  const handleSuccess = () => {
    props.closeWindow();
  };

  const handleFail = () => {
    props.closeWindow();
  };

  const handleAssignDoctor = async () => {
    let selectedItem: IOptionList = { ...doctor };
    let assignedDoctor = selectedItem.value || "";

    if (assignedDoctor === "") {
      DassCommonRef.current?.handleDialogOpen("Please select doctor.");
    } else if (Object.keys(selectedIds).length === 0) {
      DassCommonRef.current?.handleDialogOpen("Please select application.");
    } else {
      DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

      for (let i = 0; i <= selectedIds.length - 1; i++) {
        let da_app_no = selectedIds[i];
        let result = await AssignDoctorToApplication(da_app_no, assignedDoctor);
        if (!result) {
          break;
        }

        if (i === selectedIds.length - 1) {
          DassCommonSuccess.current?.handleDialogOpen(
            "Application has been updated.",
            "OK"
          );
        }
      }

      DassCommonRef.current?.handleLoadingClose();
    }
  };

  const AssignDoctorToApplication = async (daAppNo: string, doctor: string) => {
    let appReqData: IAppData = {};
    appReqData.da_app_no = daAppNo;
    appReqData.upd_by_hosp = userState.hospital_cde;
    appReqData.upd_by_unit = userState.unit_code;
    appReqData.upd_by_unit_type = userState.unit_type;
    appReqData.upd_by = userState.user_id;
    appReqData.upd_dtm = data.find(
      (item) => item.da_app_no === daAppNo
    ).upd_dtm;
    appReqData.ax_doctor = doctor;

    const response = await assignDoctor(appReqData);

    if (response.ret_cde !== Constant.API_SUCCESS) {
      DassCommonFail.current?.handleDialogOpen(
        "[" + daAppNo + "] Fail to assign doctor. Please retry.",
        "OK"
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="page">
      <div>
        <div style={{ margin: "4px" }}>
          <div className="row">
            <Label text="Doctor" style={{ paddingTop: "6px" }} />
            <div style={{ paddingTop: "2px" }}>
              <AutoComplete
                value={doctor}
                optList={doctorlist}
                onChange={doctorOnChange}
                width={400}
              />
            </div>
            <Button
              text={"Assign"}
              onClick={handleAssignDoctor}
              style={{ width: "170px" }}
            />
          </div>
        </div>
        <div style={{ height: 450 }}>
          <SelectCase appData={data} setSelectedAppNo={addSelectIds} />
        </div>
      </div>

      <DassCommon ref={DassCommonRef} mdWidth={800} mdHeight={500} />

      <DassCommon ref={DassCommonLogout} confirmCallBack={handleLogout} />

      <DassCommon ref={DassCommonSuccess} confirmCallBack={handleSuccess} />

      <DassCommon ref={DassCommonFail} confirmCallBack={handleFail} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(AssignDoctor);
