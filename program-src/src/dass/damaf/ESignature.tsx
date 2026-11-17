import React from "react";
import { connect, useSelector } from "react-redux";

import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@/lib/node_modules/@pdf-lib/fontkit";
import Constant from "@/constant/Constant";
import { getDAMAFPrintoutData, applyESignature } from "@/reducers";
import { IAppData, IESigature } from "@/interface/AppData";
import { IUserConfig } from "@/interface/UserConfig";
import Button from "@/layouts/components/Button";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import AppConstant from "@/constant/AppConstant";


interface StateProps {
  das_data: {
    AppData: IAppData;
    UserData: IUserConfig;
  };
}

interface AppProps {
  closeESign: (eSignResult : string) => void;
}

interface DispatchProps {
  getDAMAFPrintoutData: (da_app_no: string, printout_type: string) => Promise<any>;
  applyESignature: (esign_request: IESigature) => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  getDAMAFPrintoutData,
  applyESignature,
};

const ESignature = (props: Props) => {

  const userState: IUserConfig = useSelector(
    (state: StateProps) => state.das_data.UserData
  );

  const appDataState = useSelector(
    (state: StateProps) => state.das_data.AppData
  );

  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [isInit, setIsInit] = React.useState(true);
  const [url, setUrl] = React.useState("");
  const [printData, setPrintData] = React.useState<any[]>([]);
  const [da_app_no] = React.useState(appDataState.da_app_no);

  const [pageSize] = React.useState(3);
  const [pdfWidth] = React.useState(800);
  const [onePageHeight] = React.useState(1110);
  const [pdfHeight, setPdfHeight] = React.useState(4500);

  React.useEffect(() => {

    const getPrintoutData = async (daAppNo: string) => {
      if (daAppNo !== "") {
        let da_app_no = daAppNo;
        const { getDAMAFPrintoutData } = props;
        const response = await getDAMAFPrintoutData(da_app_no, "ESIGNATURE");

        if (response.ret_cde === Constant.API_SUCCESS) {
          setPrintData(response.result);
          setIsInit(false);
        }
      }
    };

    const signWithESignature = async () => {

      const pdfDoc = await axios
        .get(require("@/assets/doc/damafv1.pdf"), { responseType: "arraybuffer" })
        .then((resp) => {
          return resp.data;
        })
        .then((pdfBytes) => PDFDocument.load(pdfBytes));

      pdfDoc.registerFontkit(fontkit);

      const jpgTickUrl = require("@/assets/images/tick.png");
      const jpgTickImageBytes = await fetch(jpgTickUrl).then((res) =>
        res.arrayBuffer()
      );

      const jpgTickImage = await pdfDoc.embedPng(jpgTickImageBytes);
      const jpgDims = jpgTickImage.scale(0.15);

      const monoSpaceFontBytes = await fetch(require("@/assets/font/monospace.ttf")).then(
        (response) => {
          return response.arrayBuffer();
        }
      );

      let mingLiuFontBytes = monoSpaceFontBytes;
      setPdfHeight(onePageHeight * pageSize);

      const defaultChiFont = await pdfDoc.embedFont(mingLiuFontBytes);
      const defaultEngFont = await pdfDoc.embedFont(monoSpaceFontBytes);
      const pages = pdfDoc.getPages();

      let printPageStart = 1;
      let printPageEnd = 3;

      for (let pageNum = printPageStart; pageNum <= printPageEnd; pageNum++) {

        const page = pages[pageNum];

        if (printData[pageNum].length > 0) {

          for (let j = 0; j < printData[pageNum].length; j++) {
            if (printData[pageNum][j].field_value !== undefined) {
              let font_color: Array<any> =
                printData[pageNum][j].font_color.split(",");

              if (printData[pageNum][j].field_value === "TICK_SYMBOL") {
                page.drawImage(jpgTickImage, {
                  x: printData[pageNum][j].x_coord,
                  y: printData[pageNum][j].y_coord,
                  width: jpgDims.width,
                  height: jpgDims.height,
                });
              } else {

                if (printData[pageNum][j].field_name === 'P1_NEW_APP_PT_CI'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_ADDR_L1'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_ADDR_L2'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_ADDR_L3'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_ADDR'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_PT_REMARK_L1'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_PT_REMARK_L2'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_PT_REMARK_L3'
                || printData[pageNum][j].field_name === 'P1_NEW_APP_PT_REMARK_L4') {
                  page.drawText(printData[pageNum][j].field_value, {
                    x: printData[pageNum][j].x_coord,
                    y: printData[pageNum][j].y_coord,
                    size: printData[pageNum][j].font_size,
                    font: defaultChiFont,
                    color: rgb(
                      font_color[0] / 255,
                      font_color[1] / 255,
                      font_color[2] / 255
                    ),
                  });
                } else {
                  page.drawText(printData[pageNum][j].field_value, {
                    x: printData[pageNum][j].x_coord,
                    y: printData[pageNum][j].y_coord,
                    size: printData[pageNum][j].font_size,
                    font: defaultEngFont,
                    color: rgb(
                      font_color[0] / 255,
                      font_color[1] / 255,
                      font_color[2] / 255
                    ),
                  });
                }

              }
            }
          }
        }

      }

      pdfDoc.removePage(4); //Remove Point to Notes
      pdfDoc.removePage(0); //Remove covering Memo

      const pdfBytes = await pdfDoc.save();

      let b64PDF = Buffer.from(pdfBytes).toString('base64');

      let blob = new Blob([pdfBytes], { type: "application/pdf" });
      let url = URL.createObjectURL(blob);
      if (url !== null) {
        setUrl(url + "#toolbar=0&navpanes=0");
      }

      const { applyESignature } = props;
      let eSignRequest : IESigature = {};

      eSignRequest.hospital_cde = userState.hospital_cde;
      eSignRequest.user_id = userState.user_id;
      eSignRequest.da_app_no = da_app_no;
      eSignRequest.username = userState.user_id;
      eSignRequest.content_in = b64PDF;

      const response = await applyESignature(eSignRequest);

      if (response.ret_cde === Constant.API_SUCCESS) {
        props.closeESign(AppConstant.DASS_STATUS_CODE.SIGNED.CODE);
      } else {
        props.closeESign(AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE);
      }

    };

    if (isInit) {
      getPrintoutData(da_app_no ? da_app_no : "");
    } else {
      DassCommonRef.current?.handleLoadingOpen(
        "eSignature in progress... Please wait"
      );
      signWithESignature();
    }

    // eslint-disable-next-line
  }, [props, isInit, printData, da_app_no]);

  const printForm = () => {
    window.frames[0].print();
  };

  return (
    <div className="App">

      <div className="hidden alignRight">
        <Button
          style={{ width: "120px", display: "" }}
          text={"Print"}
          onClick={printForm}
        />
      </div>

      <div className="hidden" onContextMenu={(e) => e.preventDefault()}>
        <iframe
          id="damaf"
          title="damaf"
          src={url}
          frameBorder=""
          width={pdfWidth}
          height={pdfHeight}
          style={{ "pointerEvents": "none" }}
        />
      </div>

      <div className="hidden alignRight">
        <Button
          style={{ width: "120px", display: "" }}
          text={"Print"}
          onClick={printForm}
        />
        <br />
        <br />
      </div>

      <DassCommon ref={DassCommonRef} />

    </div>
  );
};

export default connect(null, mapDispatchToProps)(ESignature);
