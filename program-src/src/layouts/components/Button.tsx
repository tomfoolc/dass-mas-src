import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: {};
  focus?: string;
}

function CustomButton(props: ButtonProps) {
  const { text, disabled = false, style, focus } = props;

  const cssStyles = {
    button: {
      color: "white",
      backgroundColor: "rgb(63,81,181)",
      padding: 0,
      margin: 2,
      width: 100,
      height: 26,
      "&:hover": {
        backgroundColor: "rgb(63,81,181)",
        color: "white",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "rgb(63,81,181)",
        color: "white",
      },
    },

    disabled: {
      backgroundColor: "gray",
    },
  };

  let renderHtml = null;

  if (disabled) {
    renderHtml = (
      <Button
        {...props}
        style={{ ...cssStyles.button, ...style, ...cssStyles.disabled }}
      >
        {text}
      </Button>
    );
  } else {
    if (focus === "true") {
      renderHtml = (
        <Button {...props} style={{ ...cssStyles.button, ...style }} autoFocus>
          {text}
        </Button>
      );
    } else {
      renderHtml = (
        <Button {...props} style={{ ...cssStyles.button, ...style }}>
          {text}
        </Button>
      );
    }
  }

  return renderHtml;
}

export default CustomButton;
