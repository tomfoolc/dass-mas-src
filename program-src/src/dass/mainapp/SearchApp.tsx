import React from "react";
import { connect } from "react-redux";

import { getApplicationByAppNo, getApplicationByHKID } from "@/reducers";

import { Button, Label, Panel, InputControl } from "@/layouts";

import TopMenu from "./TopMenu";
import ShowAppRecord from "./ShowAppRecord";

import { DassCommon, DassCommonRefProps } from "../common/CommonModule";
import Constant from "@/constant/Constant";

interface DispatchProps {
  getApplicationByAppNo: (da_app_no: string) => Promise<any>;
  getApplicationByHKID: (hkid: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
  getApplicationByAppNo,
  getApplicationByHKID,
};

const SearchApp = (props: Props) => {
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [searchInput, setSearchInput] = React.useState("");
  const [appData, setAppData] = React.useState<any[]>([]);

  const HkidChangeHandler = (event: any) => {
    setSearchInput(event.target.value);
  };

  const HkidKeyDownHandler = (event: any) => {
    if (event.charCode === 13) {
      SearchApp();
    }
  };

  const SearchApp = async () => {
    let searchValue = searchInput.trim().toUpperCase();;

    if (searchValue !== "") {
      DassCommonRef.current?.handleLoadingOpen(
        "Searching application... Please wait"
      );

      const { getApplicationByAppNo, getApplicationByHKID } = props;

      if (searchValue.substring(0, 2) === "DA") {
        const response = await getApplicationByAppNo(searchValue);
        if (
          response.ret_cde === Constant.API_SUCCESS &&
          response.result.length > 0
        ) {
          DisplayAppResult(response.result);
          DassCommonRef.current?.handleLoadingClose();
        } else {
          setAppData([]);
          DassCommonRef.current?.handleLoadingClose();
          DassCommonRef.current?.handleDialogOpen("No record found.");
        }
      } else {
        const response = await getApplicationByHKID(searchValue);
        if (
          response.ret_cde === Constant.API_SUCCESS &&
          response.result.length > 0
        ) {
          DisplayAppResult(response.result);
          DassCommonRef.current?.handleLoadingClose();
        } else {
          setAppData([]);
          DassCommonRef.current?.handleLoadingClose();
          DassCommonRef.current?.handleDialogOpen("No record found.");
        }
      }
    } else {
      DassCommonRef.current?.handleDialogOpen(
        "Please input HKIC/BC No. or DASS Ref."
      );
    }
  };

  const DisplayAppResult = (app: any) => {
    if (app !== null) {
      setAppData(app);
    } else {
      ClearApp();
    }
  };

  const ClearApp = () => {
    setSearchInput("");
    setAppData([]);
  };

  const searchHandler = async () => {
    SearchApp();
  };

  const clearHandler = () => {
    ClearApp();
  };

  return (
    <div className="page">
      <TopMenu />

      <div className="header">
        Search Existing Disablilty Allowance Medical Assessment Form
      </div>

      <div>
        <Panel
          Header={""}
          Content={
            <div>
              <div className="row">
                <Label
                  text="HKIC/BC No. / DASS Ref.:"
                  style={{ width: "240px" }}
                />
                <InputControl
                  style={{ width: "400px" }}
                  value={searchInput}
                  onChange={HkidChangeHandler}
                  onKeyPress={HkidKeyDownHandler}
                />
                <input
                  style={{ display: "none" }}
                  onKeyPress={HkidKeyDownHandler}
                />
              </div>
            </div>
          }
          Footer={
            <div>
              <Button text="Search" onClick={searchHandler} />
              &nbsp;
              <Button text="Reset" onClick={clearHandler} />
            </div>
          }
        />
      </div>

      <div>
        <ShowAppRecord appData={appData} />
      </div>

      <DassCommon ref={DassCommonRef} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(SearchApp);
