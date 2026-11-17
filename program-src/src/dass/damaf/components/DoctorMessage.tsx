import React from "react";
import { connect, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";

import { Button } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";
import MessageCenter from "../MessageCenter";
import { getUnreadMessageCenterCount } from "@/reducers";
import Constant from "@/constant/Constant";
import { IMessageCenter, IUserConfig } from "@/interface";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface AppProps {
  da_app_no: string;
}

interface DispatchProps {
  getUnreadMessageCenterCount: (msgData: IMessageCenter) => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  getUnreadMessageCenterCount,
};

const DoctorMessage = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const userState: IUserConfig = useSelector(
    (state: StateProps) => state.das_data.UserData
  );

  const [unreadMessagCount, setUnreadMessagCount] = React.useState(0);

  const cssStyles = {
    message: {
      margin: "10px",
    },

    mailAlertCircle: {
      borderRadius: "50%",
      marginLeft: -10,
      width: "17px",
      height: "17px",
    },

    mailAlertText: {
      backgroundColor: "rgb(255,0,0)",
      fontSize: "12px",
      fontWeight: "bold",
      color: "white",
    },

    container: {
      display: "flex",
      paddingRight: "10px",
      paddingLeft: "10px",
    },

    image: {
      height: 40,
      width: 40,
    },

    text: {
      fontSize: "14px",
    },
  };

  React.useEffect(() => {
    getUnreadMessageCnt();
    // eslint-disable-next-line
  }, [props]);

  const getUnreadMessageCnt = async () => {
    if (props.da_app_no !== "") {
      let daAppNo = props.da_app_no;

      const { getUnreadMessageCenterCount } = props;
      let msgData: IMessageCenter = {};
      msgData.hospital_cde = userState.hospital_cde;
      msgData.user_id = userState.user_id;
      msgData.da_app_no = daAppNo;
      const response = await getUnreadMessageCenterCount(msgData);

      if (response.ret_cde === Constant.API_SUCCESS) {
        setUnreadMessagCount(response.result);
      }
      DassCommonRef.current?.handleLoadingClose();
    }
  };

  const handleModalOpen = () => {
    let modalContent = (
      <div>
        <div>
          <MessageCenter da_app_no={props.da_app_no} />
        </div>
        <br />
        <div className="alignRight">
          <Button text={"Close"} onClick={closeModal} />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const closeModal = () => {
    getUnreadMessageCnt();
    DassCommonRef.current?.handleModalClose();
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }

  let renderHtml = null;

  renderHtml = (
    <div className="alignRight">
      <FormControl>
        <div className="row" style={cssStyles.container}>
          <div onClick={handleModalOpen} onKeyDown={handleKeyDown}>
            <img 
              style={cssStyles.image} 
              src={require("@/assets/images/mail.png")}
              alt="" 
            />
          </div>
          {unreadMessagCount !== 0 ? (
            <div
              style={{
                ...cssStyles.mailAlertCircle,
                ...cssStyles.mailAlertText,
                zIndex: 2,
              }}
            >
              <div style={{ paddingRight: "4px" }}>{unreadMessagCount}</div>
            </div>
          ) : null}
        </div>
        <DassCommon
          ref={DassCommonRef}
          mdWidth={750}
          mdHeight={550}
          okCallBack={getUnreadMessageCnt}
        />
      </FormControl>
    </div>
  );

  return renderHtml;
};

export default connect(null, mapDispatchToProps)(DoctorMessage);
