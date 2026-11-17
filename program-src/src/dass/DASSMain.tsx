import React, { useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { destroyCMSPatientData, destroySession } from "@/dass/common/DASSUtils";

import { IRoute, ISystemData, IUserConfig, IUserRole } from "@/interface";

import { validateSession, updateTokenStore } from "@/reducers";

import { Button } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "./common/CommonModule";

import { routers } from "@/router";
import AuthRoute from "@/router/authRouter";

import SessionTimeout from "@/dass/common/SessionTimeout";

import Constant from "@/constant/Constant";

interface AppProps {
  isAuthenticated: boolean;
  isCMSLogon: boolean;
  hospitalCde: string;
  viewModule: string;
  roleList : IUserRole;
  das_data: {
    SystemData: ISystemData;
    UserData : IUserConfig;
  };
}

interface DispatchProps {
  validateSession: () => Promise<any>;
  updateTokenStore: (access_token: string) => void;
}

type Props = AppProps & DispatchProps;

const mapStateToProps = (state: AppProps) => {

  const systemDataReducer = state.das_data.SystemData;
  const isAuthenticated = systemDataReducer.isAuthenticated
    ? systemDataReducer.isAuthenticated
    : false;
  const isCMSLogon = systemDataReducer.isCMSLogon
    ? systemDataReducer.isCMSLogon
    : false;
  const hospitalCde = systemDataReducer.hospital_cde
    ? systemDataReducer.hospital_cde
    : "";

  const userDataReducer = state.das_data.UserData;
  const defaultRoleList : IUserRole = { creator: '0', distributor: '0', assessor: '0', reviewer: '0', haits: '0', sysadmin : '0', ho : "0", clustercoord: "0"};
  const roleList = userDataReducer.role ? userDataReducer.role : defaultRoleList;

  return {
    isAuthenticated,
    isCMSLogon,
    hospitalCde,
    roleList,
  };
};

const mapDispatchToProps = {
  validateSession,
  updateTokenStore,
};

const DASApp = (props: Props) => {

  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const dataFetchedRef = React.useRef(false);
  const [isAuthenticated] = useState(props.isAuthenticated);
  const [isCMSLogon] = useState(props.isCMSLogon);
  const [hospitalCde] = useState(props.hospitalCde);
  const [roleList] = useState(props.roleList);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (!isCMSLogon) {
      destroyCMSPatientData();
    }

  }, [isCMSLogon, isAuthenticated]);

  const checkSession = async () => {
    if (isAuthenticated) {
      const { validateSession, updateTokenStore } = props;
      const response = await validateSession();
      if (response.ret_cde === Constant.API_SUCCESS) {
        updateTokenStore(response.result.access_token);
      }
    }
  };

  const handleLogout = () => {
    destroySession(hospitalCde);
  };

  const routeAuth = (routers: IRoute[]) => {

    let dassRoute = routers.map((item: IRoute) => (
      <Route
        key={item.path}
        path={item.path}
        element={
          <AuthRoute key={item.path} auth={item.auth} children={item.element} isAuthenticated={isAuthenticated} pagePermission={roleList} userPermission={item.permission}/>
        }
      />
    ));

    return <>
      <SessionTimeout
        isAuthenticated={isAuthenticated}
        logOut={handleLogout}
      />
      <div className="devOnly">
        <Button text="Session" onClick={checkSession} />
      </div>
      <BrowserRouter>
        <Routes>
          {dassRoute}
        </Routes>
      </BrowserRouter>
      <DassCommon ref={DassCommonRef} okCallBack={handleLogout} />
    </>;

  };

  return routeAuth(routers);

};

export default connect(mapStateToProps, mapDispatchToProps)(DASApp);
