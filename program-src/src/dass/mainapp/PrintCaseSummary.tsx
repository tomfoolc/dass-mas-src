import React from "react";
import FormControl from "@mui/material/FormControl";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import CaseSummaryPrintout from "./components/CaseSummaryPrintout";
import PrintPDF from "@/layouts/components/PrintPDF";
import { Button } from "@/layouts";

interface Props {
  appData: any[];
}

const PrintCaseSummary = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const printButtonRef = React.useRef<HTMLButtonElement>(null);

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

  const printHandler = () => {
    printButtonRef.current?.click();
  };

  const handleModalOpen = () => {
    let component2 = <CaseSummaryPrintout appData={props.appData} />;

    let trigger = (
      <button ref={printButtonRef} style={{ display: "none" }}>
        Print
      </button>
    );

    let modalContent = (
      <div style={{ paddingLeft: "0px" }}>
        <div className="header">Print Case Summary</div>
        <div className="alignRight">
          <Button
            text="Print"
            onClick={printHandler}
            style={{ width: "120px" }}
          />
        </div>
        <PrintPDF content={component2} trigger={trigger} />
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  }  

  let renderHtml = null;

  renderHtml = (
    <div className="alignRight">
      <FormControl>
        <div style={cssStyles.container}>
          <img
            style={cssStyles.image}
            src={require("@/assets/images/summary.png")}
            alt=""
            onClick={handleModalOpen}
            onKeyDown={handleKeyDown}
          />
        </div>
        <DassCommon ref={DassCommonRef} mdWidth={800} mdHeight={500} />
      </FormControl>
    </div>
  );

  return renderHtml;
};

export default PrintCaseSummary;
