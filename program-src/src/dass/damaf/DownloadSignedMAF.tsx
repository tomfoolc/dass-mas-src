import React from "react";
import { connect, useSelector } from "react-redux";

import Constant from "@/constant/Constant";
import { getESignedDAMAF } from "@/reducers";
import { IAppData } from "@/interface/AppData";

interface StateProps {
    das_data: {
        AppData: IAppData;
    };
}

interface DispatchProps {
    getESignedDAMAF: (da_app_no: string) => Promise<any>;
}

type Props = DispatchProps;

const mapDispatchToProps = {
    getESignedDAMAF,
};

const DownloadSignedMAF = (props: Props) => {

    const appDataState = useSelector(
        (state: StateProps) => state.das_data.AppData
    );

    const [isInit, setIsInit] = React.useState(true);
    const [url, setUrl] = React.useState("");
    const [da_app_no] = React.useState(appDataState.da_app_no);

    const [pageSize] = React.useState(3);
    const [pdfWidth] = React.useState(800);
    const [onePageHeight] = React.useState(1150);
    const [pdfHeight, setPdfHeight] = React.useState(5700);
    const [signedDaMAF, setSignedDaMAF] = React.useState("");

    React.useEffect(() => {

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

            setPdfHeight(onePageHeight * pageSize);

            const pdfUint8Array = Uint8Array.from(window.atob(signedDaMAF), (c) => c.charCodeAt(0));
            let blob = new Blob([pdfUint8Array], { type: "application/pdf" });

            let url = URL.createObjectURL(blob);
            if (url !== null) {
                setUrl(url);
            }

        };

        if (isInit) {
            getSigedDoctorPart(da_app_no ? da_app_no : "");
        } else {
            print();
        }

        // eslint-disable-next-line
    }, [props, isInit, da_app_no]);

    return (
        <div className="App">

            <div>
                <iframe
                    id="damaf"
                    title="damaf"
                    src={url}
                    frameBorder=""
                    width={pdfWidth}
                    height={pdfHeight}
                />
            </div>

        </div>
    );
};

export default connect(null, mapDispatchToProps)(DownloadSignedMAF);
