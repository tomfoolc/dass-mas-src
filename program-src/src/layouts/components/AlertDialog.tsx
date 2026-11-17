import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import Button from "./Button";

const useStyles = makeStyles(() => ({
  alert_dialog: {
    border: "2px solid rgb(48,63,159)",
    padding: "4px !important",
    backgroundColor: "rgb(48,63,159)",
    color: "white",
    fontWeight: "bold",
    minWidth: "80px!important",
    minHeight: "25px!important",
  },

  alert_dialog_content: {
    border: "2px solid rgb(48,63,159)",
    borderTop: "0px",
    borderBottom: "0px",
    backgroundColor: "rgb(240,240,240)",
    margin: "0px",
    padding: "0px",
  },

  alert_dialog_action: {
    border: "2px solid rgb(48,63,159)",
    borderTop: "0px",
    backgroundColor: "rgb(240,240,240)",
    margin: "0px",
    padding: "5px",
    textAlign: "right",
  },

  alert_dialog_title: {
    fontFamily: "Verdana, Tahoma, sans-serif",
    fontWeight: "bold",
    fontSize: "16px",
  },

  alert_dialog_msg: {
    fontFamily: "Verdana, Tahoma, sans-serif",
    color: "black",
    padding: "8px",
    minWidth: "250px",
  },

  alert_dialog_button: {
    fontWeight: "bold",
    fontSize: "16px",
  },

  image: {
    marginTop: 3,
    height: 35,
    width: 40,
  },
}));

interface AlertDialogProps {
  dialogOpen: boolean;
  optType?: string;
  msgTitle?: string;
  msgContent: string;
  handleDialogConfirm?: () => void;
  handleDialogCancel?: () => void;
  handleDialogOK?: () => void;
}

export default function AlertDialog(props: AlertDialogProps) {
  const {
    dialogOpen,
    optType = "",
    msgTitle,
    msgContent,
    handleDialogConfirm,
    handleDialogCancel,
    handleDialogOK,
  } = props;

  const classes = useStyles();

  let title = msgTitle
    ? msgTitle
    : "DASS - Disability Allowance Supporting System";
  let ButtonPanel = null;

  if (optType === "YN") {
    ButtonPanel = (
      <div className={classes.alert_dialog_button}>
        <Button text="YES" onClick={handleDialogConfirm} />
        &nbsp;
        <Button text="NO" onClick={handleDialogCancel} focus="true" />
      </div>
    );
  } else if (optType === "OK") {
    ButtonPanel = (
      <div className={classes.alert_dialog_button}>
        <Button text="OK" onClick={handleDialogConfirm} focus="true" />
      </div>
    );
  } else {
    ButtonPanel = (
      <div className={classes.alert_dialog_button}>
        <Button text="OK" onClick={handleDialogOK} focus="true" />
      </div>
    );
  }

  let renderHtml = null;

  renderHtml = (
    <div>
      <Dialog
        open={dialogOpen}
        maxWidth="md"
        disableRestoreFocus
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title" className={classes.alert_dialog}>
          <div className={classes.alert_dialog_title}>{title}</div>
        </DialogTitle>

        <DialogContent className={classes.alert_dialog_content}>
          <div className="row">
            <img
              className={classes.image}
              src={require("@/assets/images/information.png")}
              alt=""
            />
            <div className={classes.alert_dialog_msg}>{msgContent}</div>
          </div>
        </DialogContent>

        <DialogActions className={classes.alert_dialog_action}>
          {ButtonPanel}
        </DialogActions>
      </Dialog>
    </div>
  );

  return renderHtml;
}
