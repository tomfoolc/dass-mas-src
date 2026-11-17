import React from "react";

import { IAppData, IUserConfig } from "@/interface";

import {
  Label,
  InputControl,
  DatePicker,
  DropdownList,
  RadioButton,
} from "@/layouts";
import CommonFunc from "@/common/CommonFunc";
import AppConstant from "@/constant/AppConstant";
import { getDisplayLength } from "@/dass/common/DASSUtils";

interface AppProps {
  userConf: IUserConfig;
  daAppObj: IAppData;
  setDaAppObj: (appData: IAppData) => void;
  disabled?: boolean;
}

const PatientInfo = (props: AppProps) => {
  const { userConf, daAppObj, setDaAppObj, disabled } = props;

  let appData: IAppData = { ...daAppObj };

  const hospitallist = userConf.hospitalListAry ? userConf.hospitalListAry : [];
  const specialtylist = userConf.specialtyListAry
    ? userConf.specialtyListAry
    : [];
  const wardlist = userConf.wardListAry ? userConf.wardListAry : [];

  const [sex, setSex] = React.useState(daAppObj.sex);
  const [daType] = React.useState(daAppObj.da_type);
  const [appStatus] = React.useState(daAppObj.app_status);
  const [engName, setEngName] = React.useState(daAppObj.eng_name);
  const [chinName, setChinName] = React.useState(
    daAppObj.chi_name ? daAppObj.chi_name : ""
  );
  const [docType, setDocType] = React.useState(daAppObj.document_type);
  const [hkid, setHkid] = React.useState(daAppObj.hkid);
  const [age, setAge] = React.useState(daAppObj.age);
  const [address, setAddress] = React.useState(daAppObj.addr || "");
  const [telNo, setTelNo] = React.useState(
    daAppObj.tel_no ? daAppObj.tel_no : ""
  );
  const [treatHospType, setTreatHospType] = React.useState(
    daAppObj.treat_hospital_type ? daAppObj.treat_hospital_type : "H"
  );
  const [treatHospCde, setTreatHospCde] = React.useState(
    daAppObj.treat_hospital_cde
      ? daAppObj.treat_hospital_cde.toString()
      : userConf.hospital_cde
        ? userConf.hospital_cde
        : ""
  );
  const [treatRefno, setTreatRefno] = React.useState(
    daAppObj.treat_ref_no ? daAppObj.treat_ref_no : ""
  );
  const [nextFollowupDate] = React.useState(
    new Date(daAppObj.next_follow_up_dte ? daAppObj.next_follow_up_dte : "")
  );
  const [treatSpecialtyType, setTreatSpecialtyType] = React.useState(
    daAppObj.treat_specialty_type
      ? daAppObj.treat_specialty_type
      : AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
  );
  const [treatSpecialty, setSpecialty] = React.useState<string>(
    daAppObj.treat_specialty_type ===
      AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY &&
      daAppObj.treat_specialty_ward
      ? daAppObj.treat_specialty_ward.toString()
      : ""
  );
  const [treatWard, setWard] = React.useState(
    daAppObj.treat_specialty_type ===
      AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD && daAppObj.treat_specialty_ward
      ? daAppObj.treat_specialty_ward.toString()
      : ""
  );

  const sexChangeHander = (value: string) => {
    setSex(value);
    appData.sex = value;
    setDaAppObj(appData);
  };

  const englishNameChangeHander = (value: string) => {
    setEngName(value);
    appData.eng_name = value;
    setDaAppObj(appData);
  };

  const chineseNameChangeHander = (value: string) => {
    setChinName(value);
    appData.chi_name = value;
    setDaAppObj(appData);
  };

  const docTypeChangeHander = (value: string) => {
    setDocType(value);
    appData.document_type = value;
    setDaAppObj(appData);
  };

  const hkidChangeHander = (value: string) => {
    setHkid(value);
    appData.hkid = value;
    setDaAppObj(appData);
  };

  const ageChangeHander = (value: number) => {
    setAge(value);
    appData.age = value;
    setDaAppObj(appData);
  };

  const addressChangeHander = (value: string) => {
    setAddress(value);
    appData.addr = value;
    setDaAppObj(appData);
  };

  const telNoChangeHander = (value: string) => {
    setTelNo(value);
    appData.tel_no = value;
    setDaAppObj(appData);
  };

  const treatHospTypeChangeHander = (value: string) => {
    setTreatHospType(value);
    appData.treat_hospital_type = value;
    setDaAppObj(appData);
  };

  const hospitalChangeHander = (value: string) => {
    setTreatHospCde(value);
    appData.treat_hospital_cde = value;
    setDaAppObj(appData);
  };

  const treatSpecialtyTypeChangeHander = (value: string) => {
    setTreatSpecialtyType(value);
    appData.treat_specialty_type = value;
    setDaAppObj(appData);
  };

  const nexFollowupDateChangeHander = (value: Date) => {
    appData.next_follow_up_dte = CommonFunc.Date.formatDate(value);
    setDaAppObj(appData);
  };

  const treatRefNoChangeHander = (value: string) => {
    setTreatRefno(value);
    appData.treat_ref_no = value;
    setDaAppObj(appData);
  };

  const specialtyChangeHandler = (value: string) => {
    setSpecialty(value);
    appData.treat_specialty_ward = value;
    setDaAppObj(appData);
  };

  const wardChangeHandler = (value: string) => {
    setWard(value);
    appData.treat_specialty_ward = value;
    setDaAppObj(appData);
  };

  return (
    <div className="page">
      <div className="row">
        <div className="row" style={{ width: "65%" }}>
          <div className="row" style={{ width: "180px" }}>
            <RadioButton
              id="1a"
              isSelected={sex === "M"}
              label="Mr"
              value="M"
              onChange={() => sexChangeHander("M")}
              disabled={disabled || true}
            />
            <RadioButton
              id="1b"
              isSelected={sex === "F"}
              label="Ms"
              value="F"
              onChange={() => sexChangeHander("F")}
              disabled={disabled || true}
            />
          </div>

          <InputControl
            value={engName}
            onChange={(event: any) =>
              englishNameChangeHander(event.target.value)
            }
            style={{ width: "450px" }}
            disabled={disabled || true}
          />
        </div>

        <div className="row" style={{ width: "25%" }}>
          <Label text={"Chinese:"} style={{ width: "80px" }} />
          <InputControl
            value={chinName}
            onChange={(event: any) =>
              chineseNameChangeHander(event.target.value)
            }
            style={{ fontFamily: "HA_MingLiu", width: "153px" }}
            disabled={disabled || true}
          />
        </div>
      </div>

      <div className="row">
        <div className="row" style={{ width: "55%" }}>
          <div className="row" style={{ width: "180px" }}>
            <RadioButton
              id="2a"
              isSelected={docType === "I"}
              label="HKIC"
              value="I"
              onChange={() => docTypeChangeHander("I")}
              disabled={disabled || true}
            />
            <RadioButton
              id="2b"
              isSelected={docType === "B"}
              label="BC No.:"
              value="B"
              onChange={() => docTypeChangeHander("B")}
              disabled={disabled || true}
            />
          </div>

          <InputControl
            value={hkid}
            validationrule="hkid"
            onChange={(event: any) => hkidChangeHander(event.target.value)}
            style={{ width: "320px" }}
            disabled={disabled || true}
          />
          <button
            className="hidden"
            onClick={() => {
              navigator.clipboard.writeText(hkid ? hkid : "");
            }}
          />
        </div>

        <div className="row" style={{ width: "35%" }}>
          <Label text="Age:" style={{ width: "50px" }} />
          <InputControl
            value={age}
            maxLength={3}
            validationrule="integer"
            onChange={(event: any) => ageChangeHander(event.target.value)}
            style={{ width: "283px" }}
            disabled={disabled || true}
          />
        </div>
      </div>

      <div>
        <div className="row">
          <div className="row" style={{ width: "100%" }}>
            <Label text="Address:" style={{ width: "182px" }} />
            <InputControl
              type="textarea"
              value={address}
              maxLength={400}
              style={{ height: "110px", width: "695px" }}
              onChange={(event: any) => addressChangeHander(event.target.value)}
              disabled={disabled || daType === AppConstant.DASS_TYPE.REFER_FROM_SWD}
            />
            <div
              className="hidden"
              style={{
                width: "50px",
                height: "20px",
                marginLeft: "5px",
                marginTop: "60px",
              }}
            >
              <img 
                src={require("@/assets/images/house.png")}
                alt="Address" 
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row" style={{ width: "90%" }}>
            <Label text="" style={{ width: "182px" }} />
            <div style={{ fontSize: "7pt" }}>
              (Remark: Due to the form limitation, please only input {AppConstant.APP_ADDR_LENGTH} characters for applicant's address. Current no. of characters: {getDisplayLength(address)})
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row" style={{ width: "90%" }}>
            <Label text="Tel. No.:" style={{ width: "182px" }} />
            <InputControl
              value={telNo}
              maxLength={20}
              onChange={(event: any) => telNoChangeHander(event.target.value)}
              style={{ width: "250px" }}
              disabled={disabled || daType === AppConstant.DASS_TYPE.REFER_FROM_SWD}
            />
          </div>
        </div>

        <div className="row">
          <div className="row">
            <div className="row" style={{ width: "180px" }}>
              <RadioButton
                id="3a"
                isSelected={treatHospType === "H"}
                label="Hospital"
                value="H"
                onChange={() => treatHospTypeChangeHander("H")}
                disabled={disabled || true}
              />
              <RadioButton
                id="3b"
                isSelected={treatHospType === "C"}
                label="Clinic:"
                value="C"
                onChange={() => treatHospTypeChangeHander("C")}
                disabled={disabled || true}
              />
            </div>

            <DropdownList
              value={treatHospCde}
              list={hospitallist}
              onSelect={hospitalChangeHander}
              width={400}
              disabled={disabled || true}
            />
          </div>

          <div style={{ width: "20px", height: "20px" }} />
        </div>

        <div className="row">
          <div className="row">
            <Label text="Ref. No.:" style={{ width: "182px" }} />
            <InputControl
              value={treatRefno}
              maxLength={20}
              onChange={(event: any) =>
                treatRefNoChangeHander(event.target.value)
              }
              disabled={disabled || appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE}
              style={{ width: "400px" }}
            />
          </div>
        </div>

        <div className="row">
          {daType === AppConstant.DASS_TYPE.REFER_FROM_SWD ? (
            <div className="row">
              <Label text="Next follow-up date:" style={{ width: "182px" }} />
              <DatePicker
                value={nextFollowupDate}
                onChange={nexFollowupDateChangeHander}
                disabled={disabled || true}
              />
              <div style={{ width: "20px", height: "20px" }} />
            </div>
          ) : null}
        </div>

        <div className="row">
          {daType === AppConstant.DASS_TYPE.REFER_FROM_SWD ? (
            <div className="row">
              <div className="row" style={{ width: "180px" }}>
                <RadioButton
                  id="4a"
                  isSelected={
                    treatSpecialtyType ===
                    AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
                  }
                  label="Specialty"
                  value="S"
                  onChange={() =>
                    treatSpecialtyTypeChangeHander(
                      AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
                    )
                  }
                  disabled={disabled || true}
                />
                <RadioButton
                  id="4b"
                  isSelected={
                    treatSpecialtyType ===
                    AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD
                  }
                  label="Ward:"
                  value="W"
                  onChange={() =>
                    treatSpecialtyTypeChangeHander(
                      AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD
                    )
                  }
                  disabled={disabled || true}
                />
              </div>

              {treatSpecialtyType ===
                AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY ? (
                <DropdownList
                  value={treatSpecialty}
                  list={specialtylist}
                  onSelect={specialtyChangeHandler}
                  width={400}
                  disabled={disabled || true}
                />
              ) : (
                <DropdownList
                  value={treatWard}
                  list={wardlist}
                  onSelect={wardChangeHandler}
                  width={400}
                  disabled={disabled || true}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
