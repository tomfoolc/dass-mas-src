import React from "react";
import { connect, useSelector } from "react-redux";

import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@/lib/node_modules/@pdf-lib/fontkit";
import Constant from "@/constant/Constant";
import { getDAMAFPrintoutData, getESignedDAMAF } from "@/reducers";
import { IAppData } from "@/interface/AppData";
import Button from "@/layouts/components/Button";
import CommonFunc from "@/common/CommonFunc";

interface StateProps {
  das_data: {
    AppData: IAppData;
  };
}

interface AppProps {
  daType: string;
}

interface DispatchProps {
  getDAMAFPrintoutData: (da_app_no: string, printout_type: string) => Promise<any>;
  getESignedDAMAF: (da_app_no: string) => Promise<any>;
}

type Props = AppProps & DispatchProps;


const mapDispatchToProps = {
  getDAMAFPrintoutData,
  getESignedDAMAF,
};

const PrintMAFwES = (props: Props) => {

  const { daType = "R" } = props;

  const appDataState = useSelector(
    (state: StateProps) => state.das_data.AppData
  );

  const [isInit, setIsInit] = React.useState(true);
  const [url, setUrl] = React.useState("");
  const [printData, setPrintData] = React.useState<any[]>([]);
  const [da_app_no] = React.useState(appDataState.da_app_no);

  const [pdfWidth] = React.useState(800);
  const [onePageHeight] = React.useState(1110);
  const [pdfHeight, setPdfHeight] = React.useState(5700);
  const [signedDaMAF, setSignedDaMAF] = React.useState("");

  React.useEffect(() => {

    const getPrintoutData = async (daAppNo: string) => {
      if (daAppNo !== "") {
        let da_app_no = daAppNo;
        const { getDAMAFPrintoutData } = props;
        const response = await getDAMAFPrintoutData(da_app_no, "DA_MAF");

        if (response.ret_cde === Constant.API_SUCCESS) {
          setPrintData(response.result);
          getSigedDoctorPart(daAppNo);
        }
      }
    };

    const getSigedDoctorPart = async (daAppNo: string) => {
      if (daAppNo !== "") {
        let da_app_no = daAppNo;
        const { getESignedDAMAF } = props;
        const response = await getESignedDAMAF(da_app_no);

        if (response.ret_cde === Constant.API_SUCCESS) {
          setSignedDaMAF(response.result.content_out);
          setIsInit(false);
        }
      }
    };

    const print = async () => {

      //const monoSpaceFontBytes = await fetch("/font/monospace.ttf").then(
      const monoSpaceFontBytes = await fetch(require("@/assets/font/monospace.ttf")).then(  
        (response) => {
          return response.arrayBuffer();
        }
      );

      const pdfDocPage5 = await axios
        .get(require("@/assets/doc/damafpage5.pdf"), { responseType: "arraybuffer" })
        .then((resp) => {
          return resp.data;
        })
        .then((pdfBytes) => PDFDocument.load(pdfBytes));

      if (daType === "N") {

        let footerDaRef = "";
        let footerPrintTime = "";

        setPdfHeight(onePageHeight * 5);

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

        const mingLiuFontBytes = await fetch(require("@/assets/font/hamingliu.ttf")).then(
          (response) => {
            return response.arrayBuffer();
          }
        );

        const defaultChiFont = await pdfDoc.embedFont(mingLiuFontBytes);
        const defaultEngFont = await pdfDoc.embedFont(monoSpaceFontBytes);
        const pages = pdfDoc.getPages();

        let printPageCount = 1;

        for (let pageNum = 0; pageNum < printPageCount; pageNum++) {

          const page = pages[pageNum];
          const bDrawLine = false;
          let font_color: Array<any> = "255,0,255".split(",");

          if (printData[pageNum].length > 0) {
            if (bDrawLine) {
              let { height, width } = page.getSize();

              for (let i = 10; i < width - 20;) {
                page.drawLine({
                  start: { x: i, y: 10 },
                  end: { x: i, y: height - 10 },
                  thickness: 1,
                  color: rgb(
                    font_color[0] / 255,
                    font_color[1] / 255,
                    font_color[2] / 255
                  ),
                  opacity: 1,
                });

                page.drawText(i.toString(), {
                  x: i,
                  y: height - 10,
                  size: 10,
                  color: rgb(
                    font_color[0] / 255,
                    font_color[1] / 255,
                    font_color[2] / 255
                  ),
                });

                i = i + 20;
              }

              for (let j = 10; j < height - 20;) {
                page.drawLine({
                  start: { x: 10, y: j },
                  end: { x: width - 10, y: j },
                  thickness: 1,
                  color: rgb(
                    font_color[0] / 255,
                    font_color[1] / 255,
                    font_color[2] / 255
                  ),
                  opacity: 1,
                });

                page.drawText(j.toString(), {
                  x: 10,
                  y: j,
                  size: 10,
                  color: rgb(
                    font_color[0] / 255,
                    font_color[1] / 255,
                    font_color[2] / 255
                  ),
                });

                j = j + 20;
              }
            }
          }

          if (printData[pageNum].length > 0) {

            for (let j = 0; j < printData[pageNum].length; j++) {

              if (printData[pageNum][j].field_value !== undefined) {
                let font_color: Array<any> =
                  printData[pageNum][j].font_color.split(",");

                if (printData[pageNum][j].field_name === "P1_FOOTER_DA_REF") {
                  footerDaRef = printData[pageNum][j].field_value;
                }

                if (printData[pageNum][j].field_name === "P1_FOOTER_PRINT_TIME") {
                  footerPrintTime = printData[pageNum][j].field_value;
                }

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

        for (let k = 1; k < pages.length; k++) {
          pdfDoc.removePage(1);
        }

        const pdfBytes = await pdfDoc.save();
        const pdfDocPage5Bytes = await pdfDocPage5.save();

        const mergedPdf = await PDFDocument.create();

        const pdfCoveringMemo: PDFDocument = await PDFDocument.load(pdfBytes);
        const pdfCoveringMemoPages = await mergedPdf.copyPages(pdfCoveringMemo, pdfCoveringMemo.getPageIndices());
        pdfCoveringMemoPages.forEach((page) => mergedPdf.addPage(page));

        const pdfUint8Array = Uint8Array.from(window.atob(signedDaMAF), (c) => c.charCodeAt(0));
        const pdfDoctorPart: PDFDocument = await PDFDocument.load(pdfUint8Array);

        const doctorPages = pdfDoctorPart.getPages();
        for (let pageNum = 0; pageNum < 3; pageNum++) {
          const page = doctorPages[pageNum];
          page.drawText(footerDaRef, {
            x: 450,
            y: 25,
            size: 7,
            font: defaultEngFont,
            color: rgb(0, 0, 1),
          });

          page.drawText(footerPrintTime, {
            x: 450,
            y: 15,
            size: 7,
            font: defaultEngFont,
            color: rgb(0, 0, 1),
          });
        }

        const pdfDoctorPartPages = await mergedPdf.copyPages(pdfDoctorPart, pdfDoctorPart.getPageIndices());
        pdfDoctorPartPages.forEach((page) => mergedPdf.addPage(page));

        const pdfPage5: PDFDocument = await PDFDocument.load(pdfDocPage5Bytes);
        const pdfPTN = await mergedPdf.copyPages(pdfPage5, pdfPage5.getPageIndices());
        pdfPTN.forEach((page) => mergedPdf.addPage(page));

        const mergePdfBytes = await mergedPdf.save();
        let blob = new Blob([mergePdfBytes], { type: "application/pdf" });

        let url = URL.createObjectURL(blob);
        if (url !== null) {
          setUrl(url + "#toolbar=0&navpanes=0");
        }

      } else {

        setPdfHeight(onePageHeight * 4);

        const pdfDocPage5Bytes = await pdfDocPage5.save();
        const mergedPdf = await PDFDocument.create();

        const pdfUint8Array = Uint8Array.from(window.atob(signedDaMAF), (c) => c.charCodeAt(0));
        const pdfDoctorPart: PDFDocument = await PDFDocument.load(pdfUint8Array);

        pdfDoctorPart.registerFontkit(fontkit);
        const defaultEngFont = await pdfDoctorPart.embedFont(monoSpaceFontBytes);

        const doctorPages = pdfDoctorPart.getPages();
        const printTime = CommonFunc.Date.formatDisplayDateTime2(new Date());

        for (let pageNum = 0; pageNum < 3; pageNum++) {
          const page = doctorPages[pageNum];
          page.drawText("DASS Ref.: " + da_app_no, {
            x: 450,
            y: 25,
            size: 7,
            font: defaultEngFont,
            color: rgb(0, 0, 1),
          });

          page.drawText("Print on : " + printTime, {
            x: 450,
            y: 15,
            size: 7,
            font: defaultEngFont,
            color: rgb(0, 0, 1),
          });
        }

        const pdfDoctorPartPages = await mergedPdf.copyPages(pdfDoctorPart, pdfDoctorPart.getPageIndices());
        pdfDoctorPartPages.forEach((page) => mergedPdf.addPage(page));

        const pdfPage5: PDFDocument = await PDFDocument.load(pdfDocPage5Bytes);
        const pdfPTN = await mergedPdf.copyPages(pdfPage5, pdfPage5.getPageIndices());
        pdfPTN.forEach((page) => mergedPdf.addPage(page));

        const mergePdfBytes = await mergedPdf.save();
        let blob = new Blob([mergePdfBytes], { type: "application/pdf" });

        let url = URL.createObjectURL(blob);
        if (url !== null) {
          setUrl(url + "#toolbar=0&navpanes=0");
        }

      }

    };

    if (isInit) {
      getPrintoutData(da_app_no ? da_app_no : "");
    } else {
      print();
    }

    // eslint-disable-next-line
  }, [props, isInit, da_app_no]);

  const printForm = () => {
    window.frames[0].print();
  };

  return (
    <div className="App">

      <div className="alignRight">
        <Button
          style={{ width: "120px", display: "" }}
          text={"Print"}
          onClick={printForm}
        />
      </div>

      <div onContextMenu={(e) => e.preventDefault()}>
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

      <div className="alignRight">
        <Button
          style={{ width: "120px", display: "" }}
          text={"Print"}
          onClick={printForm}
        />
        <br />
        <br />
      </div>

    </div>
  );
};

export default connect(null, mapDispatchToProps)(PrintMAFwES);
