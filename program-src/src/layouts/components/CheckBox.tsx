import React from "react";

interface CheckBoxProps {
  text: any;
  isChecked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function CheckBox(props: CheckBoxProps) {
  const { text, isChecked = false, disabled, onClick } = props;

  const cssStyles = {
    container: {
      minHeight: "20px",
      display: "flex",
    },

    checkbox: {
      color: "blue",
      width: "30px",
      margin: "0px",
      marginTop: "5px",
    },

    text: {
      color: "black",
      paddingTop: "3px",
      paddingLeft: "2px",
      border: "0px solid darkViolet",
      margin: "0px",
    },

    disabled: {
      backgroundColor: "gray",
    },
  };

  let inputCtrl = null;

  if (disabled) {
    inputCtrl = (
      <input
        type="checkbox"
        className="largerCheckbox disabledcb"
        checked={isChecked}
        onChange={onClick}
        disabled={disabled}
        readOnly
      />
    );
  } else {
    inputCtrl = (
      <input
        type="checkbox"
        className="largerCheckbox"
        checked={isChecked}
        onChange={onClick}
        disabled={disabled}        
      />
    );
  }

  let renderHtml = (
    <div style={{ ...cssStyles.container }}>
      <div style={{ ...cssStyles.checkbox }}>{inputCtrl} </div>
      <div style={{ ...cssStyles.text }}>{text}</div>
    </div>
  );

  return renderHtml;
}

export default CheckBox;
