import React from "react";
import { useSelector } from "react-redux";
import {
  Label,
  DropdownList,
  Button,
  CheckBox,
  InputControl,
} from "@/layouts";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";
import { IUserConfig } from "@/interface";

interface AppProps {
  closeInputDialog: (reaosnCode: string, mafPart: string, othReason: string, logMsg: string) => void;
  reopenType ?: string;
  reopenForEditPIReason ?: string;
}

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

const InputReopenReason = (props: AppProps) => {
  
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [enableSelection, setEnableSelection] = React.useState(false);
  const [abtPart2, setAbtPart2] = React.useState(false);
  const [abtPart3, setAbtPart3] = React.useState(false);
  const [abtPart4, setAbtPart4] = React.useState(false);
  const [abtPart5, setAbtPart5] = React.useState(false);
  const [abtPart6, setAbtPart6] = React.useState(false);
  const [abtPart7, setAbtPart7] = React.useState(false);

  const { reopenForEditPIReason = ""} = props;
  const { reopenType = ""} = props;  
  const [text, setText] = React.useState<string>("");

  const textChangeHandler = (value: string) => {
    setText(value);
  };

  const clickAbtPart2 = () => {
    setAbtPart2(!abtPart2);
  };
  const clickAbtPart3 = () => {
    setAbtPart3(!abtPart3);
  };
  const clickAbtPart4 = () => {
    setAbtPart4(!abtPart4);
  };
  const clickAbtPart5 = () => {
    setAbtPart5(!abtPart5);
  };
  const clickAbtPart6 = () => {
    setAbtPart6(!abtPart6);
  };
  const clickAbtPart7 = () => {
    setAbtPart7(!abtPart7);
  };

  const [option, setOption] = React.useState<string>("");

  const userConf = useSelector((state: StateProps) => state.das_data.UserData);
  const changeReasonList = userConf.changeReasonList ? userConf.changeReasonList : [];  
  const cancelReasonList: any = changeReasonList.filter((item: any) => { return item.reason_type === "REOPENCO";});
  let optionList: any = [];
  for (const element of cancelReasonList) {
    optionList.push([element.reason_desc, element.reason_code]);
  }   

  const optionChangeHandler = (value: string) => {
    setOption(value);
    if ( value !== "REOPENCO03" ) {
      setEnableSelection(true);
    } else {
      setEnableSelection(false);
    }
  };

  const closeDialog = () => {
    
    let finalMessage = "";

    const reasonItem = optionList.filter((item: any) => {
      return item[1] === option;
    });

    let reasonDesc = "";
    let reasoncode = "REOPENCO03";

    if ( reasonItem != null && reasonItem.length > 0) {
      reasonDesc = reasonItem[0][0];
      reasoncode = reasonItem[0][1];
    }     
    let message = "";

    if (option !== "" && option !== "REOPENCO03") {

      if (abtPart2) message = message + " part (II)";
      if (abtPart3) message = message + " , part (III)";
      if (abtPart4) message = message + " , part (IV)";
      if (abtPart5) message = message + " , part (V)";
      if (abtPart6) message = message + " , part (VI)";
      if (abtPart7) message = message + " , part (VII)";

      if (message === "") {
        DassCommonRef.current?.handleDialogOpen("Please select MAF parts.");
        return;
      }

      if (!abtPart2) message = message.substring(2, message.length);

      let n = message.lastIndexOf(",");
      message =
        message.substring(0, n - 1) +
        message.substring(n, message.length).replace(",", " and");

      finalMessage = reasonDesc + message + ".";
    }

    if (text !== "") {
      if (finalMessage === "") {
        finalMessage = text;
      } else {
        finalMessage = finalMessage + "; Other reasons : " + text;
      }
    }

    if (finalMessage === "") {
      DassCommonRef.current?.handleDialogOpen(
        "Please select reason or input message"
      );
    } else {
      if (reopenForEditPIReason === "") {
        props.closeInputDialog(reasoncode, message.trim(), text, finalMessage);
      } else {
        //For Closed App.
        if ( reopenType === "")
          props.closeInputDialog(reasoncode, message.trim(), text, reopenForEditPIReason + "; " + finalMessage);
        else
          props.closeInputDialog(reopenType, message.trim(), text, reopenForEditPIReason + "; " + finalMessage);
      }
    }

  };

  return (
    <div id="error" className="page">
      <div style={{ paddingTop: "10px" }}>
        <div>
          <Label text={"Please select reason :"} />
          <DropdownList
            value={option}
            list={optionList}
            onSelect={optionChangeHandler}
            width={500}
          />
        </div>

        <br />

        <div style={{ marginLeft: "20px" }}>
          <CheckBox
            text={<Label symbol="(II)" text="Nature / Degree of disablility" />}
            isChecked={abtPart2}
            onClick={clickAbtPart2}
            disabled={!enableSelection}
          />

          <CheckBox
            text={
              <Label
                symbol="(III)"
                text="Whether the patient requires constant attendance"
              />
            }
            isChecked={abtPart3}
            onClick={clickAbtPart3}
            disabled={!enableSelection}
          />

          <CheckBox
            text={
              <Label symbol="(IV)" text="Duration of disabling condition" />
            }
            isChecked={abtPart4}
            onClick={clickAbtPart4}
            disabled={!enableSelection}
          />

          <CheckBox
            text={
              <Label
                symbol="(V)"
                text="Assessment for fitness for making a statement in relation to the application of SSA Scheme"
              />
            }
            isChecked={abtPart5}
            onClick={clickAbtPart5}
            disabled={!enableSelection}
          />

          <CheckBox
            text={<Label symbol="(VI)" text="Recommendation" />}
            isChecked={abtPart6}
            onClick={clickAbtPart6}
            disabled={!enableSelection}
          />

          <CheckBox
            text={
              <Label
                symbol="(VII)"
                text="Change of assessment result compared to the last assessment and any other comments"
              />
            }
            isChecked={abtPart7}
            onClick={clickAbtPart7}
            disabled={!enableSelection}
          />
        </div>

        <br />

        <div>
          <Label text={"Other reasons:"} />
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
            style={{ width: "200px" }}
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

export default InputReopenReason;
