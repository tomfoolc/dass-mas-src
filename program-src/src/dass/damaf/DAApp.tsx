import React from "react";
import { connect, useSelector } from "react-redux";

import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Constant from "@/constant/Constant";
import AppConstant from "@/constant/AppConstant";

import {
  goToPage,
  destroyAppData,
  getUrlParam,
  destroySession,
  validSWDRefNo,
  getDisplayLength,
} from "@/dass/common/DASSUtils";

import {
  IAppData,
  IPatientData,
  ISystemData,
  IUserConfig,
} from "@/interface";

import {
  getApplicationByAppNo,
  createNewApplication,
  createDAMAFPrintoutData,
  updateApplicationData,
  changeAppStatus,
  reopenApplication,
  recallApplication,
  cancelApplication,
  editAppDate,
  setSignMethod,
  updateApplicationStore,
} from "@/reducers";

import { Button, Panel, PollDownMenu, PrintPDF } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import DAMAF from "./components/DAMAF";
import ApplicationInfo from "./components/ApplicationInfo";
import PatientInfo from "./components/PatientInfo";
import ApplicationDetail from "./components/ApplicationDetail";
import DAReq from "./components/DAReq";
import DoctorMessage from "./components/DoctorMessage";

import CMSPatientPanel from "../mainapp/components/CMSPatientHeader";
import AppStage from "./components/AppStage";

import ESignature from "./ESignature";
import PrintMAF from "./PrintMAF";
import PrintMAFwES from "./PrintMAFwES";
import DownloadSignedMAF from "./DownloadSignedMAF";
import ViewAppLog from "./ViewAppLog";
import InputReopenReason from "./components/InputReopenReason";
import InputRecallReason from "./components/InputRecallReason";
import InputReopenType from "./components/InputReopenType";
import InputCancelReason from "./components/InputCancelReason";
import EditApplicationDate from "./components/EditApplicationDate";

import "../css/DAApp.css";
import CommonFunc from "@/common/CommonFunc";
import CaseNotifcationPrintout from "../mainapp/components/CaseNotifcationPrintout";

interface StateProps {
  das_data: {
    PatientData: IPatientData;
    AppData: IAppData;
    UserData: IUserConfig;
    SystemData: ISystemData;
  };
}

