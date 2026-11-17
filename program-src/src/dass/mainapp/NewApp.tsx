import React from "react";
import { connect, useSelector } from "react-redux";

import { getPatientData } from "@/reducers";
import { Button, Label, InputControl, RadioButton } from "@/layouts";

import TopMenu from "./TopMenu";
import ShowPatientRecord from "./ShowPatientRecord";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import Constant from "@/constant/Constant";
import { IUserConfig } from "@/interface";

import { validSWDRefNo } from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  getPatientData: (hkid: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getPatientData,
};

const NewMAF = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const ShowPatientRecordRef = React.useRef<{ GoToApp: () => void }>(null);

  const userState: IUserConfig = useSelector(
    (state: StateProps) => state.das_data.UserData
  );
  const unitType = userState.unit_type;
  const defInputRefNo = false; // False : for new application flow
  const [enableRefNoInput] = React.useState(unitType?.indexOf("MSSU") !== -1);
  const [withRefNo, setWithRefNo] = React.useState(
    unitType?.indexOf("MSSU") === -1 ? true : defInputRefNo
  );

  const [hkid, setHkid] = React.useState("");
  const [daRefNo, setDaRefNo] = React.useState("");
  const [patientData, setPatientData] = React.useState<any[]>([]);

  const HkidChangeHandler = (event: any) => {
    setHkid(event.target.value);
  };

  const HkidKeyDownHandler = (event: any) => {
    if (event.charCode === 13) {
      searchHandler();
    }
  };

  const DaRefNoChangeHandler = (event: any) => {
    setDaRefNo(event.target.value.toUpperCase());
  };

  const WtihRefNoChangeHandler = (withRef: boolean) => {
    setWithRefNo(withRef);
  };

  const SearchHkid = async () => {
    let searchHkid = hkid.toUpperCase();

    if (searchHkid !== "") {
      DassCommonRef.current?.handleLoadingOpen(
        "Searching patient... Please wait"
      );

      const { getPatientData } = props;
      const response = await getPatientData(searchHkid);

      if (response.ret_cde === Constant.API_SUCCESS) {
        DisplayPatientResult(response.result);
        setTimeout(() => {
          ShowPatientRecordRef.current?.GoToApp();
          DassCommonRef.current?.handleLoadingClose();
        }, 1000);
      } else {
        setPatientData([]);
        DassCommonRef.current?.handleLoadingClose();
        DassCommonRef.current?.handleDialogOpen("No record found.");
      }
    } else {
      ClearHkid();
      DassCommonRef.current?.handleDialogOpen("Please input HKIC/BC No.");
    }
  };

  const DisplayPatientResult = (patient: any) => {
    if (patient !== null) {
      setPatientData([patient]);
    }
  };

  const ClearHkid = () => {
    setHkid("");
    setDaRefNo("");
    setPatientData([]);
  };

  const searchHandler = async () => {
    if (hkid.trim() === "") {
      DassCommonRef.current?.handleDialogOpen("Please input in HKIC/BC No.");
    } else if (withRefNo && daRefNo.trim() === "") {
      DassCommonRef.current?.handleDialogOpen("Please input SSFU Ref.");
    } else if (daRefNo !== "" && !validSWDRefNo(daRefNo)) {
      DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
    } else {
      SearchHkid();
    }
  };

  const clearHandler = () => {
    ClearHkid();
  };

  return (
    <div className="page">
      <div id="mafapp_topmenu">
        <TopMenu />
      </div>

      <div className="header">
        New Disablilty Allowance Medical Assessment Form
      </div>

      <div>
        <div className="row">
          <Label text="HKIC/BC No.:" style={{ width: "160px" }} />
          <InputControl
            style={{ width: "400px" }}
            value={hkid}
            validationrule="hkid"
            onChange={HkidChangeHandler}
            onKeyPress={HkidKeyDownHandler}
          />
          <input style={{ display: "none" }} onKeyPress={HkidKeyDownHandler} />
        </div>

        <div className="row">
          <Label text="SSFU Referral:" style={{ width: "160px" }} />

          <div className="row" style={{ paddingTop: "2px" }}>
            <RadioButton
              id="1a"
              isSelected={withRefNo}
              label="Yes"
              value="Yes"
              disabled={!enableRefNoInput}
              onChange={() => WtihRefNoChangeHandler(true)}
            />

            <RadioButton
              id="2b"
              isSelected={!withRefNo}
              label="No"
              value="No"
              disabled={!enableRefNoInput}
              onChange={() => WtihRefNoChangeHandler(false)}
            />
          </div>

        </div>

        <div className="row">

          <Label text="SSFU Ref.:" style={{ width: "160px" }} />          

          <InputControl
            style={{ width: "305px" }}
            value={daRefNo}
            onChange={DaRefNoChangeHandler}
            maxLength={10}
            //disabled={!withRefNo}
          />

          <Label text="e.g. AAAS000000" style={{ width: "160px" }} />

        </div>

      </div>

      <div className="alignRight" style={{ paddingRight: "5px" }}>
        <Button
          text="Create New Form"
          onClick={searchHandler}
          style={{ width: "180px" }}
        />
        &nbsp;
        <Button text="Reset" onClick={clearHandler} />
      </div>

      <br />

      <div>
        <ShowPatientRecord
          ref={ShowPatientRecordRef}
          hkid={hkid}
          patientData={patientData}
          da_ref_no_req={withRefNo}
          da_ref_no={daRefNo}
        />
      </div>

      <DassCommon ref={DassCommonRef} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(NewMAF);
