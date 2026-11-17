import React from "react";
import { connect, useSelector } from "react-redux";
import Constant from "@/constant/Constant";
import { IUserConfig, IUserProfile } from "@/interface";

import { updateUserProfile, getOwnUserAcc } from "@/reducers";

import { Button, Label, Panel, InputControl } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import TopMenu from "../mainapp/TopMenu";
import CommonFunc from "@/common/CommonFunc";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  updateUserProfile: (userProfile: IUserProfile) => Promise<any>;
  getOwnUserAcc: () => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  updateUserProfile,
  getOwnUserAcc,
};

const EditProfile = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const { getOwnUserAcc } = props;

  const [isInit, setIsInit] = React.useState(true);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hospitalCde = userState.hospital_cde ? userState.hospital_cde : "";
  const userID = userState.user_id ? userState.user_id : "";

  const [userName, setUserName] = React.useState("");
  const [telNo, setTelNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [authSystem, setAuthSystem] = React.useState("");
  const [updBy, setUpdBy] = React.useState("");
  const [updDtm, setUpdDtm] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const LoadUserAcc = async () => {
      const response = await getOwnUserAcc();

      if (response.ret_cde === Constant.API_SUCCESS) {
        setUserName(response.result.name);
        setTelNo(response.result.telNo ? response.result.telNo : "");
        setEmail(response.result.email ? response.result.email : "");
        setUpdBy(response.result.updBy);
        setUpdDtm(response.result.updDtm);
        setAuthSystem(response.result.authSystem);
        setIsInit(false);
      }
    };

    if (isInit) {
      LoadUserAcc();
    }

    // eslint-disable-next-line
  }, [isInit, hospitalCde, userID]);

  const saveUserProfile = async () => {
    const { updateUserProfile } = props;
    let userProfile: IUserProfile = {
      hospital_cde: hospitalCde,
      user_id: userID,
      name: userName,
      tel_no: telNo,
      email: email,
      auth_system: authSystem,
      upd_dtm: updDtm,
      action_by_hosp: hospitalCde,
      action_by: userID,
    };

    const response = await updateUserProfile(userProfile);

    if (response.ret_cde === Constant.API_SUCCESS) {
      setUserName(response.result.name);
      setTelNo(response.result.telNo ? response.result.telNo : "");
      setEmail(response.result.email ? response.result.email : "");
      setUpdBy(response.result.updBy);
      setUpdDtm(response.result.updDtm);
      setAuthSystem(response.result.authSystem);

      DassCommonRef.current?.handleDialogOpen(
        "User profile has been successfully saved."
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Fail to update user profile.");
    }
  };

  return (
    <div className="page">
      <div id="mafapp_topmenu">
        <TopMenu />
      </div>

      <div className="header">Edit Profile</div>

      {!isInit ? (
        <div>
          <Panel
            Header={""}
            Content={
              <div>
                <div className="row">
                  <Label text="* Name" style={{ width: "220px" }} />
                  <InputControl
                    style={{ width: "400px" }}
                    value={userName}
                    maxLength={48}
                    onChange={(event: any) => setUserName(event.target.value)}
                    disabled={authSystem !== "DASS"}
                  />
                </div>
                <div className="row">
                  <Label text="Telephone No." style={{ width: "220px" }} />
                  <InputControl
                    style={{ width: "220px" }}
                    value={telNo}
                    maxLength={20}
                    onChange={(event: any) => setTelNo(event.target.value)}
                  />
                </div>
                <div className="row">
                  <Label text="E-mail" style={{ width: "220px" }} />
                  <InputControl
                    style={{ width: "300px" }}
                    value={email}
                    maxLength={50}
                    onChange={(event: any) => setEmail(event.target.value)}
                  />
                </div>
                <br />
              </div>
            }
            Remark={
              <div className="remark">
                <Label
                  text={
                    "Last update by " +
                    updBy +
                    " on " +
                    CommonFunc.Date.formatDisplayDateTime(updDtm) +
                    "."
                  }
                />
              </div>
            }
            Footer={
              <div>
                <Button text="Save" onClick={saveUserProfile} />
              </div>
            }
          />
        </div>
      ) : null}

      <DassCommon ref={DassCommonRef} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(EditProfile);
