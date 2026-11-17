import React from "react";
import {
  CheckBox,
  Label,
  InputControl,
  RadioButton,
  DropdownList,
  AutoComplete,
} from "@/layouts";
import { IAppData, IOptionItem, ISubUnitList, IUserConfig } from "@/interface";
import AppConstant from "@/constant/AppConstant";

interface AppProps {
  userConf: IUserConfig;
  daAppObj: IAppData;
  setDaAppObj: (appData: IAppData) => void;
  disabled?: boolean;
}

const DAReq = (props: AppProps) => {

  const { userConf, daAppObj, setDaAppObj, disabled } = props;

  let appData: IAppData = { ...daAppObj };

  const [state, setState] = React.useState(
    {
      optWard: {} as IOptionItem | {},
      listWard: [] as Array<IOptionItem>,
      optSpecialty: {} as IOptionItem | {},
      listSpecialty: [] as Array<IOptionItem>,
      optSubSpecialty: {} as IOptionItem | {},
      listSubSpecialty: [] as Array<IOptionItem>,
    }
  );

  const getWardList = React.useCallback((list: any) => {
    let aryWard: Array<IOptionItem> = [];
    if (list !== undefined && list !== null) {
      for (const element of list) {
        aryWard.push({
          id: element[1],
          displayText: element[0],
          value: element[1],
        });
      }
    }
    let currentSpecialtyWard : string = appData.ax_specialty_ward ? appData.ax_specialty_ward  : "";
    let currentOpt : IOptionItem = { id: currentSpecialtyWard, displayText: currentSpecialtyWard, value : currentSpecialtyWard }
    const foundItem = aryWard.find(opt => opt.id === currentOpt.id);
    if (foundItem === undefined) {
      aryWard.push(currentOpt);
    }
    return aryWard;
  }, [appData.ax_specialty_ward]);

  const getSpecialtyList = React.useCallback((list: any) => {
    let arySpecialty: Array<IOptionItem> = [];
    if (list !== undefined && list !== null) {
      for (const element of list) {
        arySpecialty.push({
          id: element[1],
          displayText: element[0],
          value: element[1],
        });
      }
    }
    let currentSpecialtyWard : string = appData.ax_specialty_ward ? appData.ax_specialty_ward  : "";
    let currentOpt : IOptionItem = { id: currentSpecialtyWard, displayText: currentSpecialtyWard, value : currentSpecialtyWard }
    const foundItem = arySpecialty.find(opt => opt.id === currentOpt.id);
    if (foundItem === undefined) {
      arySpecialty.push(currentOpt);
    }
    return arySpecialty;
  }, [appData.ax_specialty_ward]);

  const getSubSpecialtyList = React.useCallback((list: any) => {
    let arySubspecialty: Array<IOptionItem> = [];
    if (list !== undefined && list !== null) {
      for (const element of list) {
        let subspecialty: ISubUnitList = element;
        arySubspecialty.push({
          id: subspecialty.unit_code + "_" + subspecialty.sub_unit_code,
          displayText: subspecialty.sub_unit_desc ? subspecialty.sub_unit_desc : "",
          value: subspecialty.sub_unit_code ? subspecialty.sub_unit_code : "",
          unit_code: subspecialty.unit_code ? subspecialty.unit_code : ""
        });
      }
    }
    if (appData.ax_specialty_type === AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY) {
      let currentSpecialtyWard: string = appData.ax_specialty_ward ? appData.ax_specialty_ward : "";
      let currentSubSpecialtyWard: string = appData.ax_sub_spec_ward ? appData.ax_sub_spec_ward : "";
      let currentOpt: IOptionItem = { id: currentSpecialtyWard + "_" + currentSubSpecialtyWard, displayText: currentSubSpecialtyWard, value: currentSubSpecialtyWard }
      const foundItem = arySubspecialty.find(opt => opt.id === currentOpt.id);
      if (foundItem === undefined) {
        arySubspecialty.push(currentOpt);
      }
    }
    return arySubspecialty;
  }, [appData.ax_specialty_type, appData.ax_specialty_ward, appData.ax_sub_spec_ward]);

  React.useEffect(() => {

    let OptlistWard = getWardList(userConf.wardListAry);
    let OptWard = getWardList(userConf.wardListAry).filter((item: IOptionItem) => { return item.id === appData.ax_specialty_ward });

    let OptlistSpecialty = getSpecialtyList(userConf.specialtyListAry);
    let OptSpecialty = getSpecialtyList(userConf.specialtyListAry).filter((item: IOptionItem) => { return item.id === appData.ax_specialty_ward });

    let OptlistSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return item.unit_code === appData.ax_specialty_ward || appData.ax_specialty_ward === "" });
    let OptSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return item.id === appData.ax_specialty_ward + "_" + appData.ax_sub_spec_ward });

    let newState = {
      optWard: OptWard != null && OptWard.length > 0 ? OptWard[0] : {},
      listWard: OptlistWard,
      optSpecialty: OptSpecialty != null && OptSpecialty.length > 0 ? OptSpecialty[0] : {},
      listSpecialty: OptlistSpecialty,
      optSubSpecialty: OptSubSpecialty !=null && OptSubSpecialty.length > 0 ? OptSubSpecialty[0] : {},
      listSubSpecialty: OptlistSubSpecialty,
    };    
    setState({ ...state, ...newState });
    setAxClinicCode(daAppObj.ax_clinic_code ? daAppObj.ax_clinic_code.toString() : "")

    // eslint-disable-next-line
  }, [appData.ax_specialty_type, appData.ax_specialty_ward, appData.ax_sub_spec_ward]);

  const Assesor = userConf.role?.assessor;
  const hospitallist = userConf.hospitalListAry ? userConf.hospitalListAry : [];
  const cliniclist = userConf.clinicListAry ? userConf.clinicListAry : [];
  const age = appData.age ? appData.age : 18;

  const [axHospType, setAxHospitalType] = React.useState(
    appData.ax_hospital_type ? appData.ax_hospital_type : "H"
  );
  const [axHospCde, setAxHospitalCde] = React.useState(
    appData.ax_hospital_cde
      ? appData.ax_hospital_cde.toString()
      : ""
  );
  const [axClinicCode, setAxClinicCode] = React.useState(
    appData.ax_clinic_code
      ? appData.ax_clinic_code.toString()
      : ""
  );

  const [axSpecialtyType, setAxSpecialtyType] = React.useState(
    appData.ax_specialty_type ? appData.ax_specialty_type : ""
  );

  const [showPart2, setShowPart2] = React.useState(
    appData.maf_req_part2 !== 0 ? true : false
  );
  const [showPart3, setShowPart3] = React.useState(
    appData.maf_req_part3 !== 0 ? true : false
  );
  const [showPart4, setShowPart4] = React.useState(
    appData.maf_req_part4 !== 0 ? true : false
  );
  const [showPart5, setShowPart5] = React.useState(
    appData.maf_req_part5 !== 0 ? true : false
  );
  const [showPart6, setShowPart6] = React.useState(
    appData.maf_req_part6 !== 0 ? true : false
  );
  const [showPart7, setShowPart7] = React.useState(
    appData.maf_req_part7 !== 0 ? true : false
  );
  const [DTMsg, setDTMsg] = React.useState(
    appData.msg_to_doctor ? appData.msg_to_doctor : ""
  );

  const inputDestRef = React.useRef<HTMLInputElement>(null);

  const hospitalTypeOnChange = (value: string) => {
    setAxHospitalType(value);
    setAxClinicCode("");
    appData.ax_hospital_type = value;
    appData.ax_clinic_code = "";
    setDaAppObj(appData);
  };

  const axHospitalOnChange = (value: string) => {
    setAxHospitalCde(value);
    appData.ax_hospital_cde = value;
    setDaAppObj(appData);
  };

  const axClinicOnChange = (value: string) => {
    setAxClinicCode(value);
    appData.ax_clinic_code = value;
    setDaAppObj(appData);
  };

  const axSpecialtyTypeOnChange = (value: string) => {
    setAxSpecialtyType(value);
    appData.ax_specialty_type = value;
    appData.ax_specialty_ward = "";
    appData.ax_sub_spec_ward = "";
    setDaAppObj(appData);
    let OptlistSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return true; });
    setState({ ...state, optSubSpecialty: {}, listSubSpecialty: OptlistSubSpecialty });
  };

  const axSpecialtyOnChange = (opt: IOptionItem) => {
    if (opt !== null) {
      let OptlistSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return item.unit_code === opt.value });
      setState({ ...state, optSpecialty: opt, optSubSpecialty: {}, listSubSpecialty: OptlistSubSpecialty });
      appData.ax_specialty_type = AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY;
      appData.ax_specialty_ward = opt.value;
      appData.ax_sub_spec_ward = "";
      setDaAppObj(appData);
    } else {
      let OptlistSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return true; });
      setState({ ...state, optSpecialty: opt, optSubSpecialty: {}, listSubSpecialty: OptlistSubSpecialty });
    }
  };

  const axSubSpecialtyOnChange = (opt: IOptionItem) => {
    if (opt !== null) {
      let OptSpecialty = getSpecialtyList(userConf.specialtyListAry).filter((item: IOptionItem) => { return item.id === opt.unit_code });
      let OptlistSubSpecialty = getSubSpecialtyList(userConf.subUnitList).filter((item: IOptionItem) => { return item.unit_code === opt.unit_code });
      setState({ ...state, optSpecialty: OptSpecialty[0], optSubSpecialty: opt, listSubSpecialty: OptlistSubSpecialty });
      appData.ax_specialty_ward = opt.unit_code;
      appData.ax_sub_spec_ward = opt.value;
      setDaAppObj(appData);
    }
  };

  const axWardOnChange = (opt: IOptionItem) => {
    if (opt !== null) {
      appData.ax_specialty_type = AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD;
      appData.ax_specialty_ward = opt.value;
      setDaAppObj(appData);
    }
  };

  const HideNViewPart2 = () => {
    setShowPart2(!showPart2);
    appData.maf_req_part2 = !showPart2 ? 1 : 0;
    setDaAppObj(appData);
  };
  const HideNViewPart3 = () => {
    setShowPart3(!showPart3);
    appData.maf_req_part3 = !showPart3 ? 1 : 0;
    setDaAppObj(appData);
  };
  const HideNViewPart4 = () => {
    setShowPart4(!showPart4);
    appData.maf_req_part4 = !showPart4 ? 1 : 0;
    setDaAppObj(appData);
  };
  const HideNViewPart5 = () => {
    setShowPart5(!showPart5);
    appData.maf_req_part5 = !showPart5 ? 1 : 0;
    setDaAppObj(appData);
  };
  const HideNViewPart6 = () => {
    setShowPart6(!showPart6);
    appData.maf_req_part6 = !showPart6 ? 1 : 0;
    setDaAppObj(appData);
  };
  const HideNViewPart7 = () => {
    setShowPart7(!showPart7);
    appData.maf_req_part7 = !showPart7 ? 1 : 0;
    setDaAppObj(appData);
  };
  const DTMsgHander = (msg: string) => {
    setDTMsg(msg);
    appData.msg_to_doctor = msg;
    setDaAppObj(appData);
  };

  return (
    <div className="page">
      <div>
        <div style={{ height: "20px" }}></div>

        <div className="row">
          <div style={{ width: "100px" }}>
            <Label text="Destination :" />
          </div>

          <div className="row" style={{ width: "200px" }}>
            <div style={{ width: "110px" }}>
              <RadioButton
                id="p4_1a"
                isSelected={
                  axHospType === AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL
                }
                label="Hospital"
                value={AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL}
                onChange={() =>
                  hospitalTypeOnChange(AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL)
                }
                disabled={disabled}
              />
            </div>
            <div>
              <RadioButton
                id="p4_1b"
                isSelected={axHospType === AppConstant.DASS_HOSPITAL_TYPE.CLINIC}
                label="Clinic:"
                value={AppConstant.DASS_HOSPITAL_TYPE.CLINIC}
                onChange={() =>
                  hospitalTypeOnChange(AppConstant.DASS_HOSPITAL_TYPE.CLINIC)
                }
                disabled={disabled}
              />
            </div>
          </div>

          <div>
            {axHospType === AppConstant.DASS_HOSPITAL_TYPE.HOSPITAL ?
              <DropdownList
                value={axHospCde}
                list={hospitallist}
                onSelect={axHospitalOnChange}
                width={600}
                disabled={true}
              />
              :
              <DropdownList
                value={axClinicCode}
                list={cliniclist}
                onSelect={axClinicOnChange}
                width={600}
                disabled={disabled}
              />
            }
          </div>
        </div>

        <div className="row">
          <div style={{ width: "100px" }}></div>

          <div className="row" style={{ width: "200px" }}>

            <div style={{ width: "110px", margin: 0, padding: 0 }}>
              <RadioButton
                id="p4_2a"
                isSelected={
                  axSpecialtyType ===
                  AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY
                }
                label="Specialty"
                value={AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY}
                onChange={() => axSpecialtyTypeOnChange(AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY)}
                disabled={disabled}
              />
              <div style={{fontSize: 10}}>
                (OP / outreach applicants)
              </div>              
            </div>
          
            <div>
              <div>
              <RadioButton
                id="p4_2b"
                isSelected={
                  axSpecialtyType === AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD
                }
                label="Ward :"
                value={AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD}
                onChange={() => axSpecialtyTypeOnChange(AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD)}
                disabled={disabled}
              />
              </div>
              <div style={{fontSize: 10}}>
                (IP applicants)
              </div>
            </div>

          </div>

          <input className="focusRef" ref={inputDestRef} />

          <div>
            {axSpecialtyType ===
              AppConstant.DASS_APP.TREAT_SPEC_TYPE.SPECIALTY ? (
              <AutoComplete
                value={state.optSpecialty}
                optList={state.listSpecialty}
                onChange={axSpecialtyOnChange}
                width={600}
                disabled={disabled}
              />
            ) : (
              <AutoComplete
                value={state.optWard}
                optList={state.listWard}
                onChange={axWardOnChange}
                width={600}
                disabled={disabled}
              />
            )}
          </div>

        </div>

        <div className="row">
          <div style={{ width: "100px" }}></div>

          <div className="row" style={{ width: "200px" }}>
            <Label text="Sub-specialty:" />
          </div>

          <div>
            <AutoComplete
              value={state.optSubSpecialty}
              optList={state.listSubSpecialty}
              onChange={axSubSpecialtyOnChange}
              width={600}
              disabled={disabled || axSpecialtyType === AppConstant.DASS_APP.TREAT_SPEC_TYPE.WARD}
            />
          </div>
        </div>

      </div>

      <div style={{ marginTop: "20px" }}>
        <Label text="Requested parts to be filled in:" />{" "}
      </div>

      <div style={{ marginLeft: "20px" }}>
        <CheckBox
          text={<Label symbol="(II)" text="Nature / Degree of disablility" />}
          isChecked={showPart2}
          onClick={HideNViewPart2}
          disabled={true}
        />

        <CheckBox
          text={
            <Label
              symbol="(III)"
              text="Whether the patient requires constant attendance"
            />
          }
          isChecked={showPart3}
          onClick={HideNViewPart3}
          disabled={true}
        />

        <CheckBox
          text={<Label symbol="(IV)" text="Duration of disabling condition" />}
          isChecked={showPart4}
          onClick={HideNViewPart4}
          disabled={true}
        />

        <CheckBox
          text={
            <Label
              symbol="(V)"
              text="Assessment for fitness for making a statement in relation to the application of SSA Scheme"
            />
          }
          isChecked={showPart5}
          onClick={HideNViewPart5}
          disabled={age < 18 || disabled}
        />

        <CheckBox
          text={<Label symbol="(VI)" text="Recommendation" />}
          isChecked={showPart6}
          onClick={HideNViewPart6}
          disabled={true}
        />

        <CheckBox
          text={
            <Label
              symbol="(VII)"
              text="Change of assessment result compared to the last assessment and any other comments"
            />
          }
          isChecked={showPart7}
          onClick={HideNViewPart7}
          disabled={true}
        />
      </div>
      <div>
        <div>
          {Assesor !== "1" ? (
            <div style={{ width: "80%" }}>
              <br />
              <Label text="Message to Doctor:" style={{ width: "400px" }} />
              <InputControl
                type="textarea"
                value={DTMsg}
                maxLength={250}
                style={{ height: "100px", width: "580px" }}
                onChange={(event: any) => DTMsgHander(event.target.value)}
                disabled={disabled}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DAReq;
