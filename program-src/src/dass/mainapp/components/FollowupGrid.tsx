import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import clsx from "clsx";
import CommonFunc from "@/common/CommonFunc";
import AppConstant from "@/constant/AppConstant";
import { ToolTips } from "@/layouts";

export const FollowupGridColDef: GridColDef[] = [
  {
    field: "hkid",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "Patient HKID",
    cellClassName: (params: GridCellParams<number>) =>
      clsx("statusInProgress", {
        statusNC:
          params.row.app_status ===
          AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.CODE,
        statusNF:
          params.row.app_status === AppConstant.DASS_STATUS_CODE.SAVED_MAF.CODE,
        statusPE:
          params.row.app_status ===
          AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.CODE,
        statusRE:
          params.row.app_status ===
          AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.CODE,
        statusCO:
          params.row.app_status ===
          AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE,
        statusCL:
          params.row.app_status === AppConstant.DASS_STATUS_CODE.CLOSED.CODE,
        statusCA:
          params.row.app_status === AppConstant.DASS_STATUS_CODE.CANCELLED.CODE,
        statusVO:
          params.row.app_status === AppConstant.DASS_STATUS_CODE.VOIDED.CODE,                    
      }),
    renderCell: (params) => {
      if (params.row.processing_days > AppConstant.APP_OVERDUE_DAYS) {
        return (
          <div className="row">
            <div>{params.row.hkid}</div>
            <div>
              <img
                src={require("@/assets/images/outstanding.png")}
                alt="outstanding"
                style={{
                  height: "15px",
                  width: "15px",
                  marginTop: "-5px",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div>{params.row.hkid}</div>
          </div>
        );
      }
    },
  },
  {
    field: "eng_name",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "English Name",
  },
  {
    field: "chi_name",
    width: 110,
    headerClassName: "gridHeader",
    headerName: "Chinese Name",
    renderCell: (params) => {
      return (
        <div style={{ fontFamily: "HA_MingLiu" }}>{params.row.chi_name}</div>
      );
    },
  },
  {
    field: "app_sign_status_desc",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "Application Status",
    renderCell: (params) => {
      if ((params.row.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE || params.row.app_status === AppConstant.DASS_STATUS_CODE.CLOSED.CODE) && params.row.esign_status === AppConstant.DASS_STATUS_CODE.UNSIGNED.CODE) {
        return (
          <div className="row">
            <div>{params.row.app_status_desc}</div>
            <div>
              <ToolTips
                text="Unsigned"
                content={
                  <div>
                    <img
                      src={require("@/assets/images/unsigned.png")}
                      alt=""
                      style={{
                        height: "20px",
                        width: "30px",
                        marginTop: "-5px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                }
              />
            </div>
          </div>
        );
      } else if ((params.row.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE || params.row.app_status === AppConstant.DASS_STATUS_CODE.CLOSED.CODE) && params.row.esign_status === AppConstant.DASS_STATUS_CODE.PHYSICALLY_SIGNED.CODE) {
        return (
          <div className="row">
            <div>{params.row.app_status_desc}</div>
            <div>
              <ToolTips
                text="Physically signed"
                content={
                  <div>
                    <img
                      src={require("@/assets/images/physical_signed.png")}
                      alt=""
                      style={{
                        height: "20px",
                        width: "30px",
                        marginTop: "-5px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                }
              />
            </div>
          </div>
        );
      } else if ((params.row.app_status === AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.CODE || params.row.app_status === AppConstant.DASS_STATUS_CODE.CLOSED.CODE) && params.row.esign_status === AppConstant.DASS_STATUS_CODE.SIGNED.CODE) {
        return (
          <div className="row">
            <div>{params.row.app_status_desc}</div>
            <div>
              <ToolTips
                text="Signed"
                content={
                  <div>
                    <img
                      src={require("@/assets/images/signed.png")}
                      alt=""
                      style={{
                        height: "20px",
                        width: "30px",
                        marginTop: "-5px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                }
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div>{params.row.app_status_desc}</div>
          </div>
        );
      }
    },
  },
  {
    field: "ax_specialty_ward",
    width: 120,
    headerClassName: "gridHeader",
    headerName: "Specialty/Ward",
  },
  {
    field: "ax_doctor_name",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "Doctor",
  },
  {
    field: "create_by_name",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "Created By",
  },
  {
    field: "da_ref_no",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "SSFU Ref.",
  },
  {
    field: "mssu_ref_no",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "MSSU Ref.",
  },
  {
    field: "da_app_no",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "DASS Ref.",
  },
  {
    field: "app_date",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "Application Date",
    renderCell: (params) => {
      return (
        <div>{CommonFunc.Date.formatDisplayDate(params.row.app_date)}</div>
      );
    },
  },
  {
    field: "submit_dtm",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "Clinical Sub. Date",
    renderCell: (params) => {
      return (
        <div>{CommonFunc.Date.formatDisplayDate(params.row.submit_dtm)}</div>
      );
    },
  },
  {
    field: "review_dtm",
    width: 130,
    headerClassName: "gridHeader",
    headerName: "Medical Ax. Date",
    renderCell: (params) => {
      return (
        <div>{CommonFunc.Date.formatDisplayDate(params.row.review_dtm)}</div>
      );
    },
  },
  {
    field: "complete_dtm",
    width: 120,
    headerClassName: "gridHeader",
    headerName: "Completion Date",
    renderCell: (params) => {
      return (
        <div>{CommonFunc.Date.formatDisplayDate(params.row.complete_dtm)}</div>
      );
    },
  }
];
