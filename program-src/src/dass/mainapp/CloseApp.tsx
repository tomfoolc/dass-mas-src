import React from "react";
import { connect, useSelector } from "react-redux";

import { Label, DatePicker, Button } from "@/layouts";
import { IAppData, IUserConfig } from "@/interface";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { changeAppStatus } from "@/reducers";
import Constant from "@/constant/Constant";
import AppConstant from "@/constant/AppConstant";
import CommonFunc from "@/common/CommonFunc";
import SelectCase from "./components/SelectCase";
import { destroySession } from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  appData: IAppData[];
  closeWindow: () => void;
  changeAppStatus: (appData: IAppData) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  changeAppStatus,
};

const CompleteApp = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const DassCommonLogout = React.useRef<DassCommonRefProps>(null);
  const DassCommonSuccess = React.useRef<DassCommonRefProps>(null);
  const DassCommonFail = React.useRef<DassCommonRefProps>(null);

  const { changeAppStatus } = props;
  const [data] = React.useState(props.appData);
  const [closeDate, setCloseDate] = React.useState(new Date());

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const [selectedIds, setSelectedIds] = React.useState(Array<any>);
  const addSelectIds = (ids: Array<any>) => {
    setSelectedIds(ids);
  };

  const today = new Date();
  const [fromDate, setFromDate] = React.useState(today);
  let toDate = today;

  React.useEffect(() => {
    if (data.length === 1) {
      setSelectedIds([data[0].da_app_no]);
      setFromDate(new Date(data[0].complete_dtm || ""));
    }
  }, [data]);

  const handleLogout = () => {
    destroySession(userState.hospital_cde);
  };

  const handleSuccess = () => {
    props.closeWindow();
  };

  const handleFail = () => {
    props.closeWindow();
  };

  const UpdateCloseDate = async () => {
    if (Object.keys(selectedIds).length === 0) {
      DassCommonRef.current?.handleDialogOpen("Please select a case.");
    } else {
      DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

      for (let i = 0; i <= selectedIds.length - 1; i++) {
        let da_app_no = selectedIds[i];
        const filtered = data.filter((app: any) => {
          return app.da_app_no === da_app_no;
        });

        let result = await CloseApplication(da_app_no, filtered);
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

  const CloseApplication = async (daAppNo: string, filtered: Array<any>) => {
    let appReqData: IAppData = { ...filtered[0] };
    appReqData.app_status = AppConstant.DASS_STATUS_CODE.CLOSED.CODE;
    appReqData.close_dtm = CommonFunc.Date.formatDate(closeDate);
    appReqData.da_app_no = daAppNo;
    appReqData.upd_by_hosp = userState.hospital_cde;
    appReqData.upd_by_unit = userState.unit_code;
    appReqData.upd_by_unit_type = userState.unit_type;
    appReqData.upd_by = userState.user_id;

    const response = await changeAppStatus(appReqData);

    if (response.ret_cde !== Constant.API_SUCCESS) {
      DassCommonFail.current?.handleDialogOpen(
        "[" + daAppNo + "] Fail to close application. Please retry.",
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
            <Label text="Closing Date" style={{ paddingTop: "6px" }} />
            <div style={{ paddingTop: "2px" }}>
              <DatePicker
                value={closeDate}
                minDate={fromDate}
                maxDate={toDate}
                onChange={setCloseDate}
              />
            </div>
            <Button
              text={"Close Application"}
              onClick={UpdateCloseDate}
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

export default connect(null, mapDispatchToProps)(CompleteApp);
