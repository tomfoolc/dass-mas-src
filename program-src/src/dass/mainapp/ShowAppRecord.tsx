import React from "react";
import { connect } from "react-redux";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";

import Constant from "@/constant/Constant";

import { goToPage } from "@/dass/common/DASSUtils";

import { IAppData } from "@/interface";

import { updateApplicationStore } from "@/reducers";

import { Button, Panel } from "@/layouts";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import { datagridTheme } from "../common/DatagridTheme";
import { SearchResultGridColDef } from "./components/SearchResultGrid";
import "../css/ApplicationGrid.css";

interface StateProps {
  appData: any[];
}

interface DispatchProps {
  updateApplicationStore: (patientData: IAppData) => void;
}
type Props = StateProps & DispatchProps;

const mapDispatchToProps = {
  updateApplicationStore,
};

const DisplayAppRecord = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);
  const [daAppNo, setDaAppNo] = React.useState("");
  const [data, setData] = React.useState(props.appData);
  const [lastTap, setLastTap] = React.useState<number | null>(null);

  React.useEffect(() => {
    setData(props.appData);
  }, [props.appData]);

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    setDaAppNo(params.row.da_app_no);
    const now = Date.now();
    const doubleTapThreshold = 300; 
    if (lastTap && (now - lastTap) < doubleTapThreshold) {
      okHandler();
      setLastTap(null);
    } else {
      setLastTap(now);
    }    
  };

  const handleDCEvent: GridEventListener<"rowClick"> = (params) => {
    setDaAppNo(params.row.da_app_no);
    okHandler();
  };

  const okHandler = () => {
    if (daAppNo !== "") {
      DassCommonRef.current?.handleLoadingOpen(
        "Loading application... Please wait"
      );
      setTimeout(() => {
        DassCommonRef.current?.handleLoadingClose();
        goToPage(Constant.DAAPP + "?&da_app_no=" + daAppNo.trim());
      }, Constant.DELAY);
    } else {
      DassCommonRef.current?.handleDialogOpen("Please select an application.");
    }
  };

  return (
    <div className="page">
      <Panel
        Header={"Application Records"}
        Content={
          <ThemeProvider theme={datagridTheme}>
            <div style={{ height: 400 }}>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: "da_app_no", sort: "desc" }],
                  },
                }}
                getRowId={(row) => row.da_app_no}
                onRowClick={handleEvent}
                onRowDoubleClick={handleDCEvent}
                columns={SearchResultGridColDef}
                rows={data}
                rowHeight={32}
                autoPageSize
                rowsPerPageOptions={[20]}
                checkboxSelection={false}
              />
            </div>
          </ThemeProvider>
        }
        Footer={<Button text="OK" onClick={okHandler} />}
      />

      <DassCommon ref={DassCommonRef} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DisplayAppRecord);
