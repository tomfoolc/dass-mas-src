import React from "react";
import { connect, useSelector } from "react-redux";

import TopMenu from "../mainapp/TopMenu";
import { Button, CheckBox, CheckBoxList, DatePicker, DropdownList, Label } from "@/layouts";
import { IUserConfig, IOptionItem, IOptionRptItem } from "@/interface";
import AppConstant from "@/constant/AppConstant";

import { getApplicationUtilsReport } from "@/reducers";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import CommonFunc from "@/common/CommonFunc";
import Constant from "@/constant/Constant";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface DispatchProps {
  getApplicationUtilsReport: (type: string, userHospitalCde: string, clusterCde: string, hospitalCde: string, fromDate: string, toDate: string, userSpecialtyWard: string, userUnitType: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getApplicationUtilsReport,
};

const Report = (props: Props) => {

  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const today = new Date();
  const fromDateRange = new Date(AppConstant.DASS_SYSTEM_LAUNCH_DATE);
  const toDateRange = new Date(today);
  let monthStart = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  if (monthStart < fromDateRange)
    monthStart = fromDateRange;
  let monthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  const optALL = [{ id: "ALL", displayText: "ALL", value: "ALL", cluster: "ALL", hospital: "ALL" }];
  const [url, setUrl] = React.useState("");

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hoRole = userState.role?.ho === "1" ? true : false;
  const clusterCoorRole = userState.role?.clustercoord === "1" ? true : false;
  const userHospitalCde = userState.hospital_cde ? userState.hospital_cde : "ALL";
  const cluserCde = userState.reportConfig.cluster_cde;
  const hospitalCde = userState.hospital_cde === "HAO" ? "ALL" : userState.hospital_cde;
  const optClusterList = AppConstant.APP_CLUSTER_CODE;
  const optHospitalList = userState.reportConfig.hospitalOptList;
  const optHospital = [{ id: hospitalCde, displayText: hospitalCde, value: hospitalCde, cluster: cluserCde }];
  const userTypeState = userState.unit_type || "ALL";
  const showALLSpecilaty = hoRole || clusterCoorRole || userTypeState === "MSSU" || userTypeState === "HO" ? true : false;
  const userSpecialtyWardState = showALLSpecilaty ? "ALL" : userState.specialty_ward_list || userState.specialty || userState.ward || "";

  const defaultState = {
    fromDate: monthStart,
    toDate: monthEnd,
    cluster: cluserCde as string,
    cblHospital: optHospital as Array<IOptionItem>,
    toExcel: false,
  };

  const [state, setState] = React.useState({ ...defaultState });

  const cssStyles = {
    common: {
      paddingTop: "4px",
      paddingLeft: "4px",
    },
    ctrl_width: {
      width: "180px",
    },
    cbo_width: 300
  }

  // Handler - Begin
  const fromDateOnChange = (value: Date) => {
    setState({ ...state, fromDate: value });
  };

  const toDateOnChange = (value: Date) => {
    setState({ ...state, toDate: value });
  };

  const getHospitalSelectedValue = () => {
    let value = "";
    state.cblHospital.forEach((item) => value = value + item.value);
    return value;
  }

  const clusterOnChange = (value: string) => {
    setState({ ...state, cluster: value, cblHospital: optALL });
  };

  const cblHospitalOnChange = (opts: IOptionItem[]) => {
    const optALLOnly = opts.filter((item: IOptionItem) => {
      return item.value === "ALL";
    });
    const optWoALL = opts.filter((item: IOptionItem) => {
      return item.value !== "ALL";
    });
    if (opts.length > 0 && opts[opts.length - 1].id === "ALL") {
      setState({ ...state, cblHospital: optALLOnly });
    } else {
      setState({ ...state, cblHospital: optWoALL });
    }
  };

  const cbToExcelOnChange = () => {
    setState({ ...state, toExcel: !state.toExcel });
  };

  const previewHandler = async () => {
    const start = new Date(state.fromDate);
    const end = new Date(state.toDate);
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;

    if (totalMonths >= 12) {
      DassCommonRef.current?.handleDialogOpen("The date range should not be greater than 12 months.");
    } else {
      if (state.toExcel) {
        printExcelHandler();
      } else {
        printPDFHandler();
      }
    }
  }

  const printPDFHandler = async () => {
    const { getApplicationUtilsReport: getApplicationSummaryReport } = props;
    let cluster = state.cluster;
    let hospital = state.cblHospital.map((x: any) => x.value).join(', ')
    if (cluster !== "ALL" && hospital === "ALL") {
      hospital = optHospitalList.filter((item: IOptionRptItem) => {
        return item.cluster != null && state.cluster.indexOf(item.cluster) >= 0;
      }).map((x: any) => x.value).join(', ');
    }
    let fromDate = CommonFunc.Date.formatDate(state.fromDate);
    let toDate = CommonFunc.Date.formatDate(state.toDate);
    let userSpecialtyWard = userSpecialtyWardState;
    let userUnitType = userTypeState;

    const response = await getApplicationSummaryReport("pdf", userHospitalCde, cluster, hospital, fromDate, toDate, userSpecialtyWard, userUnitType);
    if (response != null && response.ret_cde === Constant.API_SUCCESS) {
      const pdfUint8Array = Uint8Array.from(window.atob(response.result), (c) => c.charCodeAt(0));
      let blob = new Blob([pdfUint8Array], { type: "application/pdf" });
      let url = URL.createObjectURL(blob);
      if (url !== null) {
        setUrl(url);
      }
    } else {
      setUrl("");
      DassCommonRef.current?.handleDialogOpen("No record found.");
    }
  }

  const downloadPDF = () => {
    if (url !== null && url !== "") {
      let today = CommonFunc.Date.newFormatDate(new Date(), "yyyyMMdd");
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DASS Utilisation Report ' + today + '.pdf';
      document.body.appendChild(link);
      link.click();
    }
  }

  const printExcelHandler = async () => {
    const { getApplicationUtilsReport: getApplicationSummaryReport } = props;
    let cluster = state.cluster;
    let hospital = state.cblHospital.map((x: any) => x.value).join(', ')
    if (cluster !== "ALL" && hospital === "ALL") {
      hospital = optHospitalList.filter((item: IOptionRptItem) => {
        return item.cluster != null && state.cluster.indexOf(item.cluster) >= 0;
      }).map((x: any) => x.value).join(', ');
    }
    let fromDate = CommonFunc.Date.formatDate(state.fromDate);
    let toDate = CommonFunc.Date.formatDate(state.toDate);
    let userSpecialtyWard = userSpecialtyWardState;
    let userUnitType = userTypeState;

    const response = await getApplicationSummaryReport("excel", userHospitalCde, cluster, hospital, fromDate, toDate, userSpecialtyWard, userUnitType);
    if (response != null && response.ret_cde === Constant.API_SUCCESS) {
      const pdfUint8Array = Uint8Array.from(window.atob(response.result), (c) => c.charCodeAt(0));
      let blob = new Blob([pdfUint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let url = URL.createObjectURL(blob);
      let today = CommonFunc.Date.newFormatDate(new Date(), "yyyyMMdd");
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DASS Utilisation Report ' + today + '.xlsx';
      link.click();
    } else {
      setUrl("");
      DassCommonRef.current?.handleDialogOpen("No record found.");
    }
  }

  const resetReportHandler = () => {
    window.location.reload();
  };

  // Handler - End

  return (
    <div className="page">

      <div id="mafapp_topmenu">
        <TopMenu />
      </div>

      <div className="header">Utilisation Report</div>

      <div>

        <div className="row">
          <Label text="Cluster" style={{ ...cssStyles.common, ...cssStyles.ctrl_width }} />
          <DropdownList
            value={state.cluster}
            list={optClusterList}
            onSelect={clusterOnChange}
            width={cssStyles.cbo_width}
            disabled={!hoRole}
          />
        </div>

        <div className="row">
          <Label text="Hospital" style={{ ...cssStyles.common, ...cssStyles.ctrl_width }} />
          <CheckBoxList
            value={state.cblHospital}
            optList={optHospitalList.filter((item: IOptionRptItem) => {
              return item.value === "ALL"
                || (state.cluster === "ALL" || (item.cluster != null && state.cluster.indexOf(item.cluster) >= 0))
            })
            }
            onChange={cblHospitalOnChange}
            width={cssStyles.cbo_width}
            disabled={state.cluster === "ALL" || state.cluster === "" || (!hoRole && !clusterCoorRole)}
          />
        </div>

        <div className="row">
          <Label text="Creation Date" style={{ ...cssStyles.common, ...cssStyles.ctrl_width }} />
          <Label text="From" style={{ ...cssStyles.common }} />
          <DatePicker value={state.fromDate} onChange={fromDateOnChange} minDate={fromDateRange} maxDate={toDateRange} />
          <Label text="to" style={{ ...cssStyles.common }} />
          <DatePicker value={state.toDate} onChange={toDateOnChange} minDate={state.fromDate} maxDate={toDateRange} />
        </div>

        <div className="row">
          <Label text="" style={{ ...cssStyles.common, ...cssStyles.ctrl_width }} />
          <CheckBox
            text={<Label text="To Excel" />}
            isChecked={state.toExcel}
            onClick={cbToExcelOnChange}
          />
        </div>

        <div className="emptyRow" />

        <div className="border text hidden" style={{ height: "100px" }}>
          <div>{JSON.stringify(state)}</div>
          <div>{JSON.stringify(getHospitalSelectedValue())}</div>
        </div>

        <div className="row alignRight">
          {url !== null && url !== "" &&
            <Button
              text="Download PDF"
              onClick={downloadPDF}
              style={{ width: "130px" }}
            />
          }
          <Button
            text="Preview"
            onClick={previewHandler}
            style={{ width: "100px" }}
          />
          <Button
            text="Reset"
            onClick={resetReportHandler}
            style={{ width: "100px" }}
          />
        </div>

        <iframe
          title="viewPdf"
          src={url}
          frameBorder="0"
          width="950px"
          height="540px"
        />
      </div>

      <DassCommon ref={DassCommonRef} />

    </div>
  );

}

export default connect(null, mapDispatchToProps)(Report);