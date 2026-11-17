import React from "react";
import { connect, useSelector } from "react-redux";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";

import Constant from "@/constant/Constant";

import { goToPage } from "@/dass/common/DASSUtils";

import { IAppData, IUserConfig } from "@/interface";

import { updateApplicationStore } from "@/reducers";

import { Button, Panel, InputControl, ToolTips } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { datagridTheme } from "../common/DatagridTheme";
import { FollowupGridColDef } from "./components/FollowupGrid";
import "../css/ApplicationGrid.css";

import AssignDoctor from "./AssignDoctor";
import ReassignDoctor from "./ReassignDoctor";
import CloseApp from "./CloseApp";
import AppConstant from "@/constant/AppConstant";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface AppProps {
  appStatus: string;
  appData: any[];
  height?: number;
  reload: () => void;
  reset: () => void;
}

interface DispatchProps {
  updateApplicationStore: (patientData: IAppData) => void;
}
type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  updateApplicationStore,
};

const FollowupList = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const [selectedIds, setSelectedIds] = React.useState(Array<any>);

  const [daAppNo, setDaAppNo] = React.useState("");
  const [data, setData] = React.useState(props.appData);
  const [filterData, setFilterData] = React.useState(props.appData);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);

  const sysRoleCaseDistributor = userState.role?.distributor;
  const sysRoleCaseReviewer = userState.role?.reviewer;
  const [lastTap, setLastTap] = React.useState<number | null>(null);

  React.useEffect(() => {
    setData(props.appData);
    setFilterData(props.appData);
    setDaAppNo("");
  }, [props.appData]);

  const clearSelection = () => {
    setSelectedIds([]);
    setDaAppNo("");
  };

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    setDaAppNo(params.row.da_app_no);
    const now = Date.now();
    const doubleTapThreshold = 300; 
    if (lastTap && (now - lastTap) < doubleTapThreshold) {
      viewAppHandler();
      setLastTap(null);
    } else {
      setLastTap(now);
    }
  };

  const handleDCEvent: GridEventListener<"rowClick"> = (params) => {
    setDaAppNo(params.row.da_app_no);
    viewAppHandler();
  };

  const assignDoctor = async () => {
    const filtered = data.filter((app: any) => {
      return (
        app.app_status ===
          AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE &&
        (app.da_app_no === daAppNo || daAppNo === "")
      );
    });

    let modalContent = (
      <div>
        <div>
          <AssignDoctor appData={filtered} closeWindow={closeDialog} />
        </div>
        <div className="alignRight">
          <Button text={"Close"} onClick={closeDialog} />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const reassignDoctor = async () => {
    const filtered = data.filter((app: any) => {
      return (
        (app.da_app_no === daAppNo || daAppNo === "") && (
          app.app_status === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE ||
          ( app.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE && app.esign_status === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE)
        )
      );
    });

    let modalContent = (
      <div>
        <div>
          <ReassignDoctor appData={filtered} closeWindow={closeDialog} />
        </div>
        <div className="alignRight">
          <Button text={"Close"} onClick={closeDialog} />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const completeApplication = async () => {
    const filtered = data.filter((app: any) => {
      return (
        app.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE &&
        ( app.esign_status === AppConstant.DASS_STATUS_CODE.SIGNED.CODE || app.esign_status === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE ) &&
        (app.da_app_no === daAppNo || daAppNo === "")
      );
    });
    let modalContent = (
      <div>
        <div>
          <CloseApp appData={filtered} closeWindow={closeDialog} />
        </div>
        <div className="alignRight">
          <Button text={"Close"} onClick={closeDialog} />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const closeDialog = () => {
    DassCommonRef.current?.handleModalClose();
    props.reload();
  };

  const viewAppHandler = async () => {
    if (daAppNo !== "") {
      DassCommonRef.current?.handleLoadingOpen(
        "Loading application... Please wait"
      );
      setTimeout(() => {
        DassCommonRef.current?.handleLoadingClose();
        goToPage(Constant.DAAPP + "?&da_app_no=" + daAppNo.trim());
      }, Constant.DELAY);
    } else {
      DassCommonRef.current?.handleDialogOpen("Please select an application.");
    }
  };

  const [searchKey, setSearchKey] = React.useState("");
  const [showSearchPanel, setShowSearchPanel] = React.useState(false);

  const serachAppClickHandler = (event: any) => {
    SearchApp();
  };

  const serachAppChangeHandler = (event: any) => {
    setSearchKey(event.target.value);
  };

  const serachAppKeyDownHandler = (event: any) => {
    if (event.charCode === 13) {
      SearchApp();
    }
  };

  const SearchApp = () => {
    if (searchKey === "") {
      setFilterData(data);
    } else {
      const filtered = data.filter((app: any) => {
        return (
          app.da_app_no.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1 ||
          app.hkid.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1 ||
          app.esign_status.toUpperCase().indexOf(searchKey.toUpperCase()) === 0 ||
          ( app.eng_name !== null && app.eng_name.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1) ||
          ( app.mssu_ref_no !== null && app.mssu_ref_no.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1) ||
          ( app.da_ref_no !== null && app.da_ref_no.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1) ||
          ( app.ax_doctor !== null && app.ax_doctor.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1) ||
          ( app.ax_doctor_name !== null && app.ax_doctor_name.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1) ||
          app.create_by_name.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1 ||
          app.create_by.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1
        );
      });
      setFilterData(filtered);
    }
  };

  const showSearchPanelHandler = () => {
    setShowSearchPanel(!showSearchPanel);
  };

  const reloadHandler = () => {
    clearSelection();
    props.reload();
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }
  
  return (
    <div className="page">
      <Panel
        Content={
          <>
            <div className="row alignCenter" style={{ marginTop: "0px" }}>
              <div className="alignLeft" style={{ width: "50%" }}>
                {sysRoleCaseDistributor === "1" &&
                (props.appStatus === "ALL" ||
                  props.appStatus ===
                    AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW
                      .CODE) ? (
                  <Button
                    text={"Assign Doctor"}
                    onClick={assignDoctor}
                    style={{ width: "170px" }}
                    disabled={
                      !(
                        props.appStatus === "ALL" ||
                        props.appStatus === "OVERDUE" ||
                        props.appStatus === "REMINDER" ||
                        props.appStatus ===
                          AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW
                            .CODE ||
                        props.appStatus ===
                          AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE
                      )
                    }
                  />
                ) : null}

                {sysRoleCaseDistributor === "1" && (
                    props.appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE 
                    || props.appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE 
                  )? (
                  <Button
                    text={"Reassign Doctor"}
                    onClick={reassignDoctor}
                    style={{ width: "170px" }}
                    disabled={
                      !(
                        props.appStatus === "ALL" ||
                        props.appStatus === "OVERDUE" ||
                        props.appStatus === "REMINDER" ||
                        props.appStatus === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE ||
                        props.appStatus === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE
                      )
                    }
                  />
                ) : null}

                {sysRoleCaseReviewer === "1" &&
                props.appStatus ===
                  AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE ? (
                  <Button
                    text="Close Application"
                    onClick={completeApplication}
                    style={{ width: "170px" }}
                    disabled={
                      !(
                        props.appStatus === "ALL" ||
                        props.appStatus === "OVERDUE" ||
                        props.appStatus === "REMINDER" ||
                        props.appStatus ===
                          AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE
                      )
                    }
                  />
                ) : null}
              </div>

              <div className="alignRight" style={{ width: "50%" }}>
                <Button
                  text="View Applicaiton"
                  onClick={viewAppHandler}
                  style={{ width: "170px", display: "none" }}
                />
                <Button
                  text="Search"
                  onClick={showSearchPanelHandler}
                  style={{ width: "100px" }}
                />
                <div className="hidden">
                  <Button
                    text="Reload"
                    onClick={reloadHandler}
                    style={{ width: "100px" }}
                  />
                  <Button
                    text="Clear"
                    onClick={clearSelection}
                    style={{ width: "100px" }}
                  />
                </div>
                <ToolTips
                  text="Reload"
                  content={
                    <img
                      style={{ height: 20, width: 20, marginTop: 5 }}
                      src={require("@/assets/images/reload.png")}
                      alt=""
                      onClick={reloadHandler}
                      onKeyDown={handleKeyDown}
                    />
                  }
                />
              </div>
            </div>

            {showSearchPanel && (
              <div className="row alignCenter" style={{ marginTop: "5px" }}>
                <div className="alignLeft" style={{ width: "64%" }}></div>
                <div className="alignRight border" style={{ width: "36%" }}>
                  <div className="row">
                    <InputControl
                      style={{ width: "320px" }}
                      value={searchKey}
                      onChange={serachAppChangeHandler}
                      onKeyPress={serachAppKeyDownHandler}
                    />
                    <ToolTips
                      text="Search"
                      content={
                        <img
                          style={{
                            cursor: "pointer",
                            width: "28px",
                            height: "25px",
                          }}
                          src={require("@/assets/images/search.png")}
                          alt="Search"
                          onClick={serachAppClickHandler}
                          onKeyDown={handleKeyDown}
                        />
                      }
                    />
                  </div>
                  <div className="alignLeft" style={{ fontSize: 10 }}>
                    # Search for : HKID, English Name, Doctor, Created By, Ref.
                  </div>
                </div>
              </div>
            )}

            <ThemeProvider theme={datagridTheme}>
              <div style={{ height: props.height }}>
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "da_app_no", sort: "desc" }],
                    },
                  }}
                  getRowId={(row) => row.da_app_no}
                  onSelectionModelChange={(ids) => {
                    setSelectedIds(ids);
                  }}
                  selectionModel={selectedIds}
                  onRowClick={handleEvent}
                  onRowDoubleClick={handleDCEvent}
                  columns={FollowupGridColDef}
                  rows={filterData}
                  rowHeight={32}
                  //getRowHeight={() => 'auto'}
                  //autoPageSize
                  rowsPerPageOptions={[100]}
                  pageSize={100}
                  checkboxSelection={false}
                  getRowClassName={(params) =>
                    `app_status_${params.row.app_status}`
                  }
                />
              </div>
            </ThemeProvider>
          </>
        }
      />

      <DassCommon ref={DassCommonRef} mdWidth={840} mdHeight={520} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(FollowupList);
