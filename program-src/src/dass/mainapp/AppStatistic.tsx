import React from "react";
import FormControl from "@mui/material/FormControl";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { IAppStat } from "@/interface";

interface Props {
  stat?: IAppStat;
}

const AppStatistic = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const cssStyles = {
    container: {
      display: "flex",
      paddingRight: "5px",
      paddingLeft: "5px",
    },

    image: {
      height: 40,
      width: 40,
    },

    text: {
      fontSize: "14px",
    },
  };

  const handleModalOpen = () => {
    let modalContent = (
      <div>
        <div style={{ paddingTop: "5px" }} />
        <div
          className="alignCenter"
          style={{ width: "100%", border: "0px solid black", margin: "0px" }}
        >
          <div style={{ width: "100%", border: "0px solid black" }}>
            <div
              style={{
                width: "100%",
                paddingBottom: "6px",
                backgroundColor: "rgb(36,148,164)",
                color: "white",
              }}
            >
              {" "}
              Case Summary
            </div>
            <div className="row">
              <div style={{ width: "70%" }}>
                {" "}
                <b> Processing time </b>{" "}
              </div>
              <div style={{ width: "30%" }}>
                {" "}
                <b> Number of cases </b>{" "}
              </div>
            </div>
            <div className="row">
              <div style={{ width: "70%" }}> 0 - 1 Week </div>
              <div style={{ width: "30%" }}>{props.stat?.stat_1w}</div>
            </div>
            <div className="row">
              <div style={{ width: "70%" }}> 1 - 2 Weeks</div>{" "}
              <div style={{ width: "30%" }}>{props.stat?.stat_2w}</div>
            </div>
            <div className="row">
              <div style={{ width: "70%" }}> 2 - 3 Weeks</div>{" "}
              <div style={{ width: "30%" }}>{props.stat?.stat_3w}</div>
            </div>
            <div className="row">
              <div style={{ width: "70%" }}> 3 - 4 Weeks </div>{" "}
              <div style={{ width: "30%" }}>{props.stat?.stat_4w}</div>
            </div>
            <div className="row">
              <div style={{ width: "70%" }}> {"> 4 Weeks"} </div>{" "}
              <div style={{ width: "30%" }}>{props.stat?.stat_gtr4w}</div>
            </div>
          </div>
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }

  let renderHtml = null;

  renderHtml = (
    <div className="alignRight">
      <FormControl>
        <div style={cssStyles.container}>
          <img
            style={cssStyles.image}
            src={require("@/assets/images/chart.png")}
            alt=""
            onClick={handleModalOpen}
            onKeyDown={handleKeyDown}
          />
        </div>
        <DassCommon ref={DassCommonRef} mdWidth={600} mdHeight={200} />
      </FormControl>
    </div>
  );

  return renderHtml;
};

export default AppStatistic;
