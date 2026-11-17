import React from "react";

import { destroySession } from "@/dass/common/DASSUtils";

import { Button } from "@/layouts";

export default function SessionExpired() {
  const handleClick = () => {
    destroySession();
  };

  return (
    <div id="error" className="page">
      <div className="alignCenter">
        <div>
          Connection Error/Session Expired.
          <br />
          Please login again or contact DASS IT Support.
        </div>
        <Button
          text="Logon Again"
          style={{ width: "150px" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
