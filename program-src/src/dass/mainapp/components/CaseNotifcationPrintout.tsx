import React from "react";
import CommonFunc from "@/common/CommonFunc";

import { maskHKID, getAppConstantDesc } from "@/dass/common/DASSUtils";

interface Props {
  selectedApp: Array<any>;
  appData: any[];
  userID: string;
}

const CaseNotifcationPrintout = (props: Props) => {

  const userID = props.userID;

  const cssStyles = {
    page: {
      fontFamily: "Times New Roman",
      textAlign: "left" as const,
      backgroundColor: "white",
      margin: "5px",
      width: "208mm",
      border: "0px solid black",
      fontSize: "16px",
    },
    header: {
      fontSize: "22px",
      textAlign: "center" as const,
      width: "100%",
    },
    memo: {
      fontSize: "20px",
      textAlign: "center" as const,
      width: "100%",
      textDecoration: "underline",
    },
    remark: {
      border: "1px solid gray",
      width: "730px",
      padding: "20px",
      fontSize: "14pt",
    },
  };

  let printContent = [];
  let pageSize = props.selectedApp.length;
  let pageCount = 1;

  for (let page = 0; page < pageSize; page++) {
    let daAppNo = props.selectedApp[page];
    let AppData = props.appData.find((app) => app.da_app_no === daAppNo);
    let tmp = AppData !== undefined && (
      <div key={"page" + pageCount} style={cssStyles.page}>
        <div style={{ width: "100%", padding: "20px" }}>
          <div className="row">
            <div className="alignLeft" style={{ width: "68%" }}>
              <img 
                src={require("@/assets/images/ha_logo.gif")}
                alt="Hospital Authority" 
              />
            </div>
            <div className="alignRight" style={{ width: "32%" }}>
              <div className="row">
                <div
                  className="alignLeft"
                  style={{ width: "80px", border: "0px black solid" }}
                >
                  Print Time :
                </div>
                <div className="alignLeft">{CommonFunc.Date.formatDisplayDateTime(new Date())}</div>
              </div>
              <div className="row">
                <div
                  className="alignLeft"
                  style={{ width: "80px", border: "0px black solid" }}
                >
                  Print By :
                </div>
                <div className="alignLeft">{userID}</div>
              </div>
            </div>
          </div>

          <br />

          <div style={cssStyles.header}>
            <b>Disability Allowance Supporting System</b>
          </div>

          <div style={cssStyles.memo}>Application Notification</div>

          <hr />

          <div className="row">
            <div style={{ width: "50%" }}>
            <div className="row">
                <div style={{ width: "130px" }}>Name :</div>
                <div>{AppData.eng_name}</div>
              </div>              
            </div>

            <div style={{ width: "50%" }}>
              <div className="row">
                <div style={{ width: "130px" }}>Application Date :</div>
                <div>{CommonFunc.Date.formatDisplayDate(AppData.app_date)}</div>                
              </div>
            </div>
          </div>

          <div className="row">
            <div style={{ width: "100%" }}>
            <div className="row">
                <div style={{ width: "130px" }}>Patient HKID :</div>
                <div>{maskHKID(AppData.hkid)}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div style={{ width: "50%" }}>
            <div className="row">
                <div style={{ width: "130px" }}>DASS Ref. :</div>
                <div>{daAppNo}</div>
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div className="row">
                <div style={{ width: "130px" }}>Specialty/Ward :</div>
                <div>{AppData.ax_specialty_ward}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div style={{ width: "100%" }}>
              <div className="row">
                <div style={{ width: "130px" }}>Issued by :</div>
                <div>
                  { getAppConstantDesc("DASS_UNIT_TYPE", AppData.create_by_unit_type)} /
                  {AppData.create_by_unit} / 
                  {AppData.create_by_name} 
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />

          <div style={cssStyles.remark}>
            Please login to Disability Allowance Supporting System (DASS) via CMS under 
            <br/>
            "Other Systems" to conduct assessment.
          </div>
        </div>
      </div>
    );
    pageCount = pageCount + 1;
    printContent.push(tmp);
    if (page !== pageSize - 1) {
      printContent.push(
        <div key={"pagebreak" + pageCount} className="page-break" />
      );
    }
  }

  return <div> {printContent} </div>;
};

export default CaseNotifcationPrintout;
