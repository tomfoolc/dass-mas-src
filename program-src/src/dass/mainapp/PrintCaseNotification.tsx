import React from "react";
import FormControl from "@mui/material/FormControl";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import CaseNotifcationPrintout from "./components/CaseNotifcationPrintout";
import PrintPDF from "@/layouts/components/PrintPDF";
import { Button } from "@/layouts";
import SelectCase from "./components/SelectCase";
import AppConstant from "@/constant/AppConstant";
import { IUserConfig } from "@/interface";
import { useSelector } from "react-redux";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface Props {
  appData: any[];
}

const PrintCaseNotification = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const printButtonRef = React.useRef<HTMLButtonElement>(null);

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const [selectedIds, setSelectedIds] = React.useState(Array<any>);

  const cssStyles = {
    container: {
      display: "flex",
      paddingRight: "5px",
      paddingLeft: "5px",
    },

    image: {
      height: 40,
      width: 40,
    },

    text: {
      fontSize: "14px",
    },
  };

  const handleModalOpen = () => {
    let printIds: any[];

    const addSelectIds = (ids: Array<any>) => {
      setSelectedIds(ids);
      printIds = ids;
    };

    const printHandler = () => {
      if (printIds !== undefined) {
        printButtonRef.current?.click();
      } else {
        DassCommonRef.current?.handleDialogOpen("Please select application.");
      }
    };

    const filtered = props.appData.filter((app: any) => {
      return (
        app.app_status === AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE ||
        app.app_status === AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE ||
        app.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE
      );
    });    

    let modalContent = (
      <div style={{ paddingLeft: "0px" }}>
        <div>
          <div className="header">Print Case Notification</div>
          <div className="alignRight" style={{ paddingRight: "20px" }}>
            <Button
              text="Print"
              onClick={printHandler}
              style={{ width: "120px" }}
            />
          </div>
          <SelectCase appData={filtered} setSelectedAppNo={addSelectIds} />
        </div>
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
    
  };

  const closePrintModule = () => {
    setSelectedIds([]);
  };

  let renderHtml = null;
  let component = (
    <CaseNotifcationPrintout
      appData={props.appData}
      selectedApp={selectedIds}
      userID={userState.user_id?userState.user_id:""}
    />
  );
  let trigger = (
    <button ref={printButtonRef} style={{ display: "none" }}>
      Print
    </button>
  );

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }

  renderHtml = (
    <div className="alignRight">
      <FormControl>
        <div style={cssStyles.container}>
          <img
            style={cssStyles.image}
            src={require("@/assets/images/print_notif.png")}
            alt=""
            onClick={handleModalOpen}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="hidden">
          <PrintPDF content={component} trigger={trigger} />
        </div>
        <DassCommon
          ref={DassCommonRef}
          mdWidth={800}
          mdHeight={500}
          okCallBack={closePrintModule}
        />
      </FormControl>
    </div>
  );

  return renderHtml;
};

export default PrintCaseNotification;
