import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface LoadingScreenProps {
  loading: boolean;
  loadingText?: string;
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const { loading, loadingText } = props;

  const cssStyles = {
    image: {
      backgroundColor: "white",
      width: "100%",
      textAlign: "center" as const,
      paddingTop: "20px",
      zIndex: 999,
    },

    text: {
      color: "black",
      width: "100%",
      textAlign: "center" as const,
      paddingRight: "10px",
      border: "0px solid darkViolet",
    },
  };

  let renderHtml = null;

  renderHtml = (
    <div>
      <Dialog open={loading} maxWidth="md" disableScrollLock={true}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={cssStyles.text}>{loadingText}</span>
            <span style={{ margin: "10px" }} />
            <span style={cssStyles.image}>
              <img
                src={require("@/assets/images/loader.gif")}
                alt="Loading"
                height={50}
                width={50}
              />
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );

  return renderHtml;
}
