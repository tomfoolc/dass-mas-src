import React from "react";
import { useSelector } from "react-redux";
import {
  Label,
  DropdownList,
  Button,
  InputControl,
} from "@/layouts";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";
import { IUserConfig } from "@/interface";

interface AppProps {
  closeInputDialog: (reaosnCode: string, mafPart: string, othReason: string, logMsg: string) => void;
}

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

const InputReopenType = (props: AppProps) => {
  
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [reopenType, setReopenType] = React.useState<string>("");

  const userConf = useSelector((state: StateProps) => state.das_data.UserData);
  const changeReasonList = userConf.changeReasonList ? userConf.changeReasonList : [];  
  const cancelReasonList: any = changeReasonList.filter((item: any) => { return item.reason_type === "REOPENCL";});
  let optionList: any = [];
  for (const element of cancelReasonList) {
    optionList.push([element.reason_desc, element.reason_code]);
  }     

  const [reasonText, setReasonText] = React.useState<string>("");
  const [disableTextInput, setDisableTextInput] = React.useState(true);

  const textChangeHandler = (value: string) => {
    setReasonText(value);
  };  
  
  const reopenTypeChangeHandler = (value: string) => {
    if (value.indexOf("REOPENCL01") >= 0 || value.indexOf("REOPENCL03") >= 0) {
      setDisableTextInput(false);
    } else {
      setDisableTextInput(true);
      setReasonText("");
    }
    setReopenType(value);
  };

  const closeDialog = () => {

    const reasonItem = optionList.filter((item: any) => {
      return item[1] === reopenType;
    });

    let reasonDesc = "";
    let reasoncode = "";

    if ( reasonItem != null && reasonItem.length > 0) {
      reasonDesc = reasonItem[0][0];
      reasoncode = reasonItem[0][1];
    }

    if ((reasoncode.indexOf("REOPENCL01") >= 0 || reasoncode.indexOf("REOPENCL03") >= 0) && reasonText === "") {
      DassCommonRef.current?.handleDialogOpen("Please input reason.");
    } else {
      if (reasonText === "") {
        props.closeInputDialog(reasoncode, "", "", reasonDesc);
      } else {
        props.closeInputDialog(reasoncode, "", reasonText, reasonDesc + "; Other reasons : " + reasonText);
      }
    }

  };

  return (
    <div id="error" className="page">
      <div style={{ paddingTop: "10px" }}>

      <div>
          <Label text={"Reopen for :"} />
          <DropdownList
            value={reopenType}
            list={optionList}
            onSelect={reopenTypeChangeHandler}
            width={500}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Label text={"Reason to edit applicant information:"} />
          <InputControl
            type="textarea"
            value={reasonText}
            maxLength={200}
            style={{ height: "55px", width: "500px" }}
            onChange={(event: any) => textChangeHandler(event.target.value)}
            disabled={disableTextInput}
          />
        </div>        

        <br />

        <div className="alignCenter">
          <Button
            style={{ width: "200px" }}
            text={"Reopen Application"}
            onClick={closeDialog}
          />
        </div>
        <br />

        <DassCommon ref={DassCommonRef} />
      </div>
    </div>
  );
};

export default InputReopenType;
