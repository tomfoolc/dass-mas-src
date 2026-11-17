import React from "react";
import { Label, Button, InputControl } from "@/layouts";

interface AppProps {
  maxLength: number;
  remarkText: string;
  buttonText: string;
  closeInputDialog: (value: string) => void;
}

const InputFreeText = (props: AppProps) => {
  const [text, setText] = React.useState<string>("");

  const textChangeHandler = (value: string) => {
    setText(value);
  };

  const closeDialog = () => {
    props.closeInputDialog(text);
  };

  return (
    <div id="error" className="page">
      <div style={{ paddingTop: "10px" }}>
        <div>
          <Label text={props.remarkText} />

          <InputControl
            type="textarea"
            value={text}
            maxLength={props.maxLength}
            style={{ height: "80px", width: "605px" }}
            onChange={(event: any) => textChangeHandler(event.target.value)}
          />
        </div>
        <div className="alignCenter">
          <Button
            style={{ width: "200px" }}
            text={props.buttonText}
            onClick={closeDialog}
          />
        </div>
        <br />
      </div>
    </div>
  );
};

export default InputFreeText;
