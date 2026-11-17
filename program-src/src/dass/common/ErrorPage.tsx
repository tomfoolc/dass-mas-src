import React from "react";

import Constant from "@/constant/Constant";

import { goToPage } from "@/dass/common/DASSUtils";

import { Button } from "@/layouts";

export default function ErrorPage() {
  const handleClick = () => {
    goToPage(Constant.SYSTEMPAGE);
  };

  return (
    <div id="error" className="page">
      <div className="alignCenter">
        <div>Sorry, this page does not exist.</div>
        <Button text="Back" onClick={handleClick} />
      </div>
    </div>
  );
}