interface DispatchProps {
  getApplicationByAppNo: (hkid: string) => Promise<any>;
  createNewApplication: (appData: IAppData) => Promise<any>;
  updateApplicationData: (appData: IAppData) => Promise<any>;
  changeAppStatus: (appData: IAppData) => Promise<any>;
  reopenApplication: (appData: IAppData) => Promise<any>;
  recallApplication: (appData: IAppData) => Promise<any>;
  cancelApplication: (appData: IAppData) => Promise<any>;
  editAppDate: (appData: IAppData) => Promise<any>;
  setSignMethod: (appData: IAppData) => Promise<any>;
  updateApplicationStore: (appData: IAppData) => void;
  createDAMAFPrintoutData: (da_app_no: string, add_esign: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getApplicationByAppNo,
  createNewApplication,
  updateApplicationData,
  changeAppStatus,
  reopenApplication,
  recallApplication,
  cancelApplication,
  editAppDate,
  setSignMethod,
  updateApplicationStore,
  createDAMAFPrintoutData,
};

const DAApp = (props: Props) => {
  const {
    getApplicationByAppNo,
    createNewApplication,
    updateApplicationData,
    changeAppStatus,
    reopenApplication,
    recallApplication,
    cancelApplication,
    editAppDate,
    setSignMethod,
    updateApplicationStore,
    createDAMAFPrintoutData,
  } = props;

  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const DassCommonLogout = React.useRef<DassCommonRefProps>(null);
  const DassCommonReload = React.useRef<DassCommonRefProps>(null);

  const DassNewAppHandler = React.useRef<DassCommonRefProps>(null);
  const DassSubmitAppHandler = React.useRef<DassCommonRefProps>(null);
  const DassStarReviewHandler = React.useRef<DassCommonRefProps>(null);
  const DassCompleteReviewHandler = React.useRef<DassCommonRefProps>(null);
  const DassCloseReviewHandler = React.useRef<DassCommonRefProps>(null);

  const DassNewNSubmitHandler = React.useRef<DassCommonRefProps>(null);
  const DassNewNReviewHandler = React.useRef<DassCommonRefProps>(null);
  const DassSaveNSubmitHandler = React.useRef<DassCommonRefProps>(null);
  const DassSaveNCompleteHandler = React.useRef<DassCommonRefProps>(null);

  const DassRecallHandler = React.useRef<DassCommonRefProps>(null);
  const DassReopenCompletedAppHandler = React.useRef<DassCommonRefProps>(null);
  const DassReopenClosedAppHandler = React.useRef<DassCommonRefProps>(null);
  const DassCancelAppHandler = React.useRef<DassCommonRefProps>(null);
  const DassEditAppDateHandler = React.useRef<DassCommonRefProps>(null);

  const DassResignESignatureHandler = React.useRef<DassCommonRefProps>(null);
  const DassPrintDAMAFHandler = React.useRef<DassCommonRefProps>(null);
  const printButtonRef = React.useRef<HTMLButtonElement>(null);

  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const [isDataInit, setIsDataInit] = React.useState(false);

  const [dialogH, setDialogH] = React.useState(800);
  const [dialogW, setDialogW] = React.useState(800);
  const [reopenReasonCode, setReopenReasonCode] = React.useState("");
  const [reopenMafPart, setReopenMafPart] = React.useState("");
  const [reopenOthReason, setReopenOthReason] = React.useState("");
  const [reopenReason, setReopenReason] = React.useState("");

  const topMenuRef = React.useRef<HTMLInputElement>(null);
  const DAMAFRef = React.useRef<{
    CheckIsCompleteForm: (IsScroll: boolean) => string;
  }>(null);

  const patientDataState = useSelector(
    (state: StateProps) => state.das_data.PatientData
  );
  const [patientBased, setPatientBased] = React.useState(false);
  const [CMSPatient] = React.useState(
    patientDataState.hkid ? patientDataState.hkid : ""
  );

  const userState: IUserConfig = useSelector(
    (state: StateProps) => state.das_data.UserData
  );
  const sysRoleCaseCreator = userState.role?.creator;
  const sysRoleCaseDistributor = userState.role?.distributor;
  const sysRoleAssessor = userState.role?.assessor;
  const sysRoleCaseReviewer = userState.role?.reviewer;
  const sysRoleHaits = userState.role?.haits;
  const [userObj] = React.useState<IUserConfig>(userState);

  const appDataState: IAppData = useSelector(
    (state: StateProps) => state.das_data.AppData
  );

  const [daAppObj, setDaAppObj] = React.useState<IAppData>(appDataState);
  const daAppObjHandler = (appData: IAppData) => {
    setDaAppObj(appData);
  };

  const [daType, setDaType] = React.useState(appDataState.da_type);
  const [daAppNo, setDaAppNo] = React.useState(
    appDataState.da_app_no ? appDataState.da_app_no : ""
  );
  const [SWDReferApp, setSWDReferApp] = React.useState(
    appDataState.da_type === AppConstant.DASS_TYPE.REFER_FROM_SWD ? true : false
  ); // Phrase 1 : Not necessary to input address for Refer from SWD

  const [newAppDate, setNewAppDate] = React.useState("");

  const [isAllowHosptial, setIsAllowHosptial] = React.useState(false);
  const [isITSupport] = React.useState(userState.hospital_cde === "HAO" && sysRoleHaits === "1");
  const [isAllowUser] = React.useState(sysRoleCaseCreator === "1" || sysRoleCaseDistributor === "1" || sysRoleAssessor === "1" || sysRoleCaseReviewer === "1");

  const [showActionButton, setShowActionButton] = React.useState(false);
  const [showSaveNSubmit, setShowSaveNSubmit] = React.useState(false);
  const [showSaveNReview, setShowSaveNReview] = React.useState(false);
  const [showSaveNComplete, setShowSaveNComplete] = React.useState(false);
  const [showRecallButton, setShowRecallButton] = React.useState(false);
  const [showReopenButton, setShowReopenButton] = React.useState(false);

  const [showPrintCaseNotification, setShowPrintCaseNotification] = React.useState(false);
  const [showPrintCoveringMemoButton, setShowPrintCoveringMemoButton] = React.useState(false);
  const [showPrintMAFButton, setShowPrintMAFButton] = React.useState(false);
  const [showPrintESMAFButton, setShowPrintESMAFButton] = React.useState(false);

  const [showReSignButton, setShowReSignButton] = React.useState(false);
  const [showEditButton, setShowEditButton] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const [appStatus, setAppStatus] = React.useState(appDataState.app_status);
  const [eSignStatus, setESignStatus] = React.useState(appDataState.esign_status);
  const [appStatusDesc, setAppStatusDesc] = React.useState("");
  const [appStage, setAppStage] = React.useState(0);
  const [buttonAction, setButtonAction] = React.useState("");

  const [isAssessorOA, setIsAssessor] = React.useState(false);

  React.useEffect(() => {

    let pdaAppNo = getUrlParam("da_app_no");
    let newApp = getUrlParam("new_app");
    let inputMode = getUrlParam("input_mode");
    let da_app_no = pdaAppNo ? pdaAppNo : "";
    let is_new_app = newApp === "1" ? true : false;

    setDaAppNo(da_app_no);
    setSWDReferApp(appDataState.da_type === AppConstant.DASS_TYPE.REFER_FROM_SWD ? true : false);

    const InitAppForm = () => {

      if (appStatus !== "" && appStatus !== undefined) {
        setShowActionButton(false);
        setShowEditButton(false);
        setShowSaveNSubmit(false);
        setShowSaveNReview(false);
        setShowSaveNComplete(false);
        setShowReopenButton(false);
        setShowRecallButton(false);
        setShowPrintCaseNotification(false);
        setShowPrintCoveringMemoButton(false);
        setShowPrintMAFButton(false);
        setShowPrintESMAFButton(false);
        setShowReSignButton(false);
        if (!sysRoleAssessor || (sysRoleAssessor && appDataState.ax_doctor?.trim() === userState.user_id?.trim())) {
          setIsAssessor(true);
        }

        let appHosp = appDataState.create_by_hosp;
        let userHosp = userState.hospital_cde;

        setDaType(appDataState.da_type);
        setESignStatus(appDataState.esign_status);
        setIsAllowHosptial(appHosp === userHosp);

        if (CMSPatient) {
          setPatientBased(true);
        }

        if (appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) {
          setAppStatusDesc(AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.DESC);
          setAppStage(AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.SEQ);

          setButtonAction("Save");

          if (sysRoleCaseCreator === "1" && sysRoleAssessor === "1") {
            setShowSaveNReview(true);
          } else if (sysRoleCaseCreator === "1") {
            setShowActionButton(true);
            setShowSaveNSubmit(true);
          }
        } else if (appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE) {
          setAppStatusDesc(AppConstant.DASS_STATUS_CODE.SAVED_MAF.DESC);
          setAppStage(AppConstant.DASS_STATUS_CODE.SAVED_MAF.SEQ);

          setButtonAction("Submit");

          if (sysRoleCaseCreator === "1") {
            setShowActionButton(true);
            setShowEditButton(true);
            setShowSaveNSubmit(true);
          }

        } else if (
          appStatus ===
          AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE
        ) {
          setAppStatusDesc(
            AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.DESC
          );
          setAppStage(AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.SEQ);

          setButtonAction("Start Review");
          setShowPrintCaseNotification(true);

          if (sysRoleAssessor === "1") {
            setShowActionButton(true);
          }

          if (sysRoleCaseCreator === "1" || sysRoleCaseDistributor === "1") {
            setShowRecallButton(true);
          }
        } else if (
          appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE
        ) {
          setAppStatusDesc(AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.DESC);
          setAppStage(AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.SEQ);

          setButtonAction("Complete Review");
          setShowPrintCaseNotification(true);

          if (sysRoleAssessor === "1") {
            setShowSaveNComplete(true);
          }

          if (sysRoleAssessor === "1") {
            setShowActionButton(true);
            setShowEditButton(true);
          }
        } else if (
          appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE
        ) {
          setAppStatusDesc(AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.DESC);
          setAppStage(AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.SEQ);

          setButtonAction("Close Application");
          setShowPrintCaseNotification(true);

          if (sysRoleCaseReviewer === "1") {

            if (eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE || eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE) {
              setShowActionButton(true);
              if (appDataState.da_type === AppConstant.DASS_TYPE.NEW_FROM_MSSU)
                setShowEditButton(true);
            }
          }

          if (sysRoleCaseReviewer === "1" || sysRoleAssessor === "1") {
            setShowReopenButton(true);
          }

          if (sysRoleAssessor === "1") {
            if (eSignStatus === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE || eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE)
              setShowPrintMAFButton(true);
            if (eSignStatus === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE)
              setShowReSignButton(true);
          }

        } else if (appStatus === AppConstant.DASS_STATUS_CODE.CLOSED.CODE) {
          setAppStatusDesc(AppConstant.DASS_STATUS_CODE.CLOSED.DESC);
          setAppStage(AppConstant.DASS_STATUS_CODE.CLOSED.SEQ);

          if (sysRoleCaseReviewer === "1") {
            setShowReopenButton(true);
            if (eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE) {
              setShowPrintESMAFButton(true);
            } else if (eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE) {
              if (appDataState.da_type === AppConstant.DASS_TYPE.NEW_FROM_MSSU) {
                setShowPrintCoveringMemoButton(true);
              }
            }
          }
        } else {
          if (appStatus === AppConstant.DASS_STATUS_CODE.CANCELLED.CODE) {
            setAppStatusDesc(AppConstant.DASS_STATUS_CODE.CANCELLED.DESC);
          } else if (appStatus === AppConstant.DASS_STATUS_CODE.VOIDED.CODE) {
            setAppStatusDesc(AppConstant.DASS_STATUS_CODE.VOIDED.DESC);
          }
        }

        // Initial  Application - End
      }
    };

    const SearchAppData = async () => {
      DassCommonRef.current?.handleLoadingOpen(
        "Retrieving applications... Please wait"
      );

      const response = await getApplicationByAppNo(da_app_no);
      if (response !== null) {
        if (response.ret_cde === Constant.API_SUCCESS) {
          setTimeout(() => {
            updateApplicationStore(response.result[0]);
            daAppObjHandler(response.result[0]);
            setAppStatus(response.result[0].app_status);
            setIsLoadComplete(true);
            setIsDataInit(false);
          }, Constant.DELAY);
        } else {
          if (
            response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
            response.ret_msg !== ""
          ) {
            DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
          } else {
            DassCommonRef.current?.handleDialogOpen(
              response.ret_msg ? response.ret_msg : Constant.ERROR_MSG
            );
          }
        }
      } else {
        DassCommonRef.current?.handleDialogOpen(Constant.SYSTEM_ERROR_MSG);
      }

      DassCommonRef.current?.handleLoadingClose();
    };

    if (!isDataInit) {
      if (is_new_app) {
        InitAppForm();
        setIsLoadComplete(true);
        editHandler();
      } else if (da_app_no !== "") {
        if (!isLoadComplete) {
          if (
            !isLoadComplete &&
            !isDataInit &&
            da_app_no !== "" &&
            da_app_no !== undefined
          ) {
            setIsDataInit(true);
            SearchAppData();
          }
        } else {
          InitAppForm();
          if (inputMode === "1") {
            editHandler();
          }
        }
      } else {
        goToPage("/error");
      }
    }

    // eslint-disable-next-line
  }, [
    props,
    isLoadComplete,
    isDataInit,
    isAllowHosptial,
    getApplicationByAppNo,
    createNewApplication,
    updateApplicationStore,
    appStatus,
    eSignStatus,
    CMSPatient,
    userState,
    sysRoleCaseCreator,
    sysRoleAssessor,
    daAppObj,
    daAppNo,
  ]);

  const handleLogout = () => {
    destroySession(userState.hospital_cde);
  };

  const viewAppLogHandler = () => {
    let modalContent = null;
    setDialogH(550);
    setDialogW(840);
    modalContent = <ViewAppLog da_app_no={daAppNo} />;
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const cancelAppHandler = () => {
    let modalContent = (
      <div>
        <div>
          <InputCancelReason closeInputDialog={closeCancelAppInputDialog} />
        </div>
      </div>
    );
    setDialogH(250);
    setDialogW(650);
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const editAppDateHandler = () => {
    let modalContent = (
      <div>
        <div>
          <EditApplicationDate closeInputDialog={closeEditAppDateDialog} createDate={new Date(appDataState.create_dtm ? appDataState.create_dtm : "")} appDate={new Date(appDataState.app_date ? appDataState.app_date : "")} />
        </div>
      </div>
    );
    setDialogH(90);
    setDialogW(450);
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const printCoveringMemoHandler = async () => {
    let modalContent = null;
    setDialogH(800);
    setDialogW(800);

    let bAllowToPrint = await createPrintoutHandler(daAppNo, "N");

    if (bAllowToPrint) {
      modalContent = <PrintMAF printoutType={"MEMO"} />;
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Fail to create print covering memo. Please retry."
      );
    }
  };

  const printCaseNotification = async () => {
    printButtonRef.current?.click();
  };

  const resignMAFHandler = async () => {
    let msg = "Are you sure to re-sign this application?";
    if (!isAssessorOA) {
      msg = "This application is reviewed by another user." + msg
    }
    DassResignESignatureHandler.current?.handleDialogOpen(
      msg,
      "YN"
    );
  }

  const printDAMAF = async () => {
    if (eSignStatus === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE) {
      let msg = "Are you sure to print hardcopy for paper signature?";
      if (!isAssessorOA) {
        msg = "This application is reviewed by another user." + msg
      }
      DassPrintDAMAFHandler.current?.handleDialogOpen(
        msg,
        "YN"
      );
    } else {
      printMAFHandler();
    }
  }

  const confirmToPrintPhysicalMAF = async () => {
    setSignMethodActionHandler(AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE);
  }

  const printMAFHandler = async () => {

    let modalContent = null;
    setDialogH(800);
    setDialogW(800);

    let bAllowToPrint = await createPrintoutHandler(daAppNo, "N");

    if (bAllowToPrint) {
      modalContent = <PrintMAF printoutType={"DA_MAF"} />;
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Fail to create print DA MAF. Please retry."
      );
    }
  };

  const printESMAFHandler = async () => {
    let modalContent = null;
    setDialogH(800);
    setDialogW(800);

    let bAllowToPrint = await createPrintoutHandler(daAppNo, "N");

    if (bAllowToPrint) {
      modalContent = <PrintMAFwES daType={daType || ""} />;
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Fail to create print DA MAF. Please retry."
      );
    }
  };

  const downloadSignedMAFHandler = async () => {
    let modalContent = null;
    setDialogH(800);
    setDialogW(800);
    modalContent = <DownloadSignedMAF />;
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const closeRecallInputDialog = (reaosnCode: string, othReason: string, logMsg: string) => {
    DassCommonRef.current?.handleModalClose();
    if (reaosnCode !== undefined && logMsg.trim() !== "") {
      setReopenReasonCode(reaosnCode);
      setReopenOthReason(othReason);
      setReopenReason(logMsg);
      DassRecallHandler.current?.handleDialogOpen(
        "Are you sure to recall/return application?",
        "YN"
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Please select reason.");
    }
  };

  const closeCancelAppInputDialog = (reaosnCode: string, othReason: string, logMsg: string) => {
    DassCommonRef.current?.handleModalClose();
    if (reaosnCode !== undefined && logMsg.trim() !== "") {
      setReopenReasonCode(reaosnCode);
      setReopenOthReason(othReason);
      setReopenReason(logMsg);
      DassCancelAppHandler.current?.handleDialogOpen(
        "Are you sure to cancel application?",
        "YN"
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Please select reason.");
    }
  };

  const closeEditAppDateDialog = (appDate: string) => {
    DassCommonRef.current?.handleModalClose();
    if (appDate !== undefined && appDate.trim() !== "") {
      setNewAppDate(appDate);
      if (appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE && (eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE || eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE)) {
        DassEditAppDateHandler.current?.handleDialogOpen(
          "Editing the application date will require the doctor to re-sign the MAF. <br/> Are you sure to continue?",
          "YN"
        );
      } else {
        DassEditAppDateHandler.current?.handleDialogOpen(
          "Are you sure to edit application date?",
          "YN"
        );
      }
    }
  };

  const closeReopenTypeDialog = (reaosnCode: string, mafPart: string, othReason: string, logMsg: string) => {
    DassCommonRef.current?.handleModalClose();
    if (reaosnCode.indexOf("REOPENCL02") >= 0 || reaosnCode.indexOf("REOPENCL03") >= 0) {
      let modalContent = (
        <div>
          <div>
            <InputReopenReason closeInputDialog={closeReopenCompletedAppInputDialog} reopenType={reaosnCode} reopenForEditPIReason={logMsg} />
          </div>
        </div>
      );
      setDialogH(450);
      setDialogW(650);
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      closeReopenClosedAppInputDialog(reaosnCode, mafPart, othReason, logMsg);
    }
  }

  const closeReopenCompletedAppInputDialog = (reaosnCode: string, mafPart: string, othReason: string, logMsg: string) => {
    DassCommonRef.current?.handleModalClose();
    if (reaosnCode !== undefined && logMsg.trim() !== "") {
      setReopenReasonCode(reaosnCode);
      setReopenMafPart(mafPart);
      setReopenOthReason(othReason);
      setReopenReason(logMsg);
      DassReopenCompletedAppHandler.current?.handleDialogOpen(
        "Reopen the application for medical re-assessment would require further input by doctor. <br/>" +
        "Are you sure to reopen the application ?",
        "YN"
      );
    } else {
      DassCommonRef.current?.handleDialogOpen("Please select reason.");
    }
  };

  const closeReopenClosedAppInputDialog = (reaosnCode: string, mafPart: string, othReason: string, logMsg: string) => {
    DassCommonRef.current?.handleModalClose();
    setReopenReasonCode(reaosnCode);
    setReopenMafPart(mafPart);
    setReopenOthReason(othReason);
    setReopenReason(logMsg);
    DassReopenClosedAppHandler.current?.handleDialogOpen(
      "Are you sure to reopen application?",
      "YN"
    );
  };

  const recallHandler = () => {
    let modalContent = (
      <div>
        <div>
          <InputRecallReason closeInputDialog={closeRecallInputDialog} />
        </div>
      </div>
    );
    setDialogH(250);
    setDialogW(650);
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const reopenHandler = () => {
    let modalContent = null;
    if (appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) {
      modalContent = (
        <div>
          <div>
            <InputReopenReason closeInputDialog={closeReopenCompletedAppInputDialog} />
          </div>
        </div>
      );
      setDialogH(450);
      setDialogW(650);
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      modalContent = (
        <div>
          <div>
            <InputReopenType closeInputDialog={closeReopenTypeDialog} />
          </div>
        </div>
      );
      setDialogH(210);
      setDialogW(500);
      DassCommonRef.current?.handleModalOpen(modalContent);
    }

  };

  const patientInfoValidation = () => {

    if (daAppObj.addr) {
      if (daAppObj.addr !== undefined && getDisplayLength(daAppObj.addr) > AppConstant.APP_ADDR_LENGTH) {
        DassCommonRef.current?.handleDialogOpen(
          "Maximum address length is " + AppConstant.APP_ADDR_LENGTH + "."
        );
        return false;
      }
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Please input Patient Address."
      );
      return false;
    }

    if (!daAppObj.tel_no || daAppObj.tel_no === "") {
      DassCommonRef.current?.handleDialogOpen(
        "Please input Patient Telephone No."
      );
      return false;
    }

    if (daAppObj.da_ref_no != null) {
      if (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no)) {
        DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
        return false;
      }
    }

    if (daAppObj.remark !== undefined && getDisplayLength(daAppObj.remark) > AppConstant.APP_REMARK_LENGTH) {
      DassCommonRef.current?.handleDialogOpen(
        "Additional remark is too long."
      );
      return false;
    }

    return true;

  }

  const formSubmitValidation = () => {

    if (daAppObj.ax_hospital_type === "C" && (daAppObj.ax_clinic_code === null || daAppObj.ax_clinic_code === "")) {
      DassCommonRef.current?.handleDialogOpen(
        "Please select Clinic under Medical Assessment."
      );
      return false;
    }

    if (!daAppObj.ax_specialty_ward || daAppObj.ax_specialty_ward === "") {
      DassCommonRef.current?.handleDialogOpen(
        "Please select Specialty / Ward under Medical Assessment."
      );
      return false;
    }    

    return true;
  }

  const multiActionHandler = () => {

    if (SWDReferApp) {
      if (daAppObj.da_ref_no == null || !validSWDRefNo(daAppObj.da_ref_no)) {
        DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
        return;
      }
    } else {

      if ( !patientInfoValidation()) {
        return;
      }

    }

    if ( !formSubmitValidation()) {
      return;
    }    

    if (appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) {
      if (sysRoleAssessor === "1") {
        DassNewNReviewHandler.current?.handleDialogOpen(
          "Are you sure to save & review application?",
          "YN"
        );
      } else {
        DassNewNSubmitHandler.current?.handleDialogOpen(
          "Are you sure to save & submit application?",
          "YN"
        );
      }
    } else if (appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE) {
      DassSaveNSubmitHandler.current?.handleDialogOpen(
        "Are you sure to save & submit application?",
        "YN"
      );
    }
  };

  const actionHandler = () => {

    if (appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) {

      if (SWDReferApp) {

        if (daAppObj.da_ref_no == null || (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no))) {
          DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
          return;
        }

      } else {

        if (daAppObj.da_ref_no != null) {
          if (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no)) {
            DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
            return;
          }
        }

      }

      DassNewAppHandler.current?.handleDialogOpen(
        "Are you sure to save application?",
        "YN"
      );

    } else if (appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE) {

      if (SWDReferApp) {

        if (daAppObj.da_ref_no == null || (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no))) {
          DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
          return;
        }

      } else {

        if ( !patientInfoValidation()) {
          return;
        }

      }

      if ( !formSubmitValidation()) {
        return;
      }  

      DassSubmitAppHandler.current?.handleDialogOpen(
        "Are you sure to submit application?",
        "YN"
      );
      
    } else if (
      appStatus === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE
    ) {
      DassStarReviewHandler.current?.handleDialogOpen(
        "Are you sure to start medical review?",
        "YN"
      );
    } else if (appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE) {
      let IsCompleteForm = true;
      let ErrorMsg = DAMAFRef.current?.CheckIsCompleteForm(false);
      if (ErrorMsg !== "") IsCompleteForm = false;
      if (IsCompleteForm) {
        DassCompleteReviewHandler.current?.handleDialogOpen(
          "Are you sure to save & complete review?",
          "YN"
        );
      } else {
        DassCommonRef.current?.handleDialogOpen("The review is incomplete.");
      }
    } else if (appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) {
      let msg = "<div> Are you sure to close application? </div>";
      if (eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE) {
        msg = "<div> Please make sure physically signed DA MAF is received before closing application. </div>" + msg
      }
      DassCloseReviewHandler.current?.handleDialogOpen(
        msg,
        "YN"
      );
    }
  };

