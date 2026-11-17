import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import clsx from "clsx";
import red from "@mui/material/colors/red";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: 0,
  },

  button: {
    borderRadius: 0,
    textTransform: "none",
    padding: 5,
  },

  logout: {
    color: "#fff",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },

  countdown: {
    color: red[700],
  },

  image: {
    marginTop: 3,
    height: 35,
    width: 40,
  },

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
    fontWeight: "bold",
    fontSize: "16px",
  },

  alert_dialog_msg: {
    color: "black",
    padding: "8px",
    minWidth: "250px",
  },

  alert_dialog_button: {
    fontWeight: "bold",
    fontSize: "16px",
  },
}));

interface SessionTimeoutDialogProps {
  open: boolean;
  countdown: number;
  onLogout: () => void;
  onContinue?: () => void;
}

export default function SessionTimeoutDialog(props: SessionTimeoutDialogProps) {
  const { open, countdown, onLogout, onContinue } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      disableScrollLock={true}
    >
      <DialogTitle id="alert-dialog-title" className={classes.alert_dialog}>
        <div className={classes.alert_dialog_title}>DASS - Session Timeout</div>
      </DialogTitle>

      <DialogContent className={classes.alert_dialog_content}>
        <div className="row">
          <div className={classes.alert_dialog_msg}>
            The current session is about to expire in{" "}
            <span className={classes.countdown}>{countdown}</span> seconds.
            <br />
            {`Would you like to continue the session?`}
            <br />
            <br />
          </div>
        </div>
      </DialogContent>

      <DialogActions className={classes.alert_dialog_action}>
        <Button
          onClick={onLogout}
          variant="contained"
          className={clsx(classes.logout, classes.button)}
        >
          Logout
        </Button>
        <Button
          onClick={onContinue}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Continue Session
        </Button>
      </DialogActions>
    </Dialog>
  );
}
