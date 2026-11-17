import { GridColDef } from "@mui/x-data-grid";

export const PatientGridColDef: GridColDef[] = [
  {
    field: "hkid",
    width: 120,
    headerClassName: "gridHeader",
    headerName: "Patient HKID",
  },
  {
    field: "eng_name",
    width: 220,
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
    field: "tel_no",
    width: 100,
    headerClassName: "gridHeader",
    headerName: "Tel. No",
  },
  {
    field: "sex",
    width: 100,
    headerClassName: "gridHeader",
    headerName: "Sex",
  },
  {
    field: "age",
    width: 100,
    headerClassName: "gridHeader",
    headerName: "Age",
  },
];
