import React from "react";

import { AlertDialog, ModalDialog, LoadingScreen } from "@/layouts";

export type DassCommonRefProps = {
  handleLoadingOpen: (msg?: string) => void;
  handleLoadingClose: () => void;
  handleDialogOpen: (msg: string, opt?: string) => void;
  handleModalOpen: (content: any) => void;
  handleModalClose: () => void;
};

interface AppProps {
  mdHeight?: number;
  mdWidth?: number;
  okCallBack?: () => void;
  confirmCallBack?: () => void;
  cancelCallBack?: () => void;
}

export const DassCommon = React.forwardRef((props: AppProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    handleLoadingOpen,
    handleLoadingClose,
    handleDialogOpen,
    handleModalOpen,
    handleModalClose,
  }));

  const { mdHeight, mdWidth, okCallBack, confirmCallBack, cancelCallBack } =
    props;

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("");

  const [optType, setOptType] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<any>(null);

  const handleLoadingOpen = (msg?: string) => {
    setLoadingText(msg ? msg : "Loading... Please wait.");
    setIsLoading(true);
  };

  const handleLoadingClose = () => {
    setIsLoading(false);
  };

  const handleDialogOpen = (msg: string, opt?: string) => {
    setOptType(opt ? opt : "");
    setDialogContent(msg);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (okCallBack) okCallBack();
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (confirmCallBack) confirmCallBack();
    handleDialogClose();
  };

  const handleDialogCancel = () => {
    if (cancelCallBack) cancelCallBack();
    handleDialogClose();
  };

  const handleModalOpen = (content: any) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    if (okCallBack) okCallBack();
    setModalOpen(false);
  };

  return (
    <div>
      <div className="devOnly">CommonModule</div>
      <AlertDialog
        optType={optType}
        msgContent={dialogContent}
        dialogOpen={dialogOpen}
        handleDialogConfirm={handleDialogConfirm}
        handleDialogCancel={handleDialogCancel}
        handleDialogOK={handleDialogClose}
      />
      <ModalDialog
        modalContent={modalContent}
        height={mdHeight}
        width={mdWidth}
        dialogOpen={modalOpen}
        handleDialogClose={handleModalClose}
      />
      <LoadingScreen loading={isLoading} loadingText={loadingText} />
    </div>
  );
});
