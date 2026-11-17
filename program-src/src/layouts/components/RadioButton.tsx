import React from "react";

interface RadioButtonProps {
  id: string;
  label: string;
  value: string;
  isSelected?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

export default function RadioButton(props: RadioButtonProps) {
  const { id, label, value, isSelected, onChange, disabled = false } = props;

  const cssStyles = {
    container: {
      paddingRight: "2px",
      paddingLeft: "2px",
    },

    text: {
      paddingTop: "0px",
      paddingLeft: "8px",
      border: "0px solid darkViolet",
      color: "black",
    },

  };

  let renderHtml = null;

  if (disabled) {
    renderHtml = (
      <div style={cssStyles.container}>
        <input
          className="disabledrb"
          id={id}
          onChange={onChange}
          value={value}
          type="radio"
          checked={isSelected}
          disabled={true}
        />
        <label style={cssStyles.text} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  } else {
    renderHtml = (
      <div style={cssStyles.container}>
        <input
          id={id}
          onChange={onChange}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label style={cssStyles.text} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }

  return renderHtml;
}
