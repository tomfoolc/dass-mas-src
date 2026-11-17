import React from "react";

import AppConstant from "@/constant/AppConstant";

interface AppProps {
  init?: boolean;
  active: boolean;
  complete: boolean;
  text: string;
  stage?: string;
  appdetail?: {};
}

const AppStage = (props: AppProps) => {
  const cssStyles = {
    circle: {
      borderRadius: "50%",
      width: "40px",
      height: "40px",
    },

    inactiveCircle: {
      marginTop: "10px",
      borderRadius: "50%",
      width: "17px",
      height: "17px",
    },

    line: {
      marginTop: "17px",
      width: "120px",
      height: "2px",
      color: "black",
      zIndex: 2,
    },

    complete: {
      backgroundColor: "green",
    },

    active: {
      backgroundColor: "rgb(242,183,105)",
    },

    inactive: {
      backgroundColor: "gray",
    },

    none: {
      backgroundColor: "",
    },

    text: {
      marginTop: "17px",
      width: "30px",
      fontSize: "9pt",
    },

    activeText: {
      marginTop: "5px",
      marginLeft: "10px",
      width: "30px",
      fontSize: "9pt",
      fontWeight: "bold",
    },
  };

  let appstatusDisplay = null;
  let activeImage = <div></div>;

  let lineStyle = {};
  let circleStyle = {};

  if (props.init) {
    if (props.complete) {
      lineStyle = { ...cssStyles.line, ...cssStyles.none };
      circleStyle = { ...cssStyles.inactiveCircle, ...cssStyles.complete };
    } else if (props.active) {
      lineStyle = { ...cssStyles.line, ...cssStyles.none };
      circleStyle = { ...cssStyles.circle, ...cssStyles.active };
    } else {
      lineStyle = { ...cssStyles.line, ...cssStyles.none };
      circleStyle = { ...cssStyles.inactiveCircle, ...cssStyles.inactive };
    }
  } else {
    if (props.complete) {
      lineStyle = { ...cssStyles.line, ...cssStyles.complete };
      circleStyle = { ...cssStyles.inactiveCircle, ...cssStyles.complete };
    } else if (props.active) {
      lineStyle = { ...cssStyles.line, ...cssStyles.complete };
      circleStyle = { ...cssStyles.circle, ...cssStyles.active };
    } else {
      lineStyle = { ...cssStyles.line, ...cssStyles.inactive };
      circleStyle = { ...cssStyles.inactiveCircle, ...cssStyles.inactive };
    }
  }

  let textStyle = {};
  if (props.active) {
    textStyle = { ...cssStyles.activeText };
  } else {
    textStyle = { ...cssStyles.text };
  }

  if (props.active) {
    if (props.stage === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE)
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_nc.png")}
          alt=""
        />
      );
    else if (props.stage === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE)
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_nf.png")}
          alt=""
        />
      );
    else if (
      props.stage === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE
    )
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_pe.png")}
          alt=""
        />
      );
    else if (props.stage === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE)
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_re.png")}
          alt=""
        />
      );
    else if (props.stage === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_co.png")}
          alt=""
        />
      );
    else if (props.stage === AppConstant.DASS_STATUS_CODE.CLOSED.CODE)
      activeImage = (
        <img
          style={{ width: "28px", height: "28px" }}
          src={require("@/assets/images/app_status_cl.png")}
          alt=""
        />
      );
  }

  appstatusDisplay = (
    <div style={{ border: "0px solid red" }}>
      <div className="row" style={{ border: "0px solid blue" }}>
        <div style={lineStyle}> </div>
        <div style={circleStyle}>
          <div
            style={{
              border: "0px solid purple",
              width: "28px",
              height: "28px",
              margin: "8px",
              marginTop: "6px",
            }}
          >
            {activeImage}
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "105px",
          height: "80px",
          overflow: "visible",
          border: "0px solid red",
        }}
      >
        <div style={textStyle}>{props.text}</div>
      </div>
    </div>
  );

  return <>{appstatusDisplay}</>;
};

export default AppStage;
