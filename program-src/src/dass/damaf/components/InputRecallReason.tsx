import React from "react";
import { useSelector } from "react-redux";
import { Label, DropdownList, Button, InputControl } from "@/layouts";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";
import { IUserConfig } from "@/interface";

interface AppProps {
  closeInputDialog: (reaosnCode: string, othReason: string, logMsg: string) => void;
}

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

const InputRecallReason = (props: AppProps) => {
  
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [text, setText] = React.useState<string>("");

  const textChangeHandler = (value: string) => {
    setText(value);
  };

  const [option, setOption] = React.useState<string>("");

  const userConf = useSelector((state: StateProps) => state.das_data.UserData);
  const changeReasonList = userConf.changeReasonList ? userConf.changeReasonList : [];  
  const cancelReasonList: any = changeReasonList.filter((item: any) => { return item.reason_type === "RECALL";});
  let optionList: any = [];
  for (const element of cancelReasonList) {
    optionList.push([element.reason_desc, element.reason_code]);
  }   

  const optionChangeHandler = (value: string) => {
    setOption(value);
  };

  const closeDialog = () => {
    
    let finalMessage = "";

    const reasonItem = optionList.filter((item: any) => {
      if (option === "")
        return item[0];
      else
        return item[1] === option;
    });

    let reasonDesc = reasonItem[0][0];
    let reasoncode = reasonItem[0][1];

    if (reasonDesc !== "" && text !== "") {
      finalMessage = reasonDesc + "; Other reasons : " + text;
    } else if (reasonDesc !== "") {
      finalMessage = reasonDesc;
    } else if (text !== "") {
      finalMessage = text;
    }

    if (option === "") {
      DassCommonRef.current?.handleDialogOpen(
        "Please select reason"
      );
    } else if (option === "RECALL03" && text.trim() === "") { // RECALL03 : Others. Please specify
      DassCommonRef.current?.handleDialogOpen(
        "Please specify other reason"
      );
    } else {
      props.closeInputDialog(reasoncode, text, finalMessage);
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

export default InputRecallReason;
