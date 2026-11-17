import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import CommonFunc from "@/common/CommonFunc";
import { BasicEncrypt } from "@/common/Encryptor";
import Constant from "@/constant/Constant";
import { IUserConfig, IUserProfile } from "@/interface";

import { Button, Label, Panel } from "@/layouts";

import { changeUserSecret } from "@/reducers";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import TopMenu from "../mainapp/TopMenu";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  changeUserSecret: (userProfile: IUserProfile) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  changeUserSecret,
};

const ChangePassword = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hospitalCde = userState.hospital_cde ? userState.hospital_cde : "";
  const userID = userState.user_id ? userState.user_id : "";

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const saveHandler = async () => {
    if (!oldPass) {
      DassCommonRef.current?.handleDialogOpen("Please input Current Password.");
      return;
    }

    if (!newPass) {
      DassCommonRef.current?.handleDialogOpen("Please input New Password.");
      return;
    }

    if (!confirmNewPass) {
      DassCommonRef.current?.handleDialogOpen(
        "Please input Confirm New Password."
      );
      return;
    }

    if (newPass !== confirmNewPass) {
      DassCommonRef.current?.handleDialogOpen(
        "The Confirm New Password must match the New Password entry."
      );
      return;
    }

    let bIsUpperCase = CommonFunc.Validate.hasUpperCase(newPass) ? 1 : 0;
    let bIsLowerCase = CommonFunc.Validate.hasLowerCase(newPass) ? 1 : 0;
    let bIsNumeric = CommonFunc.Validate.hasNumber(newPass) ? 1 : 0;
    let bIsNonAlphabetic = CommonFunc.Validate.hasNonAlphabetic(newPass)
      ? 1
      : 0;
    let bForbiddenCharacter = CommonFunc.Validate.hasForbiddenCharacter(
      newPass
    )
      ? 1
      : 0;

    if (bForbiddenCharacter === 1) {
      DassCommonRef.current?.handleDialogOpen(
        "The New Password contains forbidden characters."
      );
      return;
    }

    if (newPass.length < 8) {
      DassCommonRef.current?.handleDialogOpen(
        "The Minimum Password length should be longer than 8."
      );
      return;
    } else {
      if (bIsUpperCase + bIsLowerCase + bIsNumeric + bIsNonAlphabetic < 3) {
        DassCommonRef.current?.handleDialogOpen(
          "The password does not match with the password criteria."
        );
        return;
      }
    }

    const { changeUserSecret } = props;
    let userProfile: IUserProfile = {
      hospital_cde: hospitalCde,
      user_id: userID,
      new_password: BasicEncrypt(newPass),
      password: BasicEncrypt(oldPass),
      action_by_hosp: hospitalCde,
      action_by: userID,
    };

    const response = await changeUserSecret(userProfile);

    if (response.ret_cde === Constant.API_SUCCESS) {
      setOldPass("");
      setNewPass("");
      setConfirmNewPass("");
      DassCommonRef.current?.handleDialogOpen(
        "Password has been successfully changed.",
        "OK"
      );
    } else {
      DassCommonRef.current?.handleDialogOpen(
        response.ret_msg ? response.ret_msg : "Fail to change user password."
      );
    }
  };

  return (
    <div className="page">
      <TopMenu />

      <div className="header">Change Password</div>

      <div>
        <Panel
          Header={""}
          Content={
            <div>
              <form>
                <div className="row">
                  <Label text="Current Password" style={{ width: "220px" }} />
                  <input
                    type="password"
                    name="passkey"
                    value={oldPass}
                    onChange={(event: any) => setOldPass(event.target.value)}
                    autoComplete="off"
                    style={{ width: "220px" }}
                    maxLength={20}
                  />
                </div>
                <div className="row">
                  <Label text="New Password" style={{ width: "220px" }} />
                  <input
                    type="password"
                    name="passkey"
                    value={newPass}
                    onChange={(event: any) => setNewPass(event.target.value)}
                    autoComplete="off"
                    style={{ width: "220px" }}
                    maxLength={20}
                  />
                </div>
                <div className="row">
                  <Label
                    text="Confirm New Password"
                    style={{ width: "220px" }}
                  />
                  <input
                    type="password"
                    name="passkey"
                    value={confirmNewPass}
                    onChange={(event: any) =>
                      setConfirmNewPass(event.target.value)
                    }
                    autoComplete="off"
                    style={{ width: "220px" }}
                    maxLength={20}
                  />
                </div>
              </form>
            </div>
          }
          Remark={
            <div className="remark">
              Password criteria: <br />
              - The password should contain at least three of the following 4
              character groups: <br />
              * English uppercase characters (A through Z) <br />
              * English lower case characters (a through z) <br />
              * Numerals (0 through 9) <br />* Non-alphabetic characters (such
              as !, $, #, %, but not ^ , = & " ' {">"} {"<"} |) <br />
              - Minimum Password length: 8 characters <br />
              - Password Uniqueness: remember 6 passwords <br />
            </div>
          }
          Footer={
            <div>
              <Button
                text="Change Password"
                onClick={saveHandler}
                style={{ width: "180px" }}
              />
            </div>
          }
        />
      </div>

      <DassCommon ref={DassCommonRef} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ChangePassword);
