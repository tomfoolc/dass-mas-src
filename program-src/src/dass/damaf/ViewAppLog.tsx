import React from "react";
import { connect } from "react-redux";

import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { datagridTheme } from "../common/DatagridTheme";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import Constant from "@/constant/Constant";

import { getApplicationLog } from "@/reducers";
import { Label, Panel } from "@/layouts";

interface AppProps {
  da_app_no: string;
}

interface DispatchProps {
  getApplicationLog: (da_app_no: string) => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapDispatchToProps = {
  getApplicationLog,
};

const ViewAppLog = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [data, setData] = React.useState<any[]>();
  const [logDtm, setLogDtm] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [logDetail, setLogDetail] = React.useState("");
  const [actionBy, setActionBy] = React.useState("");

  React.useEffect(() => {
    const SearchAppLog = async () => {
      if (props.da_app_no !== "") {
        DassCommonRef.current?.handleLoadingOpen(
          "Retrieving applications... Please wait"
        );

        let daAppNo = props.da_app_no;

        const { getApplicationLog } = props;
        const response = await getApplicationLog(daAppNo);

        if (response.ret_cde === Constant.API_SUCCESS) {
          setData(response.result);
          setLogDtm(response.result[0].log_dtm);
          setTitle(response.result[0].shortdesc);
          setLogDetail(response.result[0].detail);
          setActionBy(
            response.result[0].user_id +
              " (" +
              response.result[0].hospital_cde +
              ")"
          );
        }
        DassCommonRef.current?.handleLoadingClose();
      }
    };

    SearchAppLog();
  }, [props]);

  const colDefs: GridColDef[] = [
    {
      field: "log_dtm",
      width: 145,
      headerClassName: "gridHeader",
      headerName: "Log Date Time",
    },
    {
      field: "shortdesc",
      width: 500,
      headerClassName: "gridHeader",
      headerName: "Short Desc",
    },
    {
      field: "user_id",
      width: 110,
      headerClassName: "gridHeader",
      headerName: "Action By",
    },
    {
      field: "log_id",
      width: 80,
      headerClassName: "gridHeader",
      headerName: "Log Id",
    }    
  ];

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    setLogDtm(params.row.log_dtm);
    setTitle(params.row.shortdesc);
    setLogDetail(params.row.detail);
    setActionBy(params.row.user_id + " (" + params.row.hospital_cde + ")");
  };

  return (
    <div className="page">
      <div className="header">Application Activity Log</div>

      <Panel
        Content={
          <>
            <div className="row">
              <div className="label" style={{ width: "120px" }}>
                <Label text="DASS Ref.:" />
              </div>
              <div className="label" style={{ width: "5px" }}></div>
              <div className="label" style={{ width: "100px" }}>
                <Label text={props.da_app_no} />
              </div>
            </div>
            <ThemeProvider theme={datagridTheme}>
              <div style={{ height: 300 }}>
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "log_id", sort: "desc" }],
                    },
                  }}
                  getRowId={(row) => row.log_id}
                  onRowClick={handleEvent}
                  columns={colDefs}
                  rows={data ? data : []}
                  rowHeight={32}
                  autoPageSize
                  rowsPerPageOptions={[20]}
                  checkboxSelection={false}
                  localeText={{ footerRowSelected: (count) => "" }}
                />
              </div>
            </ThemeProvider>
          </>
        }
      />

      <Panel
        Header={<div> Log Detail </div>}
        Content={
          <>
            <div className="row">
              <div className="label" style={{ width: "150px" }}>
                <Label text="Brief Description:" />
              </div>
              <div className="label" style={{ width: "5px" }}></div>
              <div className="label" style={{ width: "700px", height: "40px" }}>
                <Label text={title} />
              </div>
            </div>
            <div className="row">
              <div className="label" style={{ width: "150px" }}>
                <Label text="Description:" />
              </div>
              <div className="label" style={{ width: "5px" }}></div>
              <div className="label" style={{ width: "700px", height: "60px" }}>
                <Label text={logDetail} />
              </div>
            </div>
            <div className="row">
              <div className="label" style={{ width: "150px" }}>
                <Label text="Log Date Time:" />
              </div>
              <div className="label" style={{ width: "5px" }}></div>
              <div className="label" style={{ width: "600px" }}>
                <Label text={logDtm} />
              </div>
            </div>
            <div className="row">
              <div className="label" style={{ width: "150px" }}>
                <Label text="Action By (Hospital):" />
              </div>
              <div className="label" style={{ width: "5px" }}></div>
              <div className="label" style={{ width: "600px" }}>
                <Label text={actionBy} />
              </div>
            </div>
          </>
        }
      />

      <DassCommon ref={DassCommonRef} mdWidth={840} mdHeight={520} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ViewAppLog);
