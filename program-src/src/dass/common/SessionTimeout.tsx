import React, { useState } from "react";
import { IdleTimerProvider as IdleTimer } from "react-idle-timer";

import Constant from "@/constant/Constant";
import SessionTimeoutDialog from "./SessionTimeoutDialog";

interface AppProps {
  isAuthenticated: boolean;
  logOut: () => void;
}

let countdownInterval: any;
let timeout: any;

const SessionTimeout = (props: AppProps) => {
  const { isAuthenticated, logOut } = props;
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(100);
  const toInMinute = 1000 * 60 * Constant.SESSION_TIMEOUT;
  const countDownTime = 0;

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };

  const handleLogout = async () => {
    try {
      setTimeoutModalOpen(false);
      clearSessionInterval();
      clearSessionTimeout();
      logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };

  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  const onIdle = () => {
    if (isAuthenticated && !timeoutModalOpen) {
      let countDown = countDownTime;
      setTimeoutModalOpen(true);
      setTimeoutCountdown(countDown);
      countdownInterval = setInterval(() => {
        if (countDown > 0) {
          setTimeoutCountdown(--countDown);
        } else {
          handleLogout();
        }
      }, 1000);
    }
  };

  return (
    <>
      <IdleTimer
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={toInMinute}
      />
      <SessionTimeoutDialog
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={() => handleLogout()}
        open={timeoutModalOpen}
      />
    </>
  );
};
export default SessionTimeout;
