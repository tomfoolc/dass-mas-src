import React from "react";
import { IAppData } from "@/interface";
import {
  CheckBox,
  Label,
  InputControl,
  RadioButton,
  DatePicker,
  ToolTips,
} from "@/layouts";
import CommonFunc from "@/common/CommonFunc";
import AppConstant from "@/constant/AppConstant";

interface AppProps {
  daAppObj: IAppData;
  setDaAppObj: (appData: IAppData) => void;
  disabled?: boolean;
}

const ApplicationDetail = (props: AppProps) => {
  const { daAppObj, setDaAppObj, disabled} = props;

  let appData: IAppData = { ...daAppObj };

  const [sex] = React.useState(appData.sex);
  const [daType] = React.useState(appData.da_type || "");
  const [patientCond, setPatientCond] = React.useState(
    appData.patient_cond || ""
  );
  const [appType, setAppType] = React.useState(appData.app_type);
  const [medRptAttached, setMedRptAttached] = React.useState(
    appData.med_rpt_attached
  );
  const [contact, setContact] = React.useState(appData.contact || "");
  const [contactNo, setContactNo] = React.useState(appData.contact_no || "");

  const [remark, setAddtionalRemark] = React.useState(appData.remark || "");

  const [returnDate] = React.useState(
    new Date(appData.form_return_dte ? appData.form_return_dte.toString() : "")
  );

  const newApp_onclick = () => {
    setAppType(AppConstant.DASS_APP_TYPE.NEW);
    appData.app_type = AppConstant.DASS_APP_TYPE.NEW;
    setDaAppObj(appData);
  };

  const NDA_onclick = () => {
    setAppType(AppConstant.DASS_APP_TYPE.NDA);
    appData.app_type = AppConstant.DASS_APP_TYPE.NDA;
    setDaAppObj(appData);
  };

  const HDA_onclick = () => {
    setAppType(AppConstant.DASS_APP_TYPE.HDA);
    appData.app_type = AppConstant.DASS_APP_TYPE.HDA;
    setDaAppObj(appData);
  };

  const patientCondChangeHander = (value: string) => {
    setPatientCond(value);
    appData.patient_cond = value;
    setDaAppObj(appData);
  };

  const medRptAttacheChangeHander = (value: number) => {
    setMedRptAttached(value);
    appData.med_rpt_attached = value;
    setDaAppObj(appData);
  };

  const formReturnDteChangeHander = (value: Date) => {
    appData.form_return_dte = CommonFunc.Date.formatDate(value);
    setDaAppObj(appData);
  };

  const contactChangeHander = (value: string) => {
    setContact(value);
    appData.contact = value;
    setDaAppObj(appData);
  };

  const contactNoChangeHander = (value: string) => {
    setContactNo(value);
    appData.contact_no = value;
    setDaAppObj(appData);
  };

  const additionalRemarkChangeHander = (value: string) => {
    setAddtionalRemark(value);
    appData.remark = value;
    setDaAppObj(appData);
  };

  return (
    <div className="page">
      {daType === AppConstant.DASS_TYPE.REFER_FROM_SWD ? (
        <div style={{ padding: "20px" }}>
          <div className="row">
            <div style={{ paddingLeft: "20px" }}></div>
            <Label text="The above-named, who claims to be suffering from " />
            <InputControl
              value={patientCond}
              onChange={(event: any) =>
                patientCondChangeHander(event.target.value)
              }
              disabled={disabled}
              style={{ width: "200px" }}
            />
            <Label text="(a disabling physical or mental condition), has" />
          </div>

          <div className="row rowPadding">
            <Label
              text={
                <div>
                  has applied for Disability Allowance (DA) under the SSA
                  Scheme. *{" "}
                  {sex === "M" ? (
                    <>
                      He/<s>She</s>
                    </>
                  ) : sex === "F" ? (
                    <>
                      <s>He</s>/She
                    </>
                  ) : (
                    <>He/She</>
                  )}{" "}
                  has given us permission to make the medical enquiry.
                </div>
              }
            />
          </div>

          <div className="rowPadding">
            <Label
              text={
                <div>
                  2. Available information on *{" "}
                  {sex === "M" ? (
                    <>
                      his/<s>her</s>
                    </>
                  ) : sex === "F" ? (
                    <>
                      <s>his</s>/her
                    </>
                  ) : (
                    <>his/her</>
                  )}{" "}
                  *DA and/or medical record is as follows:
                </div>
              }
            />

            <div style={{ width: "400px", paddingLeft: "40px" }}>
              <CheckBox
                text={<Label symbol="" text="New application" />}
                isChecked={appType === "NEW"}
                onClick={newApp_onclick}
                disabled={disabled}
              />
              <CheckBox
                text={
                  <Label symbol="" text="Existing Normal DA (NDA) recipient" />
                }
                isChecked={appType === "NDA"}
                onClick={NDA_onclick}
                disabled={disabled}
              />
              <CheckBox
                text={
                  <Label symbol="" text="Existing Higher DA (HDA) recipient" />
                }
                isChecked={appType === "HDA"}
                onClick={HDA_onclick}
                disabled={disabled}
              />
            </div>

            <div className="row rowPadding">
              <Label
                text={
                  <div>
                    3. A copy of the latest medical assessment form (MAF)
                    <ToolTips
                      text={
                        <div style={{ textAlign: "justify" }}>
                          The latest MAF refers to (a) for an active DA case,
                          the last MAF certifying the applicant's severe
                          disability or (b) for a previously ineligible DA case
                          re-applying for DA, the latest MAF certifying that the
                          applicant is not severely disabled, with date of
                          assessment failling within one year counting back from
                          the date of the current application.
                        </div>
                      }
                      content={
                        <div>
                          <img
                            style={{
                              marginLeft: 2,
                              marginBottom: 5,
                              height: 15,
                              width: 12,
                              cursor: "help",
                            }}
                            src={require("@/assets/images/upperarrow.png")}
                            alt=""
                          />
                        </div>
                      }
                    />{" "}
                    is *
                  </div>
                }
              />
              <div className="row" style={{ width: "400px" }}>
                <RadioButton
                  id="3a"
                  isSelected={medRptAttached === 1}
                  label="attached"
                  value="attached"
                  onChange={() => medRptAttacheChangeHander(1)}
                  disabled={disabled}
                />
                <RadioButton
                  id="3b"
                  isSelected={medRptAttached === 0}
                  label="not available"
                  value="not available"
                  onChange={() => medRptAttacheChangeHander(0)}
                  disabled={disabled}
                />
                <RadioButton
                  id="3c"
                  isSelected={medRptAttached === -1}
                  label="not applicable"
                  value="not applicable"
                  onChange={() => medRptAttacheChangeHander(-1)}
                  disabled={disabled}
                />
                <Label text="." />
              </div>
            </div>

            <div className="row">
              <Label text="4. I should be grateful if you would fill in the relevant sections in the form overleaf taking into account the information in paragraphs" />
            </div>

            <div className="row">
              <Label
                text={
                  <div>
                    1 to 3 above and return the original copy of the completed
                    form to the undersigned <b>on or before</b>
                  </div>
                }
              />
              <DatePicker
                value={returnDate}
                onChange={formReturnDteChangeHander}
                disabled={disabled}
              />
              <Label text=". If" />
            </div>

            <div className="row">
              <Label text="telephone discussion is desirable, please contact the undersigned or" />
              <InputControl
                value={contact}
                onChange={(event: any) =>
                  contactChangeHander(event.target.value)
                }
                disabled={disabled}
                style={{ width: "100px" }}
              />
              <Label text=" on Tel. No.:" />
              <InputControl
                value={contactNo}
                onChange={(event: any) =>
                  contactNoChangeHander(event.target.value)
                }
                maxLength={8}
                disabled={disabled}
                style={{ width: "100px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        
        <div style={{ padding: "20px" }}>
          <div>

            <div className="row rowPadding">
              <div style={{ paddingLeft: "40px" }}></div>
              <Label text="The above-named has applied for DA under the SSA Scheme." />
            </div>

            <div className="row">
              <Label text="2." />
              <div style={{ paddingLeft: "20px" }}></div>
              <Label text="I forward overleaf a medical report on the above-named.	Additional remarks are as follows:" />
            </div>

            <div className="row">
              <div style={{ paddingLeft: "35px" }}></div>
              <InputControl
                type="textarea"
                value={remark}
                maxLength={360}
                style={{ height: "125px", width: "800px" }}
                onChange={(event: any) =>
                  additionalRemarkChangeHander(event.target.value)
                }
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
