import React from "react";

import ReactToPrint from "react-to-print";

import { ComponentToPrint } from "./ComponentToPrint";

interface PrintPDFProps {
  content: {};
  trigger?: any;
}

export default function PrintPDF(props: PrintPDFProps) {
  const { content, trigger } = props;

  const componentRef = React.useRef(null);
  const [loading] = React.useState(false);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    if (trigger)
      return (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "5px",
            backgroundColor: "",
            textAlign: "right",
          }}
        >
          {trigger}
        </div>
      );
    else
      return (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "5px",
            backgroundColor: "",
            textAlign: "right",
          }}
        >
          <button id="print-button">Print</button>
        </div>
      );
  }, [trigger]);

  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="PrintPDF"
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p className="indicator"> Printing... Please wait.</p>}
      <ComponentToPrint ref={componentRef} content={content} />
    </div>
  );
}
