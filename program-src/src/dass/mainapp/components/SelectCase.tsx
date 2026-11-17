import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CaseAssignGrid } from "../components/CaseAssignGrid";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";

interface DispatchProps {
  setSelectedAppNo: (ids: Array<any>) => void;
  appData: any[];
}

type Props = DispatchProps;

const SelectCase = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [isInit, setIsInit] = React.useState(true);
  const [data] = React.useState(props.appData);
  const [selectedIds, setSelectedIds] = React.useState(Array<any>);

  const appSelectedIds = (ids: Array<any>) => {
    setSelectedIds(ids);
    props.setSelectedAppNo(ids);
  };

  React.useEffect(() => {
    if (isInit) {
      if (data.length === 1) {
        setSelectedIds([data[0].da_app_no]);
        setIsInit(false);
      }
    }
    // eslint-disable-next-line
  }, [data, isInit]);

  return (
    <div className="page">
      <div>
        <div style={{ height: 450 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "da_app_no", sort: "desc" }],
              },
            }}
            getRowId={(row) => row.da_app_no}
            selectionModel={selectedIds}
            onSelectionModelChange={appSelectedIds}
            columns={CaseAssignGrid}
            rows={data}
            rowHeight={32}
            pageSize={20}
            rowsPerPageOptions={[20]}
            checkboxSelection={true}
          />
        </div>
      </div>
      <DassCommon ref={DassCommonRef} mdWidth={800} mdHeight={500} />
    </div>
  );
};

export default SelectCase;
