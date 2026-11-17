import React from "react";
import { connect, useSelector } from "react-redux";
import Constant from "@/constant/Constant";
import { IUserConfig, IUserProfile } from "@/interface";

import { createUserAcc, getUserAcc } from "@/reducers";
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

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  createUserAcc: (userProfile: IUserProfile) => Promise<any>;
  getUserAcc: (userProfile: IUserProfile) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  createUserAcc,
  getUserAcc,
};

const CreateNewAccount = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

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
  const [authSystem, setAuthSystem] = React.useState("DASS");
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
        setMsg("Account already exists.");
      } else {
        setMsg("");
        setCreateUserId(createUserId.toUpperCase());
        setEditMode(true);
      }
    }
  };

  const createUserAccount = async () => {
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

    const { createUserAcc } = props;
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
      action_by_hosp: hospitalCde,
      action_by: userID,
      role_list: newRoleList,
    };

    const response = await createUserAcc(userProfile);

    if (response.ret_cde === Constant.API_SUCCESS) {
      clearSearch();
      DassCommonRef.current?.handleDialogOpen(
        "User account has been successfully created."
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Fail to create user account.");
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

    setFormCreator(false);
    setCaseDistributor(false);
    setFormAssessor(false);
    setFormReviewer(false);
    setSystemAdministrator(false);
    setHAITS(false);

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

        <div className="header">Create New User Account</div>

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
                    <Label
                      text={msg}
                      style={{ width: "220px", color: "red" }}
                    />
                  </div>

                  <div className="row">
                    <Label text="* Name" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "400px" }}
                      value={userName}
                      maxLength={48}
                      onChange={(event: any) => setUserName(event.target.value)}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="Unit Type" style={{ width: "220px" }} />
                    <DropdownList
                      value={unitType}
                      list={unitTypeList}
                      onSelect={unitTypeOnChange}
                      width={220}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="Unit Code" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={unitCode}
                      onChange={(event: any) => setUnitCode(event.target.value)}
                      disabled={!editMode}
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
                      disabled={!editMode}
                    />
                  </div>

                  <div className="row">
                    <Label text="Ward List" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={wardList}
                      onChange={(event: any) => setWardList(event.target.value)}
                      disabled={!editMode}
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
                    <Label text="Auth. System" style={{ width: "220px" }} />
                    <InputControl
                      style={{ width: "220px" }}
                      value={authSystem}
                      onChange={(event: any) => setAuthSystem("DASS")}
                      disabled={true}
                    />
                  </div>

                  <br />
                </div>
              }
              Footer={
                <div>
                  <Button
                    text="Save"
                    onClick={createUserAccount}
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
      </div>
    );
  } else return <ErrorPage />;
};

export default connect(null, mapDispatchToProps)(CreateNewAccount);
