import React from "react";
import { useSelector } from "react-redux";

import { IUserConfig, IAppStat } from "@/interface";

import AppConstant from "@/constant/AppConstant";
import { colorCode } from "../common/DatagridTheme";
import AppStatistic from "./AppStatistic";
import PrintCaseNotification from "./PrintCaseNotification";
import PrintCaseSummary from "./PrintCaseSummary";
import { ToolTips } from "@/layouts";
import { getAppConstantDesc } from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface AppProps {
  filter: (status: string) => void;
  filterProcessingDays: (dayCount: number) => void;
  selectedAppStatus: string;
  appData: any[];
  appStat: any[];
}

export default function DashBoard(props: AppProps) {
  const { filter, filterProcessingDays } = props;
  const [appStat, setAppStat] = React.useState<IAppStat>();

  const [selected, setSelected] = React.useState(props.selectedAppStatus);
  const [appStatAll, setAppStatAll] = React.useState("0");
  const [appStatRemind, setAppStatRemind] = React.useState("0");
  const [appStatOverDue, setAppStatOverDue] = React.useState("0");
  const [appStatNF, setAppStatNF] = React.useState("0");
  const [appStatPE, setAppStatPE] = React.useState("0");
  const [appStatRE, setAppStatRE] = React.useState("0");
  const [appStatCO, setAppStatCO] = React.useState("0");
  const overDueDays = AppConstant.APP_OVERDUE_DAYS;
  const processingDaysReminder = 14;

  React.useEffect(() => {
    if (props.appStat.length !== 0) {
      let data: IAppStat = props.appStat[0];
      setAppStat(data);
      setAppStatAll(data.all ? data.all.toString() : "0");
      setAppStatRemind(data.reminder ? data.reminder.toString() : "0");
      setAppStatOverDue(data.overdue ? data.overdue.toString() : "0");
      setAppStatNF(data.nf ? data.nf.toString() : "0");
      setAppStatPE(data.pe ? data.pe.toString() : "0");
      setAppStatRE(data.re ? data.re.toString() : "0");
      setAppStatCO(data.co ? data.co.toString() : "0");
    } else {
      setAppStatAll("0");
      setAppStatRemind("0");
      setAppStatOverDue("0");
      setAppStatNF("0");
      setAppStatPE("0");
      setAppStatRE("0");
      setAppStatCO("0");
    }
    setSelected(props.selectedAppStatus);
  }, [props.appStat, props.selectedAppStatus]);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const mssu_desc = getAppConstantDesc(
    "DASS_UNIT_TYPE",
    AppConstant.DASS_UNIT_TYPE.MSSU
  );
  const unit_type = userState.unit_type;
  const unit_name = userState.unit_code;
  const ward_desc = getAppConstantDesc(
    "DASS_UNIT_TYPE",
    AppConstant.DASS_UNIT_TYPE.WARD
  );
  const ward_list = userState.ward || "";
  const specialty_desc = getAppConstantDesc(
    "DASS_UNIT_TYPE",
    AppConstant.DASS_UNIT_TYPE.SPEC
  );

  let user_group_desc = "";
  if ( unit_type === AppConstant.DASS_UNIT_TYPE.MSSU ) { 
      user_group_desc = mssu_desc + " : " + unit_name
  } else if ( unit_type === AppConstant.DASS_UNIT_TYPE.SPEC ) { 
      user_group_desc = specialty_desc + " : " + unit_name
      if ( ward_list !== "" ) {
        user_group_desc = user_group_desc + " | " + ward_desc + " : " + ward_list
      }
  } else if ( unit_type === AppConstant.DASS_UNIT_TYPE.WARD ) { 
      user_group_desc = ward_desc + " : " + unit_name
  } else {
    user_group_desc = unit_name ? unit_name : "";
  }

  const showAll = () => {
    setSelected("ALL");
    filter("ALL");
  };

  const showOverDue = () => {
    setSelected("OVERDUE");
    filterProcessingDays(overDueDays);
  };

  const showReminder = () => {
    setSelected("REMINDER");
    filterProcessingDays(processingDaysReminder);
  };

  const showSaved = () => {
    setSelected(AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE);
    filter(AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE);
  };

  const showPending = () => {
    setSelected(AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE);
    filter(AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE);
  };

  const showReview = () => {
    setSelected(AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE);
    filter(AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE);
  };

  const showCompleted = () => {
    setSelected(AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE);
    filter(AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE);
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }

  const cssStyles = {
    container: {
      width: "100%",
      textAlign: "center" as "center",
      border: "0px solid red",
      paddingTop: 5,
      paddingBottom: 0,
    },

    dashboard: {
      height: "100%",
      width: "100%",
      display: "inline-block",
      border: "0px solid green",
      margin: "0px",
    },

    dashboardItem: {
      width: "100%",
      height: "60px",
      border: "0px solid black",
    },

    header: {
      fontSize: "14px",
      color: "rgb(106, 106, 106)",
      cursor: "pointer",
    },

    selectedHeader: {
      fontSize: "14px",
      fontWeight: "bold",
      textDecoration: "underline",
      color: "rgb(106, 106, 106)",
      cursor: "pointer",
    },

    font: {
      fontSize: "20px",
      color: "black",
    },
  };

  return (
    <div className="page">
      <div style={cssStyles.container}>
        <div
          style={{
            color: "black",
            height: "25px",
            fontSize: "14px",
            fontWeight: "bold",
            borderTop: "1px solid silver",
            borderBottom: "1px solid silver",
          }}
        >
          {user_group_desc}
        </div>
        <div style={cssStyles.dashboard}>
          <div className="row">
            <div
              style={{
                width: "100%",
                border: "0px solid black",
                margin: "0px",
              }}
            >
              <div className="row">
                <div
                  style={{
                    width: "33%",
                    border: "0px solid blue",
                  }}
                >
                  <div style={cssStyles.dashboardItem}>
                    <div style={{ borderLeft: "0px solid green" }}>
                      {selected === "ALL" ? (
                        <div style={cssStyles.selectedHeader} onClick={showAll} onKeyDown={handleKeyDown}>
                          All
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showAll} onKeyDown={handleKeyDown}>
                          All
                        </div>
                      )}
                      <div style={cssStyles.font}>{appStatAll}</div>
                    </div>
                  </div>

                  <div style={cssStyles.dashboardItem}>
                    <div style={{ borderLeft: "0px solid red" }}>
                      {selected === "OVERDUE" ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showOverDue}
                          onKeyDown={handleKeyDown}
                        >
                          Overdue
                          <img
                            src={require("@/assets/images/outstanding.png")}
                            alt="outstanding"
                            style={{
                              height: "15px",
                              width: "15px",
                              marginTop: "-5px",
                              marginLeft: "5px",
                            }}
                          />
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showOverDue} onKeyDown={handleKeyDown}>
                          Overdue
                          <img
                            src={require("@/assets/images/outstanding.png")}
                            alt="outstanding"
                            style={{
                              height: "15px",
                              width: "15px",
                              marginTop: "-5px",
                              marginLeft: "5px",
                            }}
                          />
                        </div>
                      )}
                      <div style={cssStyles.font}>{appStatOverDue}</div>
                    </div>
                  </div>
                  <div style={cssStyles.dashboardItem}>
                    <div style={{ borderLeft: "0px solid red" }}>
                      {selected === "REMINDER" ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showReminder}
                          onKeyDown={handleKeyDown}
                        >
                          Processing days more than {processingDaysReminder}{" "}
                          days
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showReminder} onKeyDown={handleKeyDown}>
                          Processing days more than {processingDaysReminder}{" "}
                          days
                        </div>
                      )}
                      <div style={cssStyles.font}>{appStatRemind}</div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "33%",
                    border: "0px solid blue",
                  }}
                >
                  <div style={cssStyles.dashboardItem}>
                    <div
                      style={{
                        borderLeft: "10px solid " + colorCode.app_status_NF,
                      }}
                    >
                      {selected ===
                      AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showSaved}
                          onKeyDown={handleKeyDown}
                        >
                          {AppConstant.DASS_STATUS_CODE.SAVED_MAF.DESC}
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showSaved} onKeyDown={handleKeyDown}>
                          {AppConstant.DASS_STATUS_CODE.SAVED_MAF.DESC}
                        </div>
                      )}

                      <div style={cssStyles.font}>{appStatNF}</div>
                    </div>
                  </div>

                  <div style={cssStyles.dashboardItem}>
                    <div
                      style={{
                        borderLeft: "10px solid " + colorCode.app_status_PE,
                      }}
                    >
                      {selected ===
                      AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW
                        .CODE ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showPending}
                          onKeyDown={handleKeyDown}
                        >
                          {
                            AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW
                              .DESC
                          }
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showPending} onKeyDown={handleKeyDown}>
                          {
                            AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW
                              .DESC
                          }
                        </div>
                      )}

                      <div style={cssStyles.font}>{appStatPE}</div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "33%",
                    border: "0px solid blue",
                  }}
                >
                  <div style={cssStyles.dashboardItem}>
                    <div
                      style={{
                        borderLeft: "10px solid " + colorCode.app_status_RE,
                      }}
                    >
                      {selected ===
                      AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showReview}
                          onKeyDown={handleKeyDown}
                        >
                          {AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.DESC}
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showReview} onKeyDown={handleKeyDown}>
                          {AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.DESC}
                        </div>
                      )}

                      <div style={cssStyles.font}>{appStatRE}</div>
                    </div>
                  </div>

                  <div style={cssStyles.dashboardItem}>
                    <div
                      style={{
                        borderLeft: "10px solid " + colorCode.app_status_CO,
                      }}
                    >
                      {selected ===
                      AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE ? (
                        <div
                          style={cssStyles.selectedHeader}
                          onClick={showCompleted}
                          onKeyDown={handleKeyDown}
                        >
                          {AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.DESC}
                        </div>
                      ) : (
                        <div style={cssStyles.header} onClick={showCompleted} onKeyDown={handleKeyDown}>
                          {AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.DESC}
                        </div>
                      )}

                      <div style={cssStyles.font}>{appStatCO}</div>
                    </div>
                  </div>

                  <div
                    className="row"
                    style={{
                      paddingTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="alignRight w100">
                      <ToolTips
                        text="Print Case Summary"
                        content={<PrintCaseSummary appData={props.appData} />}
                      />
                      <ToolTips
                        text="Print Case Notification"
                        content={
                          <PrintCaseNotification appData={props.appData} />
                        }
                      />
                      <ToolTips
                        text="Show Case Summary"
                        content={<AppStatistic stat={appStat} />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
