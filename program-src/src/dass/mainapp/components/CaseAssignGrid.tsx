import { GridColDef } from "@mui/x-data-grid";
import CommonFunc from "@/common/CommonFunc";

export const CaseAssignGrid: GridColDef[] = [
  {
    field: "hkid",
    width: 100,
    headerClassName: "gridHeader",
    headerName: "Patient HKID",
  },
  {
    field: "eng_name",
    width: 170,
    headerClassName: "gridHeader",
    headerName: "English Name",
  },
  {
    field: "chi_name",
    width: 120,
    headerClassName: "gridHeader",
    headerName: "Chinese Name",
    renderCell: (params) => {
      return (
        <div style={{ fontFamily: "HA_MingLiu" }}>{params.row.chi_name}</div>
      );
    },
  },
  {
    field: "app_status_desc",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "Application Status",
  },
  {
    field: "ax_doctor_name",
    width: 180,
    headerClassName: "gridHeader",
    headerName: "Doctor",
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
];