  const saveRecord = async () => {
    updateApplicationStore(daAppObj);
    return 1;
  };

  const performActionSAVE_APP = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await saveRecord();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      return 1;
    } else return 0;
  };

  const reloadPage = () => {
    destroyAppData();
    goToPage(Constant.DAAPP + "?&da_app_no=" + appDataState.da_app_no);
  };

  const editHandler = () => {
    setEditMode(true);
  };

  const saveNCompleteHandler = () => {
    let IsCompleteForm = true;
    let ErrorMsg = DAMAFRef.current?.CheckIsCompleteForm(true);
    if (ErrorMsg !== "") IsCompleteForm = false;
    if (IsCompleteForm) {
      DassSaveNCompleteHandler.current?.handleDialogOpen(
        "Are you sure to save & complete review?",
        "YN"
      );
    } else {
      DassCommonRef.current?.handleDialogOpen(ErrorMsg ? ErrorMsg : "");
    }
  };

  const cancelHandler = () => {
    DassCommonReload.current?.handleDialogOpen(
      "Are you sure to cancel the changes?",
      "YN"
    );
  };

  const closeHandler = () => {
    destroyAppData();
    if (patientBased) {
      goToPage("/cmsapp");
    } else {
      goToPage(Constant.SYSTEMPAGE);
    }
  };

  const createPrintoutHandler = async (daAppNo: string, add_esign: string) => {
    if (daAppNo !== "") {
      let da_app_no = daAppNo;
      const response = await createDAMAFPrintoutData(da_app_no, add_esign);
      if (response.ret_cde === Constant.API_SUCCESS) {
        return true;
      } else {
        return false;
      }
    }
  };

  const newAppActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE;
      CreateApplication(appReqData);
    }
  };

  const newNSubmitActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status =
        AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE;
      CreateApplication(appReqData);
    }
  };

  const saveNSubmitActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status =
        AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE;
      UpdateApplication(appReqData);
    }
  };

  const newNReviewActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE;
      appReqData.ax_doctor = userState.user_id;
      CreateApplication(appReqData);
    }
  };

  const submitAppActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status =
        AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE;
      ChangeApplicationStatus(appReqData);
    }
  };

  const startReviewActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE;
      appReqData.ax_doctor = userState.user_id;
      StartReview(appReqData);
    }
  };

  const completeReviewActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE;
      appReqData.ax_doctor = userState.user_id;
      ChangeApplicationStatus(appReqData);
    }
  };

  const closeReviewActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.CLOSED.CODE;
      appReqData.close_dtm = CommonFunc.Date.formatDate(new Date());
      ChangeApplicationStatus(appReqData);
    }
  };

  const saveNCompleteActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE;
      if (sysRoleAssessor === "1") {
        appReqData.ax_doctor = userState.user_id;
      }
      UpdateApplication(appReqData);
    }
  };

  const recallActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE;
      appReqData.uc_reason_code = reopenReasonCode;
      appReqData.uc_oth_reason = reopenOthReason;
      appReqData.user_change_reason = reopenReason;
      RecallApplication(appReqData);
    }
  };

  const cancelAppActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status = AppConstant.DASS_STATUS_CODE.CANCELLED.CODE;
      appReqData.uc_reason_code = reopenReasonCode;
      appReqData.uc_oth_reason = reopenOthReason;
      appReqData.user_change_reason = reopenReason;
      CancelApplication(appReqData);
    }
  };

  const editAppDateActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1 && newAppDate !== "") {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_date = newAppDate;
      EditAppDate(appReqData);
    }
  };

  const reopenCompletedAppActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status =
        AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE;
      appReqData.uc_reason_code = reopenReasonCode;
      appReqData.uc_maf_change_part = reopenMafPart;
      appReqData.uc_oth_reason = reopenOthReason;
      appReqData.user_change_reason = reopenReason;
      ReopenCompletedApplication(appReqData);
    }
  };

  const reopenClosedAppActionHandler = async () => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.app_status =
        AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE;
      appReqData.uc_reason_code = reopenReasonCode;
      appReqData.uc_maf_change_part = reopenMafPart;
      appReqData.uc_oth_reason = reopenOthReason;
      appReqData.user_change_reason = reopenReason;
      ReopenClosedApplication(appReqData);
    }
  };

  const setSignMethodActionHandler = async (sign_method: string) => {
    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      appReqData.ax_doctor = userState.user_id;
      appReqData.esign_status = sign_method;
      const response = await setSignMethod(appReqData);
      if (response.ret_cde === Constant.API_SUCCESS) {
        let appData: any = { esign_status: sign_method }
        updateApplicationStore(appData);
        printMAFHandler();
      } else {
        DassCommonRef.current?.handleDialogOpen(
          "Fail to confirm with paper signature. Please retry."
        );
        return;
      }
    }
  };

  const saveHandler = async () => {

    if (appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) {
      if (!SWDReferApp) {
        if (daAppObj.addr) {
          if (daAppObj.addr !== undefined && getDisplayLength(daAppObj.addr) > AppConstant.APP_ADDR_LENGTH) {
            DassCommonRef.current?.handleDialogOpen(
              "Maximum address length is " + AppConstant.APP_ADDR_LENGTH + "."
            );
            return;
          }
        } else {
          DassCommonRef.current?.handleDialogOpen(
            "Please input Patient Address."
          );
          return;
        }

        if (!daAppObj.tel_no || daAppObj.tel_no === "") {
          DassCommonRef.current?.handleDialogOpen(
            "Please input Patient Telephone No."
          );
          return;
        }

        if (daAppObj.remark !== undefined && getDisplayLength(daAppObj.remark) > AppConstant.APP_REMARK_LENGTH) {
          DassCommonRef.current?.handleDialogOpen(
            "Additional remark is too long."
          );
          return;
        }
      }
    } else {

      if (SWDReferApp) {
        if (daAppObj.da_ref_no == null || (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no))) {
          DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
          return;
        }
      } else {
        if (daAppObj.da_ref_no != null) {
          if (daAppObj.da_ref_no.length > 0 && !validSWDRefNo(daAppObj.da_ref_no)) {
            DassCommonRef.current?.handleDialogOpen("Invalid SSFU Ref.");
            return;
          }
        }
      }

    }

    DassCommonRef.current?.handleLoadingOpen("Please wait...");
    const result = await performActionSAVE_APP();
    if (result === 1) {
      DassCommonRef.current?.handleLoadingClose();
      let appReqData: IAppData = { ...daAppObj };
      appReqData.upd_by_hosp = userState.hospital_cde;
      appReqData.upd_by_unit = userState.unit_code;
      appReqData.upd_by_unit_type = userState.unit_type;
      appReqData.upd_by = userState.user_id;
      if (sysRoleAssessor === "1") {
        appReqData.ax_doctor = userState.user_id;
      }
      UpdateApplication(appReqData);
    }

  };

  // DB Access - Begin

  const CreateApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await createNewApplication(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      if (
        response.result.app_status ===
        AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE
      ) {
        goToPage(
          Constant.DAAPP +
          "?&da_app_no=" +
          response.result.da_app_no +
          "&input_mode=1"
        );
      } else {
        goToPage(Constant.DAAPP + "?&da_app_no=" + response.result.da_app_no);
      }
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to create new application. Please retry."
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();

  };

  const CompleteProcessingESignature = (eSignResult: string) => {
    let appData: any = { esign_status: eSignResult }
    updateApplicationStore(appData);
    DassCommonRef.current?.handleModalClose();
    const reload = () => {
      DassCommonReload.current?.handleModalClose();
      reloadPage();
    }
    let msg =
      <div>
        <div className="row">
          <img
            style={{ marginTop: 3, height: 35, width: 40, }}
            src={require("@/assets/images/information.png")}
            alt=""
          />
          <div style={{ fontFamily: "Verdana, Tahoma, sans-serif", color: "black", padding: "8px", minWidth: "250px" }}>
            Fail to sign this application with eSignature.
            <br />
            Please click
            <img
              src={require("@/assets/images/re_sign.png")}
              alt=""
            />
            for re-sign application with eSignature or click
            <img
              src={require("@/assets/images/print_da_maf.png")}
              alt=""
            />
            for paper signature.
            <br />
          </div>
        </div>

        <div className="row" style={{ display: "flex", justifyContent: "flex-end" }} >
          <Button text="OK" onClick={reload} focus={"true"} />
        </div>
      </div>;
    if (eSignResult !== AppConstant.DASS_STATUS_CODE.SIGNED.CODE) {
      DassCommonReload.current?.handleModalOpen(
        msg
      );
    } else {
      reloadPage();
    }
  }

  const generateDAMAFForESignature = async () => {

    let modalContent = null;
    setDialogH(140);
    setDialogW(450);

    let bAllowToPrint = await createPrintoutHandler(daAppNo, "Y");

    if (bAllowToPrint) {
      modalContent = <ESignature closeESign={CompleteProcessingESignature} />;
      DassCommonRef.current?.handleModalOpen(modalContent);
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Fail to apply e-Signature. Please retry."
      );
    }

  }

  const UpdateApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await updateApplicationData(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      if (appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE && response.result.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) {
        generateDAMAFForESignature();
      } else {
        goToPage(Constant.DAAPP + "?&da_app_no=" + response.result.da_app_no);
      }
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to update application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const StartReview = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await changeAppStatus(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      goToPage(
        Constant.DAAPP +
        "?&da_app_no=" +
        response.result.da_app_no +
        "&input_mode=1"
      );
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to update application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const ChangeApplicationStatus = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await changeAppStatus(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      if (appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE && response.result.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) {
        generateDAMAFForESignature();
      }
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setAppStatus(response.result.app_status);
      setEditMode(false);
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to update application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const RecallApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await recallApplication(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      DassCommonRef.current?.handleLoadingClose();
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setAppStatus(response.result.app_status);
      setEditMode(false);
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to recall application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const CancelApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await cancelApplication(appReqData);

    if (response.ret_cde === Constant.API_SUCCESS) {

      DassCommonRef.current?.handleLoadingClose();
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setAppStatus(response.result.app_status);
      setEditMode(false);
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to cancel application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const ReopenCompletedApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await reopenApplication(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setAppStatus(response.result.app_status);
      setEditMode(false);
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to reopen application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const ReopenClosedApplication = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await reopenApplication(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setAppStatus(response.result.app_status);
      setEditMode(false);
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to reopen application. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  const EditAppDate = async (appReqData: IAppData) => {
    DassCommonRef.current?.handleLoadingOpen("Loading... Please wait");

    const response = await editAppDate(appReqData);
    if (response.ret_cde === Constant.API_SUCCESS) {
      updateApplicationStore(response.result);
      daAppObjHandler(response.result);
      setEditMode(false);
      DassCommonReload.current?.handleDialogOpen("Application Date is updated.", "OK");
    } else {
      if (
        response.validation_cde === Constant.CONNECTION_TIMEOUT_VCDE &&
        response.ret_msg !== ""
      ) {
        DassCommonLogout.current?.handleDialogOpen(response.ret_msg, "OK");
      } else if (response.validation_cde === Constant.UPD_DTM_NOT_SYNCED_VCDE) {
        DassCommonReload.current?.handleDialogOpen(response.ret_msg, "OK");
      } else {
        DassCommonRef.current?.handleDialogOpen(
          response.ret_msg
            ? response.ret_msg
            : "Fail to edit application date. Please retry.",
          "OK"
        );
      }
    }

    DassCommonRef.current?.handleLoadingClose();
  };

  // DB Access - End

  let topMenu = null;
  let headerContent = null;
  let statusFlowPanel = null;
  let patientPanelDisplay = null;
  let pageContent = null;
  let bottomMenu = null;

  if (patientBased)
    patientPanelDisplay = (
      <CMSPatientPanel hkid={daAppObj.hkid ? daAppObj.hkid : ""} />
    );

  const cssStyles = {
    topmenu: {
      height: 33,
      display: "flex",
      backgroundColor: "rgb(13, 113, 166)",
    },

    rightmenu: {
      display: "flex",
      marginTop: "0px",
      marginLeft: "auto",
      marginRight: "5px",
      color: "white",
      fontSize: "12px",
    },

    formControl: {
      m: 0,
      width: 0,
      height: 0,
      zIndex: 999,
    },

    list: {
      padding: 0,
      width: 320,
      maxWidth: 360,
      color: "white",
      backgroundColor: "rgb(13, 113, 166)",
    },

    listItem: {
      height: "25px",
    },

    image: {
      height: 25,
      width: 25,
    },

    text: {
      color: "black",
      textDecorationLine: "none",
      paddingRight: "10px",
    },
  };

  let appMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={cssStyles.listItem}
          disabled={
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
            (!isITSupport && !isAllowHosptial) ||
            (!isITSupport && !isAllowUser)
          }
        >
          <ListItem sx={cssStyles.listItem} onClick={viewAppLogHandler}>
            <ListItemText primary="View Application Log" />
          </ListItem>
        </ListItemButton>

        <ListItemButton
          sx={cssStyles.listItem}
          disabled={
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
            (appStatus !== AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE && appStatus !== AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE) ||
            sysRoleCaseCreator !== "1" ||
            !(isAllowHosptial) ||
            !(isAllowUser)
          }
        >
          <ListItem sx={cssStyles.listItem} onClick={cancelAppHandler}>
            <ListItemText primary="Cancel Application" />
          </ListItem>
        </ListItemButton>

        <ListItemButton
          sx={cssStyles.listItem}
          disabled={
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
            (appStatus !== AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE && appStatus !== AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE && appStatus !== AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE) ||
            sysRoleCaseReviewer !== "1" ||
            !(isAllowHosptial) ||
            !(isAllowUser)
          }
        >
          <ListItem sx={cssStyles.listItem} onClick={editAppDateHandler}>
            <ListItemText primary="Edit Application Date" />
          </ListItem>
        </ListItemButton>

        {sysRoleHaits === "1" && eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE ?
          <ListItemButton
            sx={cssStyles.listItem}
            disabled={
              appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE
            }
          >
            <ListItem sx={cssStyles.listItem} onClick={downloadSignedMAFHandler}>
              <ListItemText primary="Download e-signed DA MAF" />
            </ListItem>
          </ListItemButton>
          : null}

      </List>
    </FormControl>
  );

  let printMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >

        <ListItemButton
          sx={cssStyles.listItem}
          disabled={
            !(
              isAllowHosptial &&
              isAllowUser &&
              showPrintCaseNotification &&
              !editMode
            )
          }
        >
          <ListItem sx={cssStyles.listItem} onClick={printCaseNotification}>
            <ListItemText primary="Print Case Notification" />
          </ListItem>
        </ListItemButton>

        <ListItemButton
          sx={cssStyles.listItem}
          disabled={
            !(
              isAllowHosptial &&
              isAllowUser &&
              showPrintCoveringMemoButton &&
              !editMode
            )
          }
        >
          <ListItem sx={cssStyles.listItem} onClick={printCoveringMemoHandler}>
            <ListItemText primary="Print Covering Memo" />
          </ListItem>
        </ListItemButton>

        {eSignStatus !== AppConstant.DASS_STATUS_CODE.SIGNED.CODE ?
          <ListItemButton
            sx={cssStyles.listItem}
            disabled={
              !(
                isAllowHosptial &&
                isAssessorOA &&
                showPrintMAFButton &&
                !editMode
              )
            }
          >
            <ListItem sx={cssStyles.listItem} onClick={printDAMAF}>
              <ListItemText primary="Print DA MAF" />
            </ListItem>
          </ListItemButton>
          : null}

        {eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE ?
          <ListItemButton
            sx={cssStyles.listItem}
            disabled={
              !(
                isAllowHosptial &&
                showPrintESMAFButton &&
                !editMode
              )
            }
          >
            <ListItem sx={cssStyles.listItem} onClick={printESMAFHandler}>
              <ListItemText primary="Print DA MAF" />
            </ListItem>
          </ListItemButton>
          : null}

      </List>
    </FormControl>
  );

  topMenu = (
    <div>
      <div className="row">
        <div className="mafLeftmenu mafThemeColor">
          <div>
            <div style={cssStyles.topmenu}>
              <div className="row" style={{ margin: "0px 0px 0px 5px" }}>
                <div className="row">
                  <PollDownMenu text="Application" menuList={appMenu} />
                  <PollDownMenu text="Print" menuList={printMenu} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <input className="focusRef" ref={topMenuRef} />

        <div className="mafRightmenu">

          {isAllowHosptial &&
            isAllowUser &&
            appStatus === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE &&
            showPrintCaseNotification &&
            !editMode && (
              <Button
                text={"Print Case Notification"}
                onClick={printCaseNotification}
                style={{ width: "220px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showPrintCoveringMemoButton &&
            !editMode && (
              <Button
                text="Print Covering Memo"
                onClick={printCoveringMemoHandler}
                style={{ width: "200px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            isAssessorOA &&
            showPrintMAFButton &&
            !editMode && (
              <Button
                text="Print DA MAF"
                onClick={printDAMAF}
                style={{ width: "120px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showPrintESMAFButton &&
            !editMode && (
              <Button
                text="Print DA MAF"
                onClick={printESMAFHandler}
                style={{ width: "140px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            isAssessorOA &&
            showReSignButton &&
            !editMode && (
              <Button
                text="Re-sign"
                onClick={resignMAFHandler}
                style={{ width: "100px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showReopenButton &&
            !editMode && (
              <Button
                text={"Reopen"}
                onClick={reopenHandler}
                style={{ width: "120px" }}
                disabled={!isAllowUser}
              />
            )}


          {isAllowHosptial &&
            showRecallButton &&
            !editMode && (
              <Button
                text={"Recall / Return"}
                onClick={recallHandler}
                style={{ width: "160px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showActionButton &&
            (!editMode ||
              appStatus ===
              AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) && (
              <Button
                text={buttonAction}
                onClick={actionHandler}
                style={{ width: "180px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial && showEditButton && editMode && (
            <Button text="Save" onClick={saveHandler} disabled={!isAllowUser} />
          )}

          {isAllowHosptial &&
            showSaveNSubmit &&
            editMode && (
              <Button
                text={"Save & Submit"}
                onClick={multiActionHandler}
                style={{ width: "200px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showSaveNReview &&
            (!editMode ||
              appStatus ===
              AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) && (
              <Button
                text={"Save & Review"}
                onClick={multiActionHandler}
                style={{ width: "200px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showEditButton &&
            showSaveNComplete &&
            editMode && (
              <Button
                text="Save & Complete"
                onClick={saveNCompleteHandler}
                style={{ width: "200px" }}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showEditButton &&
            editMode && (
              <Button
                text="Cancel"
                onClick={cancelHandler}
                disabled={!isAllowUser}
              />
            )}

          {isAllowHosptial &&
            showEditButton &&
            !editMode && (
              <Button text="Edit" onClick={editHandler} disabled={!isAllowUser} />
            )}

          {(!editMode ||
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) &&
            patientBased && (
              <Button
                text="Back"
                onClick={closeHandler}
                style={{ width: "100px" }}
                disabled={!isAllowUser}
              />
            )}

          {(!editMode ||
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) &&
            !patientBased && (
              <Button
                text="CDC"
                onClick={closeHandler}
              />
            )}

        </div>
      </div>

      <div className="mafThemeColor" style={{ width: "100%", height: "2px" }}>
        {" "}
      </div>

      <div className="row">
        <div className="mafLeftmenu">
          {appStatus !== AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE &&
            isAllowHosptial && isAllowUser ? (
            <DoctorMessage
              da_app_no={daAppObj.da_app_no ? daAppObj.da_app_no : ""}
            />
          ) : null}
        </div>
        <div className="mafRightmenu">
          <div className="row">
            {appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE || appStatus === AppConstant.DASS_STATUS_CODE.CLOSED.CODE ?
              <div>
                {eSignStatus === AppConstant.DASS_STATUS_CODE.SIGNED.CODE ?
                  <div className="mafStatusSignedLabel"> {AppConstant.DASS_STATUS_CODE.SIGNED.DESC}</div>
                  : null}
                {eSignStatus === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE ?
                  <div className="mafStatusUnsignedLabel"> {AppConstant.DASS_STATUS_CODE.UNSIGNED.DESC}</div>
                  : null}
                {eSignStatus === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE ?
                  <div className="mafStatusManualsignedLabel"> {AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.DESC}</div>
                  : null}
              </div>
              : null
            }
            <div style={{ width: "10px" }}></div>
            <div className="mafStatusLabel">{appStatusDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );

  statusFlowPanel = (
    <div className="mafStatusFlowPanel">
      <div>
        <div className="row">
          <AppStage
            init={true}
            active={appStage === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.SEQ}
            complete={appStage > AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.SEQ}
            stage={AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE}
            text={AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.DESC}
          />

          <AppStage
            active={appStage === AppConstant.DASS_STATUS_CODE.SAVED_MAF.SEQ}
            complete={appStage > AppConstant.DASS_STATUS_CODE.SAVED_MAF.SEQ}
            stage={AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE}
            text={AppConstant.DASS_STATUS_CODE.SAVED_MAF.DESC}
          />

          <AppStage
            active={
              appStage ===
              AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.SEQ
            }
            complete={
              appStage >
              AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.SEQ
            }
            stage={AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE}
            text={AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.DESC}
          />

          <AppStage
            active={appStage === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.SEQ}
            complete={appStage > AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.SEQ}
            stage={AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE}
            text={AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.DESC}
          />

          <AppStage
            active={appStage === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.SEQ}
            complete={appStage > AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.SEQ}
            stage={AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE}
            text={AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.DESC}
          />

          <AppStage
            active={appStage === AppConstant.DASS_STATUS_CODE.CLOSED.SEQ}
            complete={appStage > AppConstant.DASS_STATUS_CODE.CLOSED.SEQ}
            stage={AppConstant.DASS_STATUS_CODE.CLOSED.CODE}
            text={AppConstant.DASS_STATUS_CODE.CLOSED.DESC}
          />
        </div>
      </div>
    </div>
  );

  if (
    appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
    appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
    appStatus === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE
  ) {
    headerContent = (
      <div>
        <Panel
          Header={<div> Application Status </div>}
          Content={statusFlowPanel}
        />
      </div>
    );

    pageContent = (
      <div>
        <Panel
          Header={<div> Patient Information </div>}
          Content={
            <PatientInfo
              userConf={userObj}
              daAppObj={daAppObj}
              setDaAppObj={daAppObjHandler}
              disabled={
                !(
                  editMode &&
                  (appStatus ===
                    AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                    appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE)
                )
              }
            />
          }
        />

        <Panel
          Header={<div> Application Details </div>}
          Content={
            <div>

              <ApplicationInfo
                daAppObj={daAppObj}
                setDaAppObj={daAppObjHandler}
                disabled={
                  editMode === false ||
                  (appStatus !==
                    AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE &&
                    appStatus !== AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE)
                }
              />

              <ApplicationDetail
                daAppObj={daAppObj}
                setDaAppObj={daAppObjHandler}
                disabled={
                  !(
                    editMode &&
                    (appStatus ===
                      AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                      appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE)
                  ) || daType === "R"
                }
              />

            </div>
          }
        />

        <Panel
          Header={<div> Medical Assessment </div>}
          Content={
            <DAReq
              userConf={userObj}
              daAppObj={daAppObj}
              setDaAppObj={daAppObjHandler}
              disabled={editMode === false}
            />
          }
        />
      </div>
    );

    bottomMenu = (
      <div className="alignRight" style={{ height: "40px" }}>
        {isAllowHosptial &&
          showActionButton &&
          editMode &&
          appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE && (
            <Button
              text={buttonAction}
              onClick={actionHandler}
              style={{ width: "180px" }}
              disabled={!isAllowUser}
            />
          )}

        {isAllowHosptial &&
          showActionButton &&
          !editMode &&
          appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE && (
            <Button
              text={buttonAction}
              onClick={actionHandler}
              style={{ width: "180px" }}
              disabled={!isAllowUser}
            />
          )}

        {isAllowHosptial && showEditButton && editMode && (
          <Button text="Save" onClick={saveHandler} disabled={!isAllowUser} />
        )}

        {isAllowHosptial &&
          showSaveNSubmit &&
          editMode && (
            <Button
              text={"Save & Submit"}
              onClick={multiActionHandler}
              style={{ width: "200px" }}
              disabled={!isAllowUser}
            />
          )}

        {isAllowHosptial &&
          showSaveNReview &&
          (!editMode ||
            appStatus ===
            AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) && (
            <Button
              text={"Save & Review"}
              onClick={multiActionHandler}
              style={{ width: "200px" }}
              disabled={!isAllowUser}
            />
          )}

      </div>
    );
  } else if (
    appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE ||
    appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE ||
    appStatus === AppConstant.DASS_STATUS_CODE.CLOSED.CODE
  ) {
    headerContent = (
      <div>
        <Panel
          Header={<div> Application Status </div>}
          Content={statusFlowPanel}
        />
      </div>
    );

    pageContent = (
      <div>
        <div>
          <Panel
            Header={<div> Patient Information </div>}
            Content={
              <PatientInfo
                userConf={userObj}
                daAppObj={daAppObj}
                setDaAppObj={daAppObjHandler}
                disabled={
                  !(
                    editMode &&
                    (appStatus ===
                      AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                      appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                      (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                    )
                  )
                }
              />
            }
          />

          <Panel
            Header={<div> Application Detail </div>}
            Content={

              <div>

                <ApplicationInfo
                  daAppObj={daAppObj}
                  setDaAppObj={daAppObjHandler}
                  disabled={
                    !(
                      editMode &&
                      (appStatus ===
                        AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                        appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                        (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                      )
                    )
                  }
                  allowedForMSSU={false}
                />

                <ApplicationDetail
                  daAppObj={daAppObj}
                  setDaAppObj={daAppObjHandler}
                  disabled={
                    !(
                      editMode &&
                      (appStatus ===
                        AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                        appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                        (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                      )
                    )
                  }
                />

              </div>
            }
          />
        </div>

        <DAMAF
          daAppObj={daAppObj}
          setDaAppObj={daAppObjHandler}
          ref={DAMAFRef}
          disabled={
            !(
              editMode &&
              appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE
            )
          }
        />

        <div className="alignRight" style={{ height: "40px" }}>
          {isAllowHosptial && showEditButton && editMode && (
            <div>
              <Button text="Save" onClick={saveHandler} />
              {showSaveNComplete && (
                <Button
                  text="Save & Complete"
                  onClick={saveNCompleteHandler}
                  style={{ width: "200px" }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );

    bottomMenu = (
      <div className="alignRight" style={{ height: "40px" }}>

        {isAllowHosptial &&
          showPrintCoveringMemoButton &&
          !editMode && (
            <Button
              text="Print Covering Memo"
              onClick={printCoveringMemoHandler}
              style={{ width: "200px" }}
            />
          )}

        {isAllowHosptial &&
          showPrintMAFButton &&
          !editMode && (
            <Button
              text="Print DA MAF"
              onClick={printDAMAF}
              style={{ width: "140px" }}
            />
          )}

        {isAllowHosptial &&
          showPrintESMAFButton &&
          !editMode && (
            <Button
              text="Print DA MAF"
              onClick={printESMAFHandler}
              style={{ width: "140px" }}
            />
          )}

        {isAllowHosptial &&
          showReSignButton &&
          !editMode && (
            <Button
              text="Re-sign"
              onClick={resignMAFHandler}
              style={{ width: "100px" }}
            />
          )}

        {isAllowHosptial &&
          showActionButton &&
          (!editMode ||
            appStatus === AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE) && (
            <Button
              text={buttonAction}
              onClick={actionHandler}
              style={{ width: "180px" }}
              disabled={!isAllowUser}
            />
          )}
      </div>
    );
  } else if (
    appStatus === AppConstant.DASS_STATUS_CODE.CANCELLED.CODE ||
    appStatus === AppConstant.DASS_STATUS_CODE.VOIDED.CODE
  ) {

    headerContent = (
      <div>
        <Panel
          Header={<div> Application Status </div>}
          Content={statusFlowPanel}
        />
      </div>
    );

    pageContent = (
      <div>
        <div>
          <Panel
            Header={<div> Patient Information </div>}
            Content={
              <PatientInfo
                userConf={userObj}
                daAppObj={daAppObj}
                setDaAppObj={daAppObjHandler}
                disabled={
                  !(
                    editMode &&
                    (appStatus ===
                      AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                      appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                      (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                    )
                  )
                }
              />
            }
          />

          <Panel
            Header={<div> Application Detail </div>}
            Content={

              <div>

                <ApplicationInfo
                  daAppObj={daAppObj}
                  setDaAppObj={daAppObjHandler}
                  disabled={
                    !(
                      editMode &&
                      (appStatus ===
                        AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                        appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                        (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                      )
                    )
                  }
                  allowedForMSSU={false}
                />

                <ApplicationDetail
                  daAppObj={daAppObj}
                  setDaAppObj={daAppObjHandler}
                  disabled={
                    !(
                      editMode &&
                      (appStatus ===
                        AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE ||
                        appStatus === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE ||
                        (sysRoleCaseReviewer === "1" && appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
                      )
                    )
                  }
                />

              </div>
            }
          />

        </div>
      </div>
    );

  }

  let renderHtmlContent = null;

  if (editMode) {
    renderHtmlContent = (
      <div>
        {headerContent}
        {pageContent}
        {bottomMenu}
      </div>
    );
  } else {
    renderHtmlContent = (
      <div>
        {headerContent}
        <div className="overlay">{pageContent}</div>
        {bottomMenu}
      </div>
    );
  }

  let caseNotifcationComponent = appDataState.da_app_no !== undefined
    && (
      appStatus === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE
      || appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE
      || appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE)
    ? (
      <div className="hidden">
        <PrintPDF
          content={
            <CaseNotifcationPrintout
              appData={[appDataState]}
              selectedApp={[daAppNo]}
              userID={userState.user_id?userState.user_id:""}
            />
          }
          trigger={
            <button ref={printButtonRef} style={{ display: "none" }}>
              Print
            </button>} />
      </div>
    ) : <div></div>;

  // Render
  //if (isLoadComplete)
  return (
    <div className="maform">
      <div className="mafContainer">
        <div className="border text devOnly">
          {JSON.stringify(daAppObj)}
        </div>
        {topMenu}
        {patientPanelDisplay}
        {renderHtmlContent}
      </div>
      <div style={{ height: "50px" }} />

      <DassCommon ref={DassCommonRef} mdHeight={dialogH} mdWidth={dialogW} />

      <DassCommon ref={DassCommonLogout} confirmCallBack={handleLogout} />

      <DassCommon
        ref={DassCommonReload}
        confirmCallBack={reloadPage}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassNewAppHandler}
        confirmCallBack={newAppActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />
      <DassCommon
        ref={DassSubmitAppHandler}
        confirmCallBack={submitAppActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />
      <DassCommon
        ref={DassStarReviewHandler}
        confirmCallBack={startReviewActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />
      <DassCommon
        ref={DassCompleteReviewHandler}
        confirmCallBack={completeReviewActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />
      <DassCommon
        ref={DassCloseReviewHandler}
        confirmCallBack={closeReviewActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassNewNSubmitHandler}
        confirmCallBack={newNSubmitActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />
      <DassCommon
        ref={DassNewNReviewHandler}
        confirmCallBack={newNReviewActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassSaveNSubmitHandler}
        confirmCallBack={saveNSubmitActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassSaveNCompleteHandler}
        confirmCallBack={saveNCompleteActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassRecallHandler}
        confirmCallBack={recallActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassCancelAppHandler}
        confirmCallBack={cancelAppActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassEditAppDateHandler}
        confirmCallBack={editAppDateActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassReopenCompletedAppHandler}
        confirmCallBack={reopenCompletedAppActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassReopenClosedAppHandler}
        confirmCallBack={reopenClosedAppActionHandler}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassResignESignatureHandler}
        confirmCallBack={generateDAMAFForESignature}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      <DassCommon
        ref={DassPrintDAMAFHandler}
        confirmCallBack={confirmToPrintPhysicalMAF}
        mdHeight={dialogH}
        mdWidth={dialogW}
      />

      {caseNotifcationComponent}

    </div>
  );
  //else return <LoadingPage />;
};

export default connect(null, mapDispatchToProps)(DAApp);