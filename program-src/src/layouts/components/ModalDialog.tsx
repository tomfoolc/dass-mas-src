import * as React from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Button from "./Button";

const useStyles = makeStyles(() => ({
  modal_dialog: {
    border: "2px solid rgb(48,63,159)",
    padding: "4px !important",
    backgroundColor: "rgb(48,63,159)",
    color: "white",
    fontWeight: "bold",
    minWidth: "80px!important",
    minHeight: "25px!important",
  },

  modal_dialog_content: {
    border: "2px solid rgb(48,63,159)",
    borderTop: "0px",
    borderBottom: "0px",
    backgroundColor: "rgb(240,240,240)",
    margin: "0px",
    padding: "0px",
  },

  modal_dialog_title: {
    fontWeight: "bold",
    fontSize: "16px",
    width: "80%",
    textAlign: "left",
  },

  modal_dialog_button: {
    fontWeight: "bold",
    fontSize: "16px",
    width: "20%",
    textAlign: "right",
  },
}));

interface ModalDialogProps {
  dialogOpen: boolean;
  msgTitle?: string;
  modalContent: any;
  height?: number;
  width?: number;
  handleDialogClose: () => void;
}

export default function ModalDialog(props: ModalDialogProps) {
  const {
    dialogOpen,
    msgTitle,
    modalContent,
    height,
    width,
    handleDialogClose,
  } = props;

  const classes = useStyles();

  const cssStyles = {
    size: {
      backgroundColor: "",
      width: width ? width : 900,
      height: height ? height : 900,
    },
  };

  let title = msgTitle
    ? msgTitle
    : "DASS - Disability Allowance Supporting System";
  let renderHtml = null;

  renderHtml = (
    <div>
      <Dialog open={dialogOpen} maxWidth="md" disableScrollLock={true}>
        <DialogTitle className={classes.modal_dialog}>
          <div className="row">
            <div className={classes.modal_dialog_title}>{title}</div>
            <div className={classes.modal_dialog_button}>
              <Button
                text="X"
                onClick={handleDialogClose}
                style={{ height: "20px", width: "20px" }}
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.modal_dialog_content}>
          <div style={cssStyles.size}>{modalContent} </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return renderHtml;
}
