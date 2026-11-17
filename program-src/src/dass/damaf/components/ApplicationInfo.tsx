import React from "react";

import { IAppData } from "@/interface";
import { DatePicker, InputControl, Label, ToolTips } from "@/layouts";
import CommonFunc from "@/common/CommonFunc";

interface AppProps {
  daAppObj: IAppData;
  setDaAppObj: (appData: IAppData) => void;
  disabled?: boolean;
  allowedForMSSU?: boolean;
}

const ApplicationInfo = (props: AppProps) => {
  const { daAppObj, setDaAppObj, disabled, allowedForMSSU= true } = props;

  let appData: IAppData = { ...daAppObj };

  const [appNo, setAppNo] = React.useState(appData.da_app_no);
  const [daRefNo, setDaRefNo] = React.useState(appData.da_ref_no || "");
  const [appDate] = React.useState(
    appData.app_date ? new Date(appData.app_date) : new Date()
  );

  const today = new Date();

  const [hospitalCde] = React.useState(appData.create_by_hosp || "");
  const [untName] = React.useState(appData.create_by_unit || "");
  const [createdby] = React.useState(appData.create_by || "");

  const [mssuRefNo, setMssuRefNo] = React.useState(appData.mssu_ref_no || "");
  const [ssfuName, setSsfuName] = React.useState(appData.ssfu_name || "");

  const [axDoctorName, setAxDoctorName] = React.useState(appData.ax_doctor_name || "");

  const appDateChangeHander = (value: Date) => {
    appData.app_date = CommonFunc.Date.formatDate(value);
    setDaAppObj(appData);
  };

  const ssfuNameChangeHander = (value: string) => {
    setSsfuName(value);
    appData.ssfu_name = value;
    setDaAppObj(appData);
  };

  const mssuRefNoChangeHander = (value: string) => {
    setMssuRefNo(value);
    appData.mssu_ref_no = value;
    setDaAppObj(appData);
  };

  const daRefNoChangeHander = (value: string) => {
    setDaRefNo(value);
    appData.da_ref_no = value;
    setDaAppObj(appData);
  };

  React.useEffect(() => {
    setAppNo(appData.da_app_no);
    setAxDoctorName(appData.ax_doctor_name || "");
  }, [appData.da_app_no, appData.ax_doctor_name]);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <div className="row">
          <div className="row" style={{ width: "52%" }}>
            <div className="label" style={{ width: "160px", paddingTop: "1px" }}>
              <Label text="DASS Ref. / App. Date:" />
            </div>
            <div className="label" style={{ width: "100px", paddingTop: "1px" }}>
              <Label text={appNo} />
            </div>
            <div className="label" style={{ width: "5px", marginRight: "5px" }}>
              /
            </div>
            <div className="label" style={{ width: "110px"}}>
              <div className="row">
                <DatePicker
                  value={appDate}
                  maxDate={today}
                  onChange={appDateChangeHander}
                  disabled={disabled || !allowedForMSSU}
                />
                <div style={{ padding: "2px" }} />
                <ToolTips
                  text={
                    <div>
                      * Refer to part (IV), the date of application/the date
                      after the expiry date of last certification (date to be
                      filled by SSFU or MSSU)
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ width: "48%" }}>
            <div className="row" style={{ width: "200px" }}>
              <Label text="MSSU Ref.:" style={{ width: "160px" }} />
              <InputControl
                value={mssuRefNo}
                maxLength={20}
                onChange={(event: any) => mssuRefNoChangeHander(event.target.value)}
                style={{ width: "270px" }}
                disabled={disabled}
              />

            </div>
          </div>
        </div>

        <div className="row">
          <div className="row" style={{ width: "52%" }}>
            <Label text="SSFU Office:" style={{ width: "160px" }} />
            <InputControl
              value={ssfuName}
              maxLength={35}
              onChange={(event: any) => ssfuNameChangeHander(event.target.value)}
              style={{ width: "300px" }}
              disabled={disabled}
            />
          </div>

          <div className="row" style={{ width: "48%" }}>
            <div className="label" style={{ width: "160px" }}>
              <Label text="SSFU Ref.:" />
            </div>
            <InputControl
              value={daRefNo}
              maxLength={10}
              onChange={(event: any) => daRefNoChangeHander(event.target.value.toUpperCase())}
              style={{ width: "140px" }}
              disabled={disabled || !allowedForMSSU}
            />
            <Label text="e.g. AAAS000000" style={{ width: "120px" }} />
          </div>
        </div>

        <div className="row">
          <div className="row" style={{ width: "52%" }}>
            <div className="label" style={{ width: "160px" }}>
              <Label text="Created By:" />
            </div>
            <div className="label" style={{ width: "140px" }}>
              <Label text={hospitalCde + " - " + untName} />
            </div>
            <div className="label" style={{ width: "5px", marginRight: "5px" }}>
              /
            </div>
            <div className="label" style={{ width: "140px" }}>
              <Label text={createdby} />
            </div>
          </div>
          <div className="row" style={{ width: "48%" }}>
            <div className="label" style={{ width: "160px" }}>
              <Label text="Medical Review By:" />
            </div>
            <div>
              <Label text={axDoctorName} style={{ width: "250px" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationInfo;
