import React from "react";
import { connect, useSelector } from "react-redux";

import CommonFunc from "@/common/CommonFunc";

import { IUserConfig } from "@/interface";

import { getApplicationList } from "@/reducers";

import { Panel, ToolTips } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import DashBoard from "./DashBoard";
import FollowupList from "./FollowupList";
import TopMenu from "./TopMenu";
import Constant from "@/constant/Constant";
import AppConstant from "@/constant/AppConstant";
import { destroySession } from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  getApplicationList: (
    unit_name: string,
    specialty_ward: string,
  ) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getApplicationList,
};

const MainApp = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);

  const hospital_cde = userState.hospital_cde;
  const unit = userState.unit_code;
  const specialtyWardListState = userState.specialty_ward_list;
  const userID = userState.user_id;
  const userName = userState.name;

  const [data, setData] = React.useState<any[]>([]);
  const [appSelectedStatus, setAppSelectedStatus] = React.useState("ALL");
  const [appStat, setAppStat] = React.useState<any[]>([]);
  const [appData, setAppData] = React.useState<any[]>([]);

  const [showCDC, setShowCDC] = React.useState(true);
  const defaultCollapseH =
    window.innerHeight && window.innerHeight > 670 + 50
      ? window.innerHeight - 120 - 50
      : 520;
  const defaultExpandH =
    window.innerHeight && window.innerHeight > 670 + 50
      ? window.innerHeight - 360 - 50
      : 290;
  const [gridHeight, setGridHeight] = React.useState(
    !showCDC ? defaultCollapseH : defaultExpandH
  );

  const HideNViewCDC = () => {
    setShowCDC(!showCDC);
    setGridHeight(showCDC ? defaultCollapseH : defaultExpandH);
  };

  const lastLogonDtm = userState.last_logon_dtm;

  const cssStyles = {
    container: {
      display: "flex",
    },

    alginRight: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "5px",
    },

    image: {
      height: 20,
      width: 20,
      marginBottom: 5,
    },

    text: {
      marginTop: "2px",
      marginLeft: "4px",
      fontSize: "12px",
      height: "20px",
    },
  };

  React.useEffect(() => {
    const SearchAppData = async () => {
      if (unit !== "") {
        DassCommonRef.current?.handleLoadingOpen(
          "Retrieving applications... Please wait"
        );

        let unit_code = unit ? unit : "";
        let specialtyWardList = specialtyWardListState ? specialtyWardListState : "";

        const { getApplicationList } = props;
        const response = await getApplicationList(
          unit_code,
          specialtyWardList,
        );

        if (
          response.result !== null &&
          response.ret_cde === Constant.API_SUCCESS
        ) {
          setData(response.result.applist);
          setAppStat([response.result.appstat]);
          setAppData(response.result.applist);
        } else {
          setData([]);
          setAppStat([]);
          setAppData([]);
          if (response.validation_cde === 440 && response.ret_msg !== "") {
            DassCommonRef.current?.handleDialogOpen(response.ret_msg, "OK");
          }
        }

        DassCommonRef.current?.handleLoadingClose();
      }
    };

    SearchAppData();
  }, [props, unit, specialtyWardListState]);

  const SearchApp = async () => {
    if (unit !== "") {
      let unit_code = unit ? unit : "";
      let specialtyWardList = specialtyWardListState ? specialtyWardListState : "";

      const { getApplicationList } = props;
      const response = await getApplicationList(
        unit_code,
        specialtyWardList,
      );

      if (
        response.result !== null &&
        response.ret_cde === Constant.API_SUCCESS
      ) {
        setData(response.result.applist);
        setAppStat([response.result.appstat]);
        const filtered = response.result.applist.filter((app: any) => {
          return (
            app.app_status === appSelectedStatus || appSelectedStatus === "ALL"
          );
        });
        setAppData(filtered);
      } else {
        setData([]);
        setAppStat([]);
        setAppData([]);
      }
    }
  };

  const ReloadAppDisplay = async () => {
    SearchApp();
  };

  const ResetAppDisplay = async () => {
    ApplyAppStatusFilter("ALL");
  };

  const ApplyAppStatusFilter = (status: string, newdata?: any[]) => {
    setAppSelectedStatus(status);
    const filtered = newdata
      ? newdata
      : data.filter((app: any) => {
          return app.app_status === status || status === "ALL";
        });
    setAppData(filtered);
  };

  const ApplyProcessingDaysFilter = (dayCount: number) => {
    if (dayCount === AppConstant.APP_OVERDUE_DAYS) {
      setAppSelectedStatus("OVERDUE");
    } else {
      setAppSelectedStatus("REMINDER");
    }
    const filtered = data.filter((app: any) => {
      return app.processing_days > dayCount;
    });
    setAppData(filtered);
  };

  const handleLogout = () => {
    destroySession(hospital_cde);
  };

  return (
    <div className="page">
      <TopMenu />

      <div className="header">
        <div style={cssStyles.container}>
          <ToolTips
            text={
              <div>
                <div> Hospital : {hospital_cde} </div>
                <div> User ID : {userID} </div>
                <div> Name : {userName} </div>
              </div>
            }
            content={<img style={cssStyles.image} src={require("@/assets/images/user.png")} alt="" />}
          />
          <div style={{ ...cssStyles.text, width: 330}}>
            <div className="row">
              <div style={{paddingLeft : "4px"}}>
                {hospital_cde} - {userID}
              </div>
            </div>
          </div>
          <div>Case Distribution Centre [CDC]</div>
          <div style={{ ...cssStyles.text, ...cssStyles.alginRight }}>
            LOGON TIME :{" "}
            {CommonFunc.Date.formatDisplayDateTime2(
              lastLogonDtm ? lastLogonDtm : new Date()
            )}
          </div>
        </div>
      </div>

      <div>
        <Panel
          Header={"Case Summary"}
          Content={
            <DashBoard
              filter={ApplyAppStatusFilter}
              filterProcessingDays={ApplyProcessingDaysFilter}
              appData={appData}
              appStat={appStat}
              selectedAppStatus={appSelectedStatus}
            />
          }
          IsExpand={showCDC}
          onExpand={HideNViewCDC}
        />

        <FollowupList
          appStatus={appSelectedStatus}
          appData={appData}
          height={gridHeight}
          reload={ReloadAppDisplay}
          reset={ResetAppDisplay}
        />
      </div>

      <DassCommon ref={DassCommonRef} confirmCallBack={handleLogout} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MainApp);
