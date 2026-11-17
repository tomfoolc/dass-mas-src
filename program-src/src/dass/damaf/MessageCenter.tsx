import React from "react";
import { connect, useSelector } from "react-redux";

import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { datagridTheme } from "../common/DatagridTheme";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import Constant from "@/constant/Constant";

import {
  getMessageCenter,
  addMessageCenter,
  markUnreadMessage,
} from "@/reducers";
import { Button, InputControl, Label, Panel } from "@/layouts";
import InputFreeText from "./components/InputFreeText";
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
  getMessageCenter: (msgData: IMessageCenter) => Promise<any>;
  addMessageCenter: (msgData: IMessageCenter) => Promise<any>;
  markUnreadMessage: (msgData: IMessageCenter) => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  getMessageCenter,
  addMessageCenter,
  markUnreadMessage,
};

const MessageCenter = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const userState: IUserConfig = useSelector(
    (state: StateProps) => state.das_data.UserData
  );
  const [user_hosp] = React.useState(
    userState.hospital_cde ? userState.hospital_cde : ""
  );
  const [user_id] = React.useState(userState.user_id ? userState.user_id : "");

  const [selectedIds, setSelectedIds] = React.useState(Array<any>);

  const [data, setData] = React.useState<any[]>();
  const [daAppNo] = React.useState(props.da_app_no);

  const [isUnread, setIsUnread] = React.useState(false);
  const [showUnread, setShowUnread] = React.useState(true);

  const [messageId, setMessageId] = React.useState(-1);
  const [message, setMessage] = React.useState("");
  const [createBy, setCreateBy] = React.useState("");
  const [createDtm, setCreateDtm] = React.useState("");
  const [readBy, setReadBy] = React.useState("");
  const [readDtm, setReadDtm] = React.useState("");

  const SearchMessageCenter = async () => {
    if (daAppNo !== "") {
      DassCommonRef.current?.handleLoadingOpen(
        "Retrieving applications... Please wait"
      );

      const { getMessageCenter } = props;
      let msgData: IMessageCenter = {};
      msgData.hospital_cde = userState.hospital_cde;
      msgData.user_id = userState.user_id;
      msgData.da_app_no = daAppNo;
      const response = await getMessageCenter(msgData);

      if (response.ret_cde === Constant.API_SUCCESS) {
        const filtered = response.result.filter((msg: any) => {
          return !showUnread || (showUnread && msg.read_by === null);
        });
        setData(filtered);

        if (filtered.length > 0) {
          if (!showUnread) {
            setSelectedIds(response.result[0].msg_id);
            setMessageId(response.result[0].msg_id);
            setMessage(response.result[0].message);
            setCreateBy(
              response.result[0].create_by +
                " [" +
                response.result[0].create_by_hosp.trim() +
                "]"
            );
            setCreateDtm(response.result[0].create_dtm);
            if (response.result[0].read_by !== null) {
              setIsUnread(false);
              setReadBy(
                response.result[0].read_by +
                  " [" +
                  response.result[0].read_by_hosp.trim() +
                  "]"
              );
              setReadDtm(response.result[0].read_dtm);
            } else {
              setIsUnread(true);
              setReadBy("");
              setReadDtm("");
            }
          } else {
            if (messageId === -1) {
              for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].read_by === null) {
                  setSelectedIds(filtered[i].msg_id);
                  setMessageId(filtered[i].msg_id);
                  setMessage(filtered[i].message);
                  setCreateBy(
                    filtered[i].create_by +
                      " [" +
                      filtered[i].create_by_hosp.trim() +
                      "]"
                  );
                  setCreateDtm(filtered[i].create_dtm);
                  if (filtered[i].read_by !== null) {
                    setIsUnread(false);
                    setReadBy(
                      filtered[i].read_by +
                        " [" +
                        filtered[i].read_by_hosp.trim() +
                        "]"
                    );
                    setReadDtm(response.result[i].read_dtm);
                  } else {
                    setIsUnread(true);
                    setReadBy("");
                    setReadDtm("");
                  }
                  break;
                }
              }
            } else {
              for (const element of response.result) {
                if (messageId === element.msg_id && element.read_by === null) {
                  setSelectedIds(element.msg_id);
                  setMessageId(element.msg_id);
                  setMessage(element.message);
                  setCreateBy(
                    element.create_by +
                      " [" +
                      element.create_by_hosp.trim() +
                      "]"
                  );
                  setCreateDtm(element.create_dtm);
                  if (element.read_by !== null) {
                    setIsUnread(false);
                    setReadBy(
                      element.read_by + " [" + element.read_by_hosp.trim() + "]"
                    );
                    setReadDtm(element.read_dtm);
                  } else {
                    setIsUnread(true);
                    setReadBy("");
                    setReadDtm("");
                  }
                  break;
                }
              }
            }
          }
        } else {
          setMessage("");
          setCreateBy("");
          setCreateDtm("");
          setReadBy("");
          setReadDtm("");
        }
      }
      DassCommonRef.current?.handleLoadingClose();
    }
  };

  React.useEffect(() => {
    SearchMessageCenter();
    // eslint-disable-next-line
  }, [props, showUnread]);

  const colDefs: GridColDef[] = [
    {
      field: "create_dtm",
      width: 160,
      headerClassName: "gridHeader",
      headerName: "Date",
    },
    {
      field: "message",
      width: 570,
      headerClassName: "gridHeader",
      headerName: "Message",
    },
  ];

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    setMessageId(params.row.msg_id);
    setMessage(params.row.message);
    setCreateBy(
      params.row.create_by + " [" + params.row.create_by_hosp.trim() + "]"
    );
    setCreateDtm(params.row.create_dtm);
    if (params.row.read_by !== null) {
      setIsUnread(false);
      setReadBy(
        params.row.read_by + " [" + params.row.read_by_hosp.trim() + "]"
      );
      setReadDtm(params.row.read_dtm);
    } else {
      setIsUnread(true);
      setReadBy("");
      setReadDtm("");
    }
  };

  const markAllMessageRead = async () => {
    if (data != null) {
      for (let i = 0; i <= data.length - 1; i++) {
        const { markUnreadMessage } = props;
        let msgData: IMessageCenter = {};
        msgData.hospital_cde = userState.hospital_cde;
        msgData.user_id = userState.user_id;
        msgData.msg_id = data[i].msg_id;
        msgData.read_by_hosp = userState.hospital_cde;
        msgData.read_by = userState.user_id;
        const response = await markUnreadMessage(msgData);

        if (response.ret_cde !== Constant.API_SUCCESS) {
          DassCommonRef.current?.handleDialogOpen("Fail to mark message read.");
          break;
        }

        if (i === data.length - 1) {
          SearchMessageCenter();
          DassCommonRef.current?.handleModalClose();
        }
      }
    }
  };

  const markMessageRead = async () => {
    if (user_hosp !== "" && user_id !== "") {
      const { markUnreadMessage } = props;
      let msgData: IMessageCenter = {};
      msgData.hospital_cde = userState.hospital_cde;
      msgData.user_id = userState.user_id;
      msgData.msg_id = messageId;
      msgData.read_by_hosp = userState.hospital_cde;
      msgData.read_by = userState.user_id;
      const response = await markUnreadMessage(msgData);

      if (response.ret_cde === Constant.API_SUCCESS) {
        SearchMessageCenter();
        DassCommonRef.current?.handleModalClose();
      } else {
        DassCommonRef.current?.handleDialogOpen("Fail to mark message read.");
      }
    }
  };

  const closeInputDialog = async (value: string) => {
    if (value !== undefined && value.trim() !== "") {
      const { addMessageCenter } = props;
      let msgData: IMessageCenter = {};
      msgData.hospital_cde = userState.hospital_cde;
      msgData.user_id = userState.user_id;
      msgData.da_app_no = daAppNo;
      msgData.message = value.trim();
      const response = await addMessageCenter(msgData);

      if (response.ret_cde === Constant.API_SUCCESS) {
        SearchMessageCenter();
        DassCommonRef.current?.handleModalClose();
      } else {
        DassCommonRef.current?.handleDialogOpen("Fail to add message.");
      }
    } else {
      DassCommonRef.current?.handleDialogOpen("Please input message.");
    }
  };

  const addMessageHandler = () => {
    let modalContent = (
      <div>
        <div>
          <InputFreeText
            maxLength={250}
            remarkText={"Please input message:"}
            buttonText={"Add Message"}
            closeInputDialog={closeInputDialog}
          />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const showAllHandler = () => {
    setShowUnread(!showUnread);
    SearchMessageCenter();
  };

  return (
    <div className="page">
      <div className="header">Message Center</div>

      <Panel
        Content={
          <>
            <div className="row">
              <div className="mafLeftmenu">
                <div
                  className="label"
                  style={{ height: "30px", width: "120px" }}
                >
                  <Label text="DASS Ref.:" />
                </div>
                <div
                  className="label"
                  style={{ height: "30px", width: "5px" }}
                ></div>
                <div
                  className="label"
                  style={{ height: "30px", width: "100px" }}
                >
                  <Label text={daAppNo} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mafLeftmenu">
                <div style={{ height: "30px" }}>
                  <Button
                    text="New message"
                    onClick={addMessageHandler}
                    style={{ width: "120px" }}
                  />
                </div>
                <div style={{ height: "30px" }}>
                  <Button
                    text="Mark as read"
                    onClick={markMessageRead}
                    style={{ width: "120px" }}
                    disabled={!isUnread || data?.length === 0}
                  />
                </div>
                <div style={{ height: "30px" }}>
                  <Button
                    text="Mark all as read"
                    onClick={markAllMessageRead}
                    style={{ width: "145px" }}
                    disabled={!showUnread || data?.length === 0}
                  />
                </div>
              </div>
              <div className="mafRightmenu row">
                <div style={{ height: "30px" }}>
                  <Button
                    text={showUnread ? "Show All" : "Show Unread"}
                    onClick={showAllHandler}
                    style={{ width: "120px" }}
                  />
                </div>
              </div>
            </div>
            <ThemeProvider theme={datagridTheme}>
              <div style={{ height: 220 }}>
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "create_dtm", sort: "desc" }],
                    },
                  }}
                  getRowId={(row) => row.msg_id}
                  onSelectionModelChange={(ids) => {
                    setSelectedIds(ids);
                  }}
                  selectionModel={selectedIds}
                  onRowClick={handleEvent}
                  columns={colDefs}
                  rows={data ? data : []}
                  rowHeight={32}
                  autoPageSize
                  checkboxSelection={false}
                  localeText={{ footerRowSelected: (count) => "" }}
                />
              </div>
            </ThemeProvider>
          </>
        }
      />

      <div className="mafThemeColor" style={{ width: "100%", height: "0px" }}>
        {" "}
      </div>

      <div style={{ border: "0px solid silver", padding: "4px" }}>
        <Panel
          Header={<div>Detail</div>}
          Content={
            <>
              <div className="row" style={{ paddingTop: "5px" }}>
                <div className="label" style={{ width: "80px" }}>
                  <Label text="Message :" />
                </div>
                <div className="label" style={{ width: "5px" }}></div>
                <div>
                  <InputControl
                    type="textarea"
                    value={message}
                    style={{ height: "70px", width: "650px" }}
                  />
                </div>
              </div>
              <div className="row" style={{ paddingTop: "5px" }}>
                <div className="label" style={{ width: "150px" }}>
                  <Label text="Created By [Hospital]:" />
                </div>
                <div className="label" style={{ width: "5px" }}></div>
                <div className="label" style={{ width: "600px" }}>
                  {createBy ? (
                    <Label text={createBy + " [" + createDtm + "]"} />
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="label" style={{ width: "150px" }}>
                  <Label text="Read By [Hospital]:" />
                </div>
                <div className="label" style={{ width: "5px" }}></div>
                <div className="label" style={{ width: "600px" }}>
                  {readBy ? (
                    <Label text={readBy + " [" + readDtm + "]"} />
                  ) : null}
                </div>
              </div>
            </>
          }
        />
      </div>

      <DassCommon ref={DassCommonRef} mdWidth={600} mdHeight={160} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MessageCenter);
