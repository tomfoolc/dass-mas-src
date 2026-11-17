import React from "react";
import { connect, useSelector } from "react-redux";
import Constant from "@/constant/Constant";
import { IUserConfig, IUserProfile } from "@/interface";

import { updateUserAcc, getUserAcc, resetSecretKey } from "@/reducers";
import {
  Button,
  Label,
  Panel,
  InputControl,
  DropdownList,
  CheckBox,
} from "@/layouts";
import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import TopMenu from "../mainapp/TopMenu";
import ErrorPage from "../common/ErrorPage";
import CommonFunc from "@/common/CommonFunc";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  updateUserAcc: (userProfile: IUserProfile) => Promise<any>;
  getUserAcc: (userProfile: IUserProfile) => Promise<any>;
  resetSecretKey: (userProfile: IUserProfile) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  updateUserAcc,
  getUserAcc,
  resetSecretKey,
};

const UserAccountMaint = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const DassResetSecretKey = React.useRef<DassCommonRefProps>(null);

  const [isInit, setIsInit] = React.useState(true);
  const [editMode, setEditMode] = React.useState(false);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hospitalCde = userState.hospital_cde ? userState.hospital_cde : "";
  const userID = userState.user_id ? userState.user_id : "";
  const sysRoleAdministrator = userState.role?.sysadmin;
  const sysRoleHaits = userState.role?.haits;
  const hospitalddlList = userState.hospitalListAry
    ? userState.hospitalListAry
    : [];
  const unitTypeList = [
    ["MSSU", "MSSU"],
    ["SPEC", "SPEC"],
    ["WARD", "WARD"],
    ["MRO", "MRO"],
    ["HO", "HO"],
  ];

  const [createHospitalCde, setCreateHospitalCde] = React.useState("");
  const [createUserId, setCreateUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [unitType, setUnitType] = React.useState("");
  const [unitCode, setUnitCode] = React.useState("");
  const [specialtyList, setSpecialtyList] = React.useState("");
  const [wardList, setWardList] = React.useState("");
  const [telNo, setTelNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [formCreator, setFormCreator] = React.useState(false);
  const [caseDistributor, setCaseDistributor] = React.useState(false);
  const [formAssessor, setFormAssessor] = React.useState(false);
  const [formReviewer, setFormReviewer] = React.useState(false);
  const [HAITS, setHAITS] = React.useState(false);
  const [systemAdministrator, setSystemAdministrator] = React.useState(false);
  const [HO, setHO] = React.useState(false);
  const [clusterCoordinator, setClusterCoordinator] = React.useState(false);
  const [attemptLogin, setAttemptLogin] = React.useState(0);
  const [authSystem, setAuthSystem] = React.useState("");
  const [updBy, setUpdBy] = React.useState("");
  const [updDtm, setUpdDtm] = React.useState<Date>(new Date());
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (isInit) {
      setCreateHospitalCde(hospitalCde);
      setIsInit(false);
    }

    // eslint-disable-next-line
  }, [isInit, hospitalCde, userID]);

  const LoadUserAcc = async () => {
    if (createUserId !== "") {
      const { getUserAcc } = props;
      let userProfile: IUserProfile = {
        hospital_cde: createHospitalCde,
        user_id: createUserId.toUpperCase(),
        action_by_hosp: hospitalCde,
        action_by: userID,
      };

      const response = await getUserAcc(userProfile);

      if (response.ret_cde === Constant.API_SUCCESS) {
        let user = response.result.userinfo;
        setCreateHospitalCde(user.hospital_cde);
        setCreateUserId(user.user_id);
        setUserName(user.name);
        setUnitCode(user.unit_code ? user.unit_code : "");
        setUnitType(
          user.unit_type
            ? user.unit_type === ""
              ? "OTH"
              : user.unit_type
            : "OTH"
        );
        setSpecialtyList(user.specialty ? user.specialty : "");
        setWardList(user.ward ? user.ward : "");
        setTelNo(user.tel_no ? user.tel_no : "");
        setEmail(user.email ? user.email : "");
        setUpdBy(user.upd_by);
        setUpdDtm(user.upd_dtm);
        setAttemptLogin(user.attempt_login);
        setAuthSystem(user.auth_system);

        let role = response.result.userrole;
        setFormCreator(role.creator === "1" ? true : false);
        setCaseDistributor(role.distributor === "1" ? true : false);
        setFormAssessor(role.assessor === "1" ? true : false);
        setFormReviewer(role.reviewer === "1" ? true : false);
        setSystemAdministrator(role.sysadmin === "1" ? true : false);
        setHAITS(role.haits === "1" ? true : false);
        setHO(role.ho === "1" ? true : false);
        setClusterCoordinator(role.clustercoord === "1" ? true : false);

        setEditMode(true);

        setMsg("");
      } else {
        setMsg("Account does not exist.");
      }
    }
  };

  const resetUserAccountOnChange = async () => {
    DassResetSecretKey.current?.handleDialogOpen(
      "Are you sure to reset user account?",
      "YN"
    );
  };

  const resetUserAccountActionHandler = async () => {
    const { resetSecretKey } = props;
    let userProfile: IUserProfile = {
      hospital_cde: createHospitalCde,
      user_id: createUserId.toUpperCase(),
      action_by_hosp: hospitalCde,
      action_by: userID,
    };

    const response = await resetSecretKey(userProfile);

    if (response.ret_cde === Constant.API_SUCCESS) {
      DassCommonRef.current?.handleDialogOpen("User account has been reset.");
    } else {
      DassCommonRef.current?.handleDialogOpen("Fail to reset user account.");
    }
  };

  const updateUserAccount = async () => {
    let newRoleList = "";
    if (formCreator) {
      newRoleList = newRoleList + "F_CREATOR,";
    }
    if (caseDistributor) {
      newRoleList = newRoleList + "CASE_DIST,";
    }
    if (formAssessor) {
      newRoleList = newRoleList + "F_ASSESSOR,";
    }
    if (formReviewer) {
      newRoleList = newRoleList + "F_REVIEWER,";
    }
    if (systemAdministrator) {
      newRoleList = newRoleList + "ADMIN,";
    }
    if (HAITS) {
      newRoleList = newRoleList + "HAITS,";
    }
    if (HO) {
      newRoleList = newRoleList + "HO,";
    }
    if (clusterCoordinator) {
      newRoleList = newRoleList + "CLUSTERCOORD,";
    }    
    if (newRoleList !== "") {
      newRoleList = newRoleList.substring(0, newRoleList.length - 1);
    }

    const { updateUserAcc } = props;
    let userProfile: IUserProfile = {
      hospital_cde: createHospitalCde,
      user_id: createUserId.toUpperCase(),
      name: userName,
      unit_code: unitCode,
      unit_type: unitType,
      specialty: specialtyList,
      ward: wardList,
      tel_no: telNo,
      email: email,
      auth_system: authSystem,
      upd_dtm: updDtm,
      action_by_hosp: hospitalCde,
      action_by: userID,
      role_list: newRoleList,
    };

    const response = await updateUserAcc(userProfile);

    if (response.ret_cde === Constant.API_SUCCESS) {
      LoadUserAcc();
      DassCommonRef.current?.handleDialogOpen(
        "User account has been successfully created."
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Fail to update user account.");
    }
  };

  const clearSearch = () => {
    setCreateUserId("");
    setUserName("");
    setUnitCode("");
    setUnitType("");
    setSpecialtyList("");
    setWardList("");
    setTelNo("");
    setEmail("");
    setUpdBy("");
    setAttemptLogin(0);
    setAuthSystem("");

    setFormCreator(false);
    setCaseDistributor(false);
    setFormAssessor(false);
    setFormReviewer(false);
    setSystemAdministrator(false);
    setHAITS(false);
    setHO(false);
    setClusterCoordinator(false);

    setMsg("");
    setEditMode(false);
  };

  const inputUserIdKeyDownHandler = (event: any) => {
    if (event.charCode === 13) {
      LoadUserAcc();
    }
  };

  const hospitalCdeOnChange = (value: string) => {
    setCreateHospitalCde(value);
  };

  const unitTypeOnChange = (value: string) => {
    setUnitType(value);
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }  

  if (sysRoleAdministrator === "1" || sysRoleHaits === "1") {
    return (
      <div className="page">
        <div id="mafapp_topmenu">
          <TopMenu />
        </div>

        <div className="header">User Account Maintenance</div>

        {!isInit ? (
          <div>
            <Panel
              Header={""}
              Content={
                <div>
                  <div className="row">
                    <Label text="Hospital" style={{ width: "220px" }} />
                    <DropdownList
                      value={createHospitalCde}
                      list={hospitalddlList}
                      onSelect={hospitalCdeOnChange}
                      width={400}
                      disabled={editMode || sysRoleHaits !== "1"}
                    />
                  </div>
                  <div className="row">
                    <Label text="* User Id" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={createUserId}
                      onChange={(event: any) =>
                        setCreateUserId(event.target.value)
                      }
                      onKeyPress={inputUserIdKeyDownHandler}
                      disabled={editMode}
                    />
                    <img
                      style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "25px",
                      }}
                      src={require("@/assets/images/search.png")}
                      alt="PDF Document"
                      onClick={LoadUserAcc}
                      onKeyDown={handleKeyDown}
                    />
                    <img
                      style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "25px",
                      }}
                      src={require("@/assets/images/clear.png")}
                      alt="PDF Document"
                      onClick={clearSearch}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="row">
                    <Label text="" style={{ width: "220px" }} />
                    <Label text={msg} style={{ color: "red" }} />
                    {editMode ? (
                      <Button
                        text="RESET USER ACCOUNT"
                        onClick={resetUserAccountOnChange}
                        style={{ width: "200px" }}
                        disabled={!editMode}
                      />
                    ) : null}
                  </div>

                  <div className="row">
                    <Label text="* Name" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "400px" }}
                      value={userName}
                      maxLength={48}
                      onChange={(event: any) => setUserName(event.target.value)}
                      disabled={!editMode || authSystem !== "DASS"}
                    />
                  </div>

                  <div className="row">
                    <Label text="Unit Type" style={{ width: "220px" }} />
                    <DropdownList
                      value={unitType}
                      list={unitTypeList}
                      onSelect={unitTypeOnChange}
                      width={220}
                      disabled={!editMode || authSystem !== "DASS"}
                    />
                  </div>

                  <div className="row">
                    <Label text="Unit Code" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={unitCode}
                      onChange={(event: any) => setUnitCode(event.target.value)}
                      disabled={!editMode || authSystem !== "DASS"}
                    />
                  </div>

                  <div className="row">
                    <Label text="Specialty List" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={specialtyList}
                      onChange={(event: any) =>
                        setSpecialtyList(event.target.value)
                      }
                      disabled={!editMode || authSystem !== "DASS"}
                    />
                  </div>

                  <div className="row">
                    <Label text="Ward List" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={wardList}
                      onChange={(event: any) => setWardList(event.target.value)}
                      disabled={!editMode || authSystem !== "DASS"}
                    />
                  </div>

                  <div className="row">
                    <Label text="Telephone No." style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={telNo}
                      maxLength={20}
                      onChange={(event: any) => setTelNo(event.target.value)}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="E-mail" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={email}
                      maxLength={50}
                      onChange={(event: any) => setEmail(event.target.value)}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="User Role" style={{ width: "220px" }} />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Form Creator"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={formCreator}
                      onClick={() => setFormCreator(!formCreator)}
                      disabled={!editMode}
                    />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Case Distributor"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={caseDistributor}
                      onClick={() => setCaseDistributor(!caseDistributor)}
                      disabled={!editMode}
                    />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Form Assessor"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={formAssessor}
                      onClick={() => setFormAssessor(!formAssessor)}
                      disabled={!editMode}
                    />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Form Reviewer"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={formReviewer}
                      onClick={() => setFormReviewer(!formReviewer)}
                      disabled={!editMode}
                    />                    
                  </div>

                  <div className="row">
                    <Label text="" style={{ width: "220px" }} />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Head Offce"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={HO}
                      onClick={() => setHO(!HO)}
                      disabled={!editMode}
                    />                    
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="System Administrator"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={systemAdministrator}
                      onClick={() =>
                        setSystemAdministrator(!systemAdministrator)
                      }
                      disabled={!editMode}
                    />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="Cluster Coordinator"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={clusterCoordinator}
                      onClick={() => setClusterCoordinator(!clusterCoordinator)}
                      disabled={!editMode}
                    />
                    <CheckBox
                      text={
                        <Label
                          symbol=""
                          text="HA ITS"
                          style={{ width: "160px" }}
                        />
                      }
                      isChecked={HAITS}
                      onClick={() => setHAITS(!HAITS)}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="Attempt Login" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={attemptLogin}
                      disabled={true}
                    />
                  </div>

                  <div className="row">
                    <Label text="Auth. System" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={authSystem}
                      disabled={true}
                    />
                  </div>

                  <br />
                </div>
              }
              Remark={
                <div className="remark">
                  {updBy !== "" ? (
                    <Label
                      text={
                        "Last update by " +
                        updBy +
                        " on " +
                        CommonFunc.Date.formatDisplayDateTime(updDtm) +
                        "."
                      }
                    />
                  ) : null}
                </div>
              }
              Footer={
                <div>
                  <Button
                    text="Save"
                    onClick={updateUserAccount}
                    disabled={!editMode}
                  />
                  &nbsp;
                  <Button text="Cancel" onClick={clearSearch} />
                </div>
              }
            />
          </div>
        ) : null}

        <DassCommon ref={DassCommonRef} />

        <DassCommon
          ref={DassResetSecretKey}
          confirmCallBack={resetUserAccountActionHandler}
        />
      </div>
    );
  } else return <ErrorPage />;
};

export default connect(null, mapDispatchToProps)(UserAccountMaint);
