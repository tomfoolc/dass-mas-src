import React from "react";

import CommonFunc from "@/common/CommonFunc";

interface InputControlProps {
  type?: string; //textarea
  value?: any;
  maxLength?: number;
  validationrule?: string;
  onChange?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  disabled?: boolean;
  style?: {};
}

export default function InputControl(props: InputControlProps) {
  const {
    type = "input",
    value,
    validationrule,
    onChange,
    disabled = false,
    style,
  } = props;

  const cssStyles = {
    input: {
      color: "black",
      height: "25px",
      width: "160px",
      paddingLeft: "5px",
      paddingRight: "10px",
      border: "1px solid gray",
      borderRadius: "5px",
      outline: "none",
    },

    textarea: {
      color: "black",
      height: "60px",
      width: "605px",
      paddingLeft: "5px",
      paddingRight: "10px",
      border: "1px solid gray",
      borderRadius: "5px",
      outline: "none",
      resize: "none",
    },

    error: {
      color: "red",
      "&:active": {
        border: "2px solid red",
      },
    },

    disabled: {
      color: "black",
      backgroundColor: "rgb(217, 221, 227)",
    },

    red: {
      color: "red",
    },
  };

  const [error, setError] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (value !== undefined && value !== "") {
      setMsg("");
      setError(false);

      switch (validationrule) {
        case "alphanumeric":
          if (!CommonFunc.Validate.isAlphanumeric(value)) {
            setMsg("No symbols is allowed");
            setError(true);
          }
          break;

        case "alphabetic":
          if (!CommonFunc.Validate.isAlphabetic(value)) {
            setMsg("Please input alphabetic only");
            setError(true);
          }
          break;

        case "numeric":
          if (!CommonFunc.Validate.isNumber(value)) {
            setMsg("Please input number");
            setError(true);
          }
          break;

        case "integer":
          if (!CommonFunc.Validate.isInteger(value)) {
            setMsg("Please input number");
            setError(true);
          }
          break;

        case "hkid":
          if (!CommonFunc.Validate.isAlphanumeric(value.trim())) {
            setMsg("Invalid HKID format, e.g. A1234567");
            setError(true);
          }
          break;

        default:
          setMsg("");
          setError(false);
      }
    }
  }, [validationrule, value]);

  let inputCtrl = null;
  let ctrlstyle = {};

  if (type === "textarea") {
    ctrlstyle = { ...ctrlstyle, ...cssStyles.textarea };
  } else {
    ctrlstyle = { ...ctrlstyle, ...cssStyles.input };
  }

  if (disabled) {
    ctrlstyle = { ...ctrlstyle, ...cssStyles.disabled };
  }

  if (error) {
    ctrlstyle = { ...ctrlstyle, ...cssStyles.error };
  }

  if (type === "textarea") {
    if (onChange !== undefined) {
      inputCtrl = <textarea {...props} style={{ ...ctrlstyle, ...style }} />;
    } else {
      inputCtrl = (
        <textarea {...props} style={{ ...ctrlstyle, ...style }} readOnly />
      );
    }
  } else {
    if (onChange !== undefined) {
      inputCtrl = <input {...props} style={{ ...ctrlstyle, ...style }} />;
    } else {
      inputCtrl = (
        <input {...props} style={{ ...ctrlstyle, ...style }} readOnly />
      );
    }
  }

  let renderHtml = null;

  renderHtml = (
    <div>
      <div>{inputCtrl}</div>
      <div style={cssStyles.red}>{msg}</div>
    </div>
  );

  return renderHtml;
}
