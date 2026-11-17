import React from "react";
import { useSelector } from "react-redux";

import { IPatientData } from "@/interface";

interface StateProps {
  das_data: {
    PatientData: IPatientData;
  };
}

interface AppProps {
  hkid: string;
}

const CMSPatientPanel = (props: AppProps) => {
  const patientDataState = useSelector(
    (state: StateProps) => state.das_data.PatientData
  );

  const [hkid] = React.useState(patientDataState.hkid);
  const [engName] = React.useState(patientDataState.eng_name);
  const [chinName] = React.useState(patientDataState.chi_name);
  const [sex] = React.useState(patientDataState.sex);
  const [deathInd] = React.useState(patientDataState.death_ind);
  const [age] = React.useState(patientDataState.age);
  const [dob] = React.useState(patientDataState.dob);
  const [specialty] = React.useState(patientDataState.specialty);
  const [ward] = React.useState(patientDataState.ward);
  const [bedno] = React.useState(patientDataState.bed_no);
  const [adm] = React.useState(patientDataState.adm_dte);
  const [hn] = React.useState(patientDataState.hn_no);

  const cssStyles = {
    container: {
      display: "",
      margin: "5px",
      marginTop: "15px",
    },
  };

  let colorStyle = {};
  if (deathInd === "Y")
    //death
    colorStyle = {
      ...cssStyles.container,
      ...{ backgroundColor: "#000000", color: "#fff" },
    };
  else if (sex === "M")
    //male
    colorStyle = {
      ...cssStyles.container,
      ...{ backgroundColor: "#C9EEFF" },
    };
  else if (sex === "F")
    //female
    colorStyle = {
      ...cssStyles.container,
      ...{ backgroundColor: "#FFDEDE" },
    };
  else if (sex === "U")
    //undefined
    colorStyle = {
      ...cssStyles.container,
      ...{ backgroundColor: "#E3DEF6" },
    };

  if (hkid?.trim() === props.hkid.trim()) {
    return (
      <div>
        <div style={colorStyle}>
          <div
            className="row"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              paddingTop: "10px",
              border: "0px solid black",
            }}
          >
            <div style={{ width: "200px", fontFamily: "HA_MingLiu" }}>
              {decodeURIComponent(chinName ? chinName : "")}
            </div>
            <div style={{ width: "700px" }}>{engName}</div>
          </div>
          <div
            className="row"
            style={{
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "bold",
              width: "100%",
              border: "1px solid silver",
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: "50px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {sex}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "50px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {age}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "200px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {dob !== "" ? "DOB : " + dob : ""}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "120px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {hkid?.substring(0, hkid.length - 1)}(
              {hkid?.substring(hkid.length - 1, hkid.length)})
            </div>
            <div
              style={{
                textAlign: "center",
                width: "80px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {specialty}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "100px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {ward} {bedno !== undefined && bedno !== "" ? "-" + bedno : null}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "200px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {adm !== "" ? "Adm : " + adm : ""}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "180px",
                paddingLeft: "5px",
                borderRight: "1px solid silver",
              }}
            >
              {hn}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "100px",
                paddingLeft: "5px",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default CMSPatientPanel;
