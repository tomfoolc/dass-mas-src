import React from "react";
import { Label, Button, InputControl } from "@/layouts";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";

interface AppProps {
  closeInputDialog: (value: string) => void;
}

const InputReassignReason = (props: AppProps) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [text, setText] = React.useState<string>("");

  const textChangeHandler = (value: string) => {
    setText(value);
  };

  const closeDialog = () => {
    if (text === "") {
      DassCommonRef.current?.handleDialogOpen("Please input reason.");
    } else {
      props.closeInputDialog(text);
    }
  };

  return (
    <div id="error" className="page">
      <div style={{ paddingTop: "10px" }}>

        <div>
          <Label text={"Reason:"} />
          <InputControl
            type="textarea"
            value={text}
            maxLength={200}
            style={{ height: "80px", width: "605px" }}
            onChange={(event: any) => textChangeHandler(event.target.value)}
          />
        </div>

        <br />

        <div className="alignCenter">
          <Button
            style={{ width: "150px" }}
            text={"OK"}
            onClick={closeDialog}
          />
        </div>
        <br />

        <DassCommon ref={DassCommonRef} />
      </div>
    </div>
  );
};

export default InputReassignReason;
