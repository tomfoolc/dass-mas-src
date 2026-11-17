import React from "react";
import CommonFunc from "@/common/CommonFunc";
import { useSelector } from "react-redux";

import { maskHKID } from "@/dass/common/DASSUtils";
import { IUserConfig } from "@/interface/UserConfig";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface Props {
  appData: any[];
}

const CaseSummaryPrintout = (props: Props) => {
  const userState = useSelector((state: StateProps) => state.das_data.UserData);

  const userID = userState.user_id;

  const cssStyles = {
    page: {
      fontFamily: "Times New Roman",
      textAlign: "left" as const,
      backgroundColor: "white",
      margin: "5px",
      width: "208mm",
      //height: "292mm",
      border: "0px solid black",
      fontSize: "13px",
    },
    header: {
      fontSize: "18px",
      textAlign: "center" as const,
      width: "100%",
    },
    memo: {
      fontSize: "20px",
      textAlign: "center" as const,
      width: "100%",
      textDecoration: "underline",
    },
    dataRowHeader: {
      display: "flex",
      border: "1px solid gray",
      padding: "0px",
      fontWeight: "bold",
    },
    dataRow: {
      display: "flex",
      border: "1px solid gray",
      borderTop: "0px",
    },
    dataCol: {
      width: "0px",
      marginLeft: "5px",
    },
    dataColHKID: {
      width: "90px",
      marginLeft: "5px",
      borderRight: "1px solid gray",
    },
    dataColEngName: {
      width: "300px",
      marginLeft: "5px",
      borderRight: "1px solid gray",
      height: "40px",
    },
    dataColChiNameHeader: {
      width: "100px",
      marginLeft: "5px",
      borderRight: "1px solid gray",
    },
    dataColChiName: {
      width: "100px",
      marginLeft: "5px",
      fontFamily: "HA_MingLiu",
      borderRight: "1px solid gray",
    },
    dataColAppStatus: {
      width: "150px",
      marginLeft: "5px",
      borderRight: "1px solid gray",
    },
    dataColAppDate: {
      width: "120px",
      marginLeft: "5px",
      borderRight: "1px solid gray",
    },
    dataColAppNo: {
      width: "80px",
      marginLeft: "5px",
      //borderRight: "1px solid gray",
    },    
    accessMethod: {
      border: "1px solid gray",
      width: "700px",
      padding: "20px",
      fontSize: "14pt",
    },
  };

  const GeneratePageContent = (
    pageTwoSplitSize: number,
    dataSizePerPage: number
  ) => {
    let pageContent = null;

    pageContent = (
      <div>
        <div style={cssStyles.dataRowHeader}>
          <div style={cssStyles.dataColHKID}>Patient HKID</div>

          <div style={cssStyles.dataColEngName}>English Name</div>

          <div className="hidden" style={cssStyles.dataColChiNameHeader}>
            Chinese Name
          </div>

          <div style={cssStyles.dataColAppStatus}>Application Status</div>

          <div style={cssStyles.dataColAppDate}>Application Date</div>

          <div style={cssStyles.dataColAppNo}>DASS Ref.</div>

          <div style={cssStyles.dataCol}></div>
        </div>

        {props.appData.length >= pageTwoSplitSize &&
          props.appData
            .slice(pageTwoSplitSize, pageTwoSplitSize + dataSizePerPage)
            .map((element) => (
              <div key={element.da_app_no} style={cssStyles.dataRow}>
                <div style={cssStyles.dataColHKID}>
                  {maskHKID(element.hkid)}
                </div>

                <div style={cssStyles.dataColEngName}>
                  {element.eng_name}
                </div>

                <div className="hidden" style={cssStyles.dataColChiName}>
                  {element.chi_name}
                </div>

                <div style={cssStyles.dataColAppStatus}>
                  {element.app_status_desc}
                </div>

                <div style={cssStyles.dataColAppDate}>{CommonFunc.Date.formatDisplayDate(element.app_date)}</div>

                <div style={cssStyles.dataColAppNo}>{element.da_app_no}</div>

                <div style={cssStyles.dataCol}></div>
              </div>
            ))}
      </div>
    );

    return pageContent;
  };

  let printoutPage1Content = null;
  let printoutAfterPage1Content = [];
  let pageTwoSplitSize = 20;
  let pageSize = 22;
  printoutPage1Content = (
    <div>
      {GeneratePageContent(0, pageTwoSplitSize)}
      <br />
      <br />
    </div>
  );

  if (props.appData.length > pageTwoSplitSize) {
    let pageCount = 1;
    for (let record = pageTwoSplitSize + 1; record < props.appData.length; ) {
      let tmp = (
        <div key={"page" + pageCount}>
          <div>
            <div className="page-break" />
            <br />
            {GeneratePageContent(record, pageSize)}
            <br />
            <br />
          </div>
        </div>
      );
      pageCount = pageCount + 1;
      record = record + pageSize;
      printoutAfterPage1Content.push(tmp);
    }
  }

  return (
    <div className="print-container" style={{ margin: "0", padding: "0" }}>
      <>
        <div style={cssStyles.page}>
          <div style={{ width: "100%", padding: "20px" }}>
            <div className="row">
              <div className="alignLeft" style={{ width: "70%" }}>
                <img 
                  src={require("@/assets/images/ha_logo.gif")}
                  alt="Hospital Authority" 
                />
              </div>
              <div className="alignRight" style={{ width: "30%" }}>
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

            <div style={cssStyles.header}>
              <b>Disability Allowance Supporting System</b>
              <br />
              <b>Case Summary</b>
            </div>
            <br />
            {printoutPage1Content}
            {printoutAfterPage1Content}
          </div>
        </div>
      </>
    </div>
  );
};

export default CaseSummaryPrintout;
