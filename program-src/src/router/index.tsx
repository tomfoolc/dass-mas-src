import { IRoute, IUserRole } from "@/interface";

import LoginPage from "@/dass/LoginPage";

import ErrorPage from "@/dass/common/ErrorPage";
import HealthCheck from "@/dass/common/HealthCheck";
import SessionExpired from "@/dass/common/SessionExpired";
import ResetSecret from "@/dass/maintenance/ResetSecret";

import MainApp from "@/dass/mainapp/MainApp";
import CMSAppPanel from "@/dass/mainapp/CMSAppPanel";
import NewApp from "@/dass/mainapp/NewApp";
import SearchApp from "@/dass/mainapp/SearchApp";
import Document from "@/dass/mainapp/Document";

import DAApp from "@/dass/damaf/DAApp";

import ApplicationDetailReport from "@/dass/report/ApplicationDetailReport";
import ApplicationUtilsReport from "@/dass/report/ApplicationUtilsReport";
import ChangeStatusReasonReport from "@/dass/report/ChangeStatusReasonReport";

import EditProfile from "@/dass/maintenance/EditProfile";
import ChangeSecret from "@/dass/maintenance/ChangeSecret";
import CreateNewAccount from "@/dass/maintenance/CreateNewAccount";
import UserAccountMaint from "@/dass/maintenance/UserAccountMaint";

const defaultRoleList: IUserRole = { creator: '0', distributor: '0', assessor: '0', reviewer: '0', haits: '0', sysadmin: '0', ho: "0", clustercoord: "0" };
const RoleDAUser: IUserRole = { creator: '1', distributor: '1', assessor: '1', reviewer: '1', haits: '1', sysadmin: '1', ho: "1", clustercoord: "1" };

const RoleHAITSOnly: IUserRole = { creator: '0', distributor: '0', assessor: '0', reviewer: '0', haits: '1', sysadmin: '0', ho: "0", clustercoord: "0" };
const RoleCreatorOnly: IUserRole = { creator: '1', distributor: '0', assessor: '0', reviewer: '0', haits: '0', sysadmin: '0', ho: "0", clustercoord: "0" };

const RoleGeneralReportUser: IUserRole = { creator: '0', distributor: '0', assessor: '0', reviewer: '1', haits: '1', sysadmin: '1', ho: "1", clustercoord: "1" };
const RoleAdminReportUser: IUserRole = { creator: '0', distributor: '0', assessor: '0', reviewer: '0', haits: '1', sysadmin: '1', ho: "1", clustercoord: "1" };

let main: IRoute = { path: "/", element: <LoginPage />, auth: false, permission: defaultRoleList };
let login: IRoute = { path: "/login", element: <LoginPage />, auth: false, permission: defaultRoleList };
let healthcheck: IRoute = { path: "/healthcheck", element: <HealthCheck />, auth: false, permission: defaultRoleList };
let resetpwd: IRoute = { path: "/resetpwd", element: <ResetSecret />, auth: false, permission: defaultRoleList };
let sessionexpired: IRoute = { path: "/sessionexpired", element: <SessionExpired />, auth: false, permission: defaultRoleList };
let error: IRoute = { path: "/*", element: <ErrorPage />, auth: false, permission: defaultRoleList };

let cmsapp: IRoute = { path: "/cmsapp", element: <CMSAppPanel />, auth: false, permission: RoleDAUser };
let mainapp: IRoute = { path: "/mainapp", element: <MainApp />, auth: false, permission: RoleDAUser };
let daapp: IRoute = { path: "/daapp", element: <DAApp />, auth: false, permission: RoleDAUser };
let newapp: IRoute = { path: "/newapp", element: <NewApp />, auth: true, permission: RoleCreatorOnly };
let searchapp: IRoute = { path: "/searchapp", element: <SearchApp />, auth: false, permission: RoleDAUser };
let document: IRoute = { path: "/document", element: <Document />, auth: false, permission: RoleDAUser };

let editprofile: IRoute = { path: "/editprofile", element: <EditProfile />, auth: false, permission: RoleDAUser };
let changepassword: IRoute = { path: "/changepassword", element: <ChangeSecret />, auth: false, permission: RoleDAUser };

let createnewuser: IRoute = { path: "/createnewuser", element: <CreateNewAccount />, auth: true, permission: RoleHAITSOnly };
let useraccmaint: IRoute = { path: "/useraccmaint", element: <UserAccountMaint />, auth: true, permission: RoleHAITSOnly };

let rptappcount: IRoute = { path: "/rpt/apputils", element: <ApplicationUtilsReport />, auth: true, permission: RoleGeneralReportUser };
let rptchgreason: IRoute = { path: "/rpt/chgstatusreason", element: <ChangeStatusReasonReport />, auth: true, permission: RoleGeneralReportUser };
let rptappdetail: IRoute = { path: "/rpt/appdetail", element: <ApplicationDetailReport />, auth: true, permission: RoleAdminReportUser };

export const routers = [
    main,
    login,
    cmsapp,
    mainapp,
    daapp,
    newapp,
    searchapp,
    document,
    editprofile,
    changepassword,
    createnewuser,
    useraccmaint,
    rptappdetail,
    rptappcount,
    rptchgreason,
    healthcheck,
    resetpwd,
    sessionexpired,
    error,
];