import React from "react";

import { Panel, PDFLink } from "@/layouts";

import TopMenu from "./TopMenu";

export default function Document() {
  return (
    <div className="page">
      <div id="mafapp_topmenu">
        <TopMenu />
      </div>

      <div className="header">Document</div>

      <div>
        <Panel
          Content={
            <div className="page">
              <PDFLink
                href={require("@/assets/doc/1_Medical Assessment Form for Disabiliity Allowance_SWD 395 (2019).pdf")}
                name="Medical Assessment Form for Disabiliity Allowance_SWD 395 (2019)"
              />
              <PDFLink
                href={require("@/assets/doc/DASS User Manual.pdf")}
                name="DASS User Manual"
              />              
            </div>
          }
        />
      </div>
    </div>
  );
}
