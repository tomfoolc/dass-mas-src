import React from "react";
import { Label, DatePicker, Button } from "@/layouts";
import CommonFunc from "@/common/CommonFunc";

interface AppProps {
  closeInputDialog: (appDate: string) => void;
  createDate: Date;
  appDate: Date;  
}

const EditApplicationDate = (props: AppProps) => {

  const [appDate, setAppDate] = React.useState(props.appDate);
  const [createDate] = React.useState(props.createDate);

  const appDateChangeHander = (value: Date) => {
    setAppDate(value);
  };  

  const confirmDialog = () => {
    let newAppDate = CommonFunc.Date.formatDate(appDate);
    props.closeInputDialog(newAppDate);
  };

  const cancelDialog = () => {
    props.closeInputDialog("");
  };  

  return (
    <div id="edit_app_date" className="page">
      <div style={{ paddingTop: "10px" }}>

        <div className="row">
          <div className="label" style={{ width: "160px", paddingTop: "1px" }}>
            <Label text="DASS Ref. / App. Date:" />
          </div>
          <div className="label" style={{ width: "110px" }}>
            <div className="row">
              <DatePicker
                value={appDate}
                maxDate={createDate}
                onChange={appDateChangeHander}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="alignRight">
          <Button
            style={{ width: "120px" }}
            text={"Confirm"}
            onClick={confirmDialog}
          />
          <Button
            style={{ width: "120px" }}
            text={"Cancel"}
            onClick={cancelDialog}
          />
        </div>

      </div>
    </div>
  );
};

export default EditApplicationDate;
