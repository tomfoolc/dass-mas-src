import React from "react";
import { connect } from "react-redux";

import { IAppData } from "@/interface";

import {
  Button,
  CheckBox,
  Label,
  Panel,
  ToolTips,
  InputControl,
} from "@/layouts";
import AppConstant from "@/constant/AppConstant";
import { DassCommon, DassCommonRefProps } from "../../common/CommonModule";
import CommonFunc from "@/common/CommonFunc";

interface StateProps {
  das_data: {
    AppData: IAppData;
  };
}

interface AppProps {
  daAppObj: IAppData;
  setDaAppObj: (appData: IAppData) => void;
  ref: any;
  disabled?: boolean;
}

type Props = AppProps;

const mapStateToProps = (state: StateProps, props: AppProps) => {
  const ref = props.ref;
  return {
    ref,
  };
};

const DAMAF = React.forwardRef<unknown, Props>((props, ref) => {
  
  React.useImperativeHandle(ref, () => ({ CheckIsCompleteForm }));

  function CheckIsCompleteForm(IsScroll: boolean) {
    return checkCompleteForm(IsScroll);
  }

  const checkCompleteForm = (IsScroll: boolean) => {
    if ((lossCond === undefined || lossCond === "") && notDisable !== 1) {
      if (IsScroll) GoToPart2();
      return "Please fill in Part II.";
    }

    if (lossCond !== null && lossCond !== "") {
      if (
        lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER &&
        othCondDesc === ""
      ) {
        if (IsScroll) GoToPart2();
        return "Please input Part II (a) (viii) - Description for patient's other conditions.";
      }

      if (
        withConstAtted === undefined ||
        withConstAtted === -1 ||
        (withConstAtted === 1 && freqAttType === "")
      ) {
        if (IsScroll) GoToPart3();
        return "Please fill in Part III.";
      }

      if (disabledDuration === undefined || disabledDuration === "") {
        if (IsScroll) GoToPart4();
        return "Please fill in Part IV.";
      }

      if (
        AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH ||
        AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO ||
        AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO
      ) {
        if (
          disabledDuration ===
            AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH &&
          disabledDurationDesc >= 6
        ) {
          if (IsScroll) GoToPart4();
          return "Please input a number between 0 and 5.";
        } else if (
          disabledDuration ===
            AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH &&
          disabledDurationDesc === -1
        ) {
          if (IsScroll) GoToPart4();
          return "Please specify number of months.";
        } else if (
          disabledDuration ===
            AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO &&
          disabledDurationDesc < 3
        ) {
          if (IsScroll) GoToPart4();
          return "Please input a number greater than 3.";
        } else if (
          disabledDuration ===
            AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO &&
          disabledDurationDesc === -1
        ) {
          if (IsScroll) GoToPart4();
          return "Please specify years.";
        } else if (
          disabledDuration === AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO &&
          disabledDurationDesc <= 0
        ) {
          if (IsScroll) GoToPart4();
          return "Please input a number greater than 0.";
        } else if (
          disabledDuration === AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO &&
          disabledDurationDesc === -1
        ) {
          if (IsScroll) GoToPart4();
          return "Please specify for child assessment service.";
        }
      }

      if (!disablePart5 && (mentalFit === null || mentalFit === -1)) {
        if (IsScroll) GoToPart5();
        return "Please fill in Part V.";
      }
    }

    if (notDisable === 1) {
      if (notDisableDesc === "") {
        if (IsScroll) GoToPart2b();
        return "Please input a disabling physical or mental condition.";
      }
    }

    if (recoResult === null || recoResult === "") {
      if (IsScroll) GoToPart6();
      return "Please fill in Part VI.";
    }

    return "";
  };

  const { daAppObj, setDaAppObj, disabled } = props;

  let appData: IAppData = { ...daAppObj };

  const inputPart2Ref = React.useRef<HTMLInputElement>(null);
  const inputPart2bRef = React.useRef<HTMLInputElement>(null);
  const inputPart3Ref = React.useRef<HTMLInputElement>(null);
  const inputPart4Ref = React.useRef<HTMLInputElement>(null);
  const inputPart5Ref = React.useRef<HTMLInputElement>(null);
  const inputPart6Ref = React.useRef<HTMLInputElement>(null);
  const inputPart7Ref = React.useRef<HTMLInputElement>(null);
  const DassCommonRef = React.useRef<DassCommonRefProps>(null);

  const [appDate] = React.useState(appData.app_date ? CommonFunc.Date.formatDisplayDate(new Date(appData.app_date)) : "");
  const [appType] = React.useState(appData.app_type);
  const [sex] = React.useState(appData.sex);

  const [lossCond, setLossCond] = React.useState(
    appData.loss_cond ? appData.loss_cond : ""
  );
  const lossCondChangeHander = (value: string) => {
    setLossCond(value);
    appData.loss_cond = value;
    setDaAppObj(appData);
    notDisableChangeHander(0);
  };
  const OptLossLimbChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.LOSS_LIMB
        ? AppConstant.DASS_MAF.LOSS_COND.LOSS_LIMB
        : ""
    );
  };
  const OptLossHandChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.LOSS_HAND
        ? AppConstant.DASS_MAF.LOSS_COND.LOSS_HAND
        : ""
    );
  };
  const OptLossFeetChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.LOSS_FEET
        ? AppConstant.DASS_MAF.LOSS_COND.LOSS_FEET
        : ""
    );
  };
  const OptLossSightChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.LOSS_SIGHT
        ? AppConstant.DASS_MAF.LOSS_COND.LOSS_SIGHT
        : ""
    );
  };
  const OptLossParalysisChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.TOTAL_PARALYSIS
        ? AppConstant.DASS_MAF.LOSS_COND.TOTAL_PARALYSIS
        : ""
    );
  };
  const OptParaplegiaChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.PARAPLEGIA
        ? AppConstant.DASS_MAF.LOSS_COND.PARAPLEGIA
        : ""
    );
  };
  const OptBedriddenChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.BEDRIDDEN
        ? AppConstant.DASS_MAF.LOSS_COND.BEDRIDDEN
        : ""
    );
  };
  const OptOthCondChange = () => {
    lossCondChangeHander(
      lossCond !== AppConstant.DASS_MAF.LOSS_COND.OTHER
        ? AppConstant.DASS_MAF.LOSS_COND.OTHER
        : ""
    );
  };

  const [othCondDesc, setOthCondDesc] = React.useState(
    lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER
      ? appData.other_cond_desc
      : ""
  );
  const othCondDescChangeHander = (value: string) => {
    setOthCondDesc(value);
    appData.other_cond_desc = value;
    setDaAppObj(appData);
  };

  const [notDisable, setnotDisable] = React.useState(
    appData.not_disable !== -1 ? appData.not_disable : -1
  );
  const notDisableChangeHander = (value: number) => {
    setnotDisable(value);
    appData.not_disable = value;
    setDaAppObj(appData);
  };
  const OptnotDisableChange = () => {
    lossCondChangeHander("");
    othCondDescChangeHander("");
    notDisableChangeHander(notDisable === 1 ? 0 : 1);
  };

  const [notDisableDesc, setnotDisableDesc] = React.useState(
    appData.not_disable_desc ? appData.not_disable_desc : ""
  );
  const notDisableDescChangeHander = (value: string) => {
    setnotDisableDesc(value);
    appData.not_disable_desc = value;
    setDaAppObj(appData);
  };

  const [notDisableRemark, setnotDisableRemark] = React.useState(
    appData.not_disable_remark ? appData.not_disable_remark : ""
  );
  const notDisableRemarkChangeHander = (value: string) => {
    setnotDisableRemark(value);
    appData.not_disable_remark = value;
    setDaAppObj(appData);
  };

  const [withConstAtted, setWithConstAtted] = React.useState(
    appData.with_constant_attend !== -1 ? appData.with_constant_attend : -1
  );
  const withConstAttedChangeHander = (value: number) => {
    setWithConstAtted(value);
    appData.with_constant_attend = value;
    setDaAppObj(appData);
  };
  const OptWithConstAtted = () => {
    withConstAttedChangeHander(withConstAtted !== 1 ? 1 : -1);
  };
  const OptWithoutConstAtted = () => {
    withConstAttedChangeHander(withConstAtted !== 0 ? 0 : -1);
    freqAttTypeChangeHander("");
  };

  const [freqAttType, setFreqAttType] = React.useState(
    appData.freq_att_type ? appData.freq_att_type : ""
  );
  const freqAttTypeChangeHander = (value: string) => {
    setFreqAttType(value);
    appData.freq_att_type = value;
    setDaAppObj(appData);
  };
  const freqAttTypeFTChange = () => {
    freqAttTypeChangeHander(
      AppConstant.DASS_MAF.FREQ_ATTENT.FREQUENT_ATTENTION
    );
  };
  const freqAttTypeCSChange = () => {
    freqAttTypeChangeHander(
      AppConstant.DASS_MAF.FREQ_ATTENT.CONTINUAL_SUPERVISION
    );
  };

  const [isAbove15] = React.useState(
    appData.is_above15 !== -1 ? appData.is_above15 : -1
  );

  const [disabledDuration, setDisabledDuration] = React.useState(
    appData.disabled_duration ? appData.disabled_duration : ""
  );
  const disabledDurationChangeHander = (value: string) => {
    setDisabledDuration(value);
    appData.disabled_duration = value;
    setDaAppObj(appData);
  };
  const disabledDuration0T6MChange = () => {
    disabledDurationChangeHander(
      disabledDuration !==
        AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
        ? AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDuration6MChange = () => {
    disabledDurationChangeHander(
      disabledDuration !== AppConstant.DASS_MAF.DISABLED_DURATION.SIX_MONTH
        ? AppConstant.DASS_MAF.DISABLED_DURATION.SIX_MONTH
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDuration6TO12MChange = () => {
    disabledDurationChangeHander(
      disabledDuration !==
        AppConstant.DASS_MAF.DISABLED_DURATION.SIX_TO_TWELVE_MONTH
        ? AppConstant.DASS_MAF.DISABLED_DURATION.SIX_TO_TWELVE_MONTH
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDuration1TO2YChange = () => {
    disabledDurationChangeHander(
      disabledDuration !== AppConstant.DASS_MAF.DISABLED_DURATION.ONE_TO_TWO_YR
        ? AppConstant.DASS_MAF.DISABLED_DURATION.ONE_TO_TWO_YR
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDuration2TO3YChange = () => {
    disabledDurationChangeHander(
      disabledDuration !==
        AppConstant.DASS_MAF.DISABLED_DURATION.TWO_TO_THREE_YR
        ? AppConstant.DASS_MAF.DISABLED_DURATION.TWO_TO_THREE_YR
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDurationFR3YTOChange = () => {
    disabledDurationChangeHander(
      disabledDuration !==
        AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO
        ? AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDurationUPTOChange = () => {
    disabledDurationChangeHander(
      disabledDuration !== AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO
        ? AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };
  const disabledDurationPERMChange = () => {
    disabledDurationChangeHander(
      disabledDuration !== AppConstant.DASS_MAF.DISABLED_DURATION.PERMANENTLY
        ? AppConstant.DASS_MAF.DISABLED_DURATION.PERMANENTLY
        : ""
    );
    disabledDurationDescChangeHander(-1);
  };

  const [disabledDurationDesc, setDisabledDurationDesc] = React.useState(
    appData.disabled_duration_desc ? appData.disabled_duration_desc : -1
  );
  const disabledDurationDescChangeHander = (value: number) => {
    setDisabledDurationDesc(value);
    appData.disabled_duration_desc = value;
    setDaAppObj(appData);
  };

  const [mentalFit, setMentalFit] = React.useState(appData.mental_fit);
  const mentalFitChangeHander = (value: number) => {
    setMentalFit(value);
    appData.mental_fit = value;
    setDaAppObj(appData);
  };
  const mentalFitYChange = () => {
    mentalFitChangeHander(mentalFit !== 1 ? 1 : -1);
  };
  const mentalFitNChange = () => {
    mentalFitChangeHander(mentalFit !== 0 ? 0 : -1);
  };

  const [recoResult, setRecoResult] = React.useState(
    appData.recommendation ? appData.recommendation : ""
  );
  const recoResultChangeHander = (value: string) => {
    setRecoResult(value);
    appData.recommendation = value;
    setDaAppObj(appData);
  };
  const recoResultNChange = () => {
    recoResultChangeHander(
      recoResult !== AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN
        ? AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN
        : ""
    );
  };
  const recoResultPChange = () => {
    recoResultChangeHander(
      recoResult !== AppConstant.DASS_MAF.RECOMMENDATION.NDA
        ? AppConstant.DASS_MAF.RECOMMENDATION.NDA
        : ""
    );
  };
  const recoResultYChange = () => {
    recoResultChangeHander(
      recoResult !== AppConstant.DASS_MAF.RECOMMENDATION.HDA
        ? AppConstant.DASS_MAF.RECOMMENDATION.HDA
        : ""
    );
  };

  const [daChange, setDaChange] = React.useState(
    appData.chg_ax_result ? appData.chg_ax_result : ""
  );
  const daChangeChangeHander = (value: string) => {
    setDaChange(value);
    appData.chg_ax_result = value;
    setDaAppObj(appData);
  };
  const daChangeCChange = () => {
    daChangeChangeHander(
      daChange !== AppConstant.DASS_MAF.CHG_AX_RESULT.NDA2HDA
        ? AppConstant.DASS_MAF.CHG_AX_RESULT.NDA2HDA
        : ""
    );
    othChangeReasonChangeHander("");
  };
  const daChangeOChange = () => {
    daChangeChangeHander(
      daChange !== AppConstant.DASS_MAF.CHG_AX_RESULT.OTH
        ? AppConstant.DASS_MAF.CHG_AX_RESULT.OTH
        : ""
    );
  };

  const [othChangeReason, setOthChangeReason] = React.useState(
    appData.result_spec_reason ? appData.result_spec_reason : ""
  );
  const othChangeReasonChangeHander = (value: string) => {
    setOthChangeReason(value);
    appData.result_spec_reason = value;
    setDaAppObj(appData);
  };

  const [othComment, setOthComment] = React.useState(
    appData.other_comment ? appData.other_comment : ""
  );
  const othCommentChangeHander = (value: string) => {
    setOthComment(value);
    appData.other_comment = value;
    setDaAppObj(appData);
  };

  const [isDisablePart2a, setIsDisablePart2a] = React.useState(false);
  const [isDisablePart2b, setIsDisablePart2b] = React.useState(false);
  const [isDisablePart3, setIsDisablePart3] = React.useState(false);
  const [isDisablePart4, setIsDisablePart4] = React.useState(false);
  const [isDisablePart5, setIsDisablePart5] = React.useState(false);
  const [isDisablePart6, setIsDisablePart6] = React.useState(false);
  const [isDisablePart7a, setIsDisablePart7a] = React.useState(false);

  const [isDisableNotMeet, setIsDisableNotMeet] = React.useState(false);
  const [isDisableNDA, setIsDisableNDA] = React.useState(false);
  const [isDisableHDA, setIsDisableHDA] = React.useState(false);

  React.useEffect(() => {

    const InitAppForm = () => {

      if (lossCond !== null && lossCond !== "") {
        setIsDisablePart2b(true);
        notDisableDescChangeHander("");
        notDisableRemarkChangeHander("");
      }

      if (notDisable === 1) {
        setIsDisablePart2a(true);
        othCondDescChangeHander("");
      }

      if (appType === AppConstant.DASS_APP_TYPE.NEW) {
        setIsDisablePart7a(true);
        setDaChange("");
        setOthChangeReason("");
      }

      if (
        (lossCond !== null &&
          lossCond !== "" &&
          lossCond !== AppConstant.DASS_MAF.LOSS_COND.OTHER) ||
        (lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER &&
          othCondDesc !== "")
      ) {
        setIsDisablePart2a(false);
        setIsDisablePart2b(true);

        notDisableDescChangeHander("");
        notDisableRemarkChangeHander("");

        setIsDisablePart3(false);

        if (
          withConstAtted === 0 ||
          (withConstAtted === 1 && freqAttType !== "")
        ) {
          setIsDisablePart4(false);
        } else {
          setIsDisablePart4(true);
        }

        setIsDisablePart5(false);
        setIsDisablePart6(true);
        setIsDisableNotMeet(false);
        setIsDisableNDA(false);
        setIsDisableHDA(false);
        setIsDisablePart7a(true);
        setDaChange("");
        setOthChangeReason("");

        if (appType === AppConstant.DASS_APP_TYPE.NEW) {
          if (withConstAtted === 0) {
            if (
              disabledDuration ===
              AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
            ) {
              setIsDisablePart6(false);
              setIsDisableNotMeet(false);
              setIsDisableNDA(true);
              setIsDisableHDA(true);

              if (
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA ||
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA
              )
                setRecoResult("");
            } else if (
              disabledDuration !== "" &&
              disabledDuration !==
                AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
            ) {
              setIsDisablePart6(false);
              setIsDisableNotMeet(true);
              setIsDisableNDA(false);
              setIsDisableHDA(true);

              if (
                recoResult ===
                  AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA
              )
                setRecoResult("");
            }
          } else if (withConstAtted === 1 && freqAttType.trim() !== "") {
            if (
              disabledDuration ===
              AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
            ) {
              setIsDisablePart6(false);
              setIsDisableNotMeet(false);
              setIsDisableNDA(true);
              setIsDisableHDA(true);

              if (
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA ||
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA
              )
                setRecoResult("");
            } else if (
              disabledDuration !== "" &&
              disabledDuration !==
                AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
            ) {
              setIsDisablePart6(false);
              setIsDisableNotMeet(true);
              setIsDisableNDA(true);
              setIsDisableHDA(false);

              if (
                recoResult ===
                  AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA
              )
                setRecoResult("");
            }
          } else {
            setIsDisablePart6(true);
          }
        } else {
          if (withConstAtted != null) {
            if (withConstAtted === 0) {
              if (
                disabledDuration ===
                AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
              ) {
                setIsDisablePart6(false);
                setIsDisableNotMeet(true);
                setIsDisableNDA(false);
                setIsDisableHDA(true);

                if (
                  recoResult ===
                    AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                  recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA
                )
                  setRecoResult("");
              } else if (
                disabledDuration !== "" &&
                disabledDuration !==
                  AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
              ) {
                setIsDisablePart6(false);
                setIsDisableNotMeet(true);
                setIsDisableNDA(false);
                setIsDisableHDA(true);

                if (
                  recoResult ===
                    AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                  recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA
                )
                  setRecoResult("");
              }
            } else if (withConstAtted === 1 && freqAttType.trim() !== "") {
              if (
                disabledDuration ===
                AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
              ) {
                setIsDisablePart6(false);
                setIsDisableNotMeet(true);
                setIsDisableNDA(true);
                setIsDisableHDA(false);

                if (
                  recoResult ===
                    AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                  recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA
                )
                  setRecoResult("");
              } else if (
                disabledDuration !== "" &&
                disabledDuration !==
                  AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
              ) {
                setIsDisablePart6(false);
                setIsDisableNotMeet(true);
                setIsDisableNDA(true);
                setIsDisableHDA(false);

                if (
                  recoResult ===
                    AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN ||
                  recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA
                )
                  setRecoResult("");
              }

              if (appType === AppConstant.DASS_APP_TYPE.NDA && disabledDuration !== AppConstant.DASS_MAF.DISABLED_DURATION.PERMANENTLY) {
                setIsDisablePart7a(false);                
              }

            } else {
              setIsDisablePart6(true);
            }
          }
        }
      } else if (notDisable === 1 && notDisableDesc !== "") {
        setIsDisablePart2a(true);
        othCondDescChangeHander("");

        setIsDisablePart2b(false);

        setIsDisablePart3(true);
        withConstAttedChangeHander(-1);
        freqAttTypeChangeHander("");

        setIsDisablePart4(true);
        disabledDurationChangeHander("");
        disabledDurationDescChangeHander(-1);

        setIsDisablePart5(true);
        mentalFitChangeHander(-1);

        setIsDisablePart6(false);
        if (recoResult !== AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN) {
          setRecoResult("");
        }

        setIsDisablePart7a(true);
        setDaChange("");
        setOthChangeReason("");
        setIsDisableNotMeet(false);
        setIsDisableNDA(true);
        setIsDisableHDA(true);
      }

      if (
        (lossCond === "" && notDisable === 0) ||
        (lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER &&
          othCondDesc === "")
      ) {
        setIsDisablePart2a(false);
        if (lossCond === "" && notDisable === 0) 
          setIsDisablePart2b(false);
        
        othCondDescChangeHander("");
        notDisableDescChangeHander("");
        notDisableRemarkChangeHander("");

        setIsDisablePart3(true);
        setIsDisablePart4(true);
        setIsDisablePart5(true);
        setIsDisablePart6(true);
        setIsDisablePart7a(true);
        setDaChange("");
        setOthChangeReason("");
      }

      if (lossCond !== AppConstant.DASS_MAF.LOSS_COND.OTHER) {
        othCondDescChangeHander("");
      }

      if (withConstAtted === -1) {
        freqAttTypeChangeHander("");
      }

    };

    InitAppForm();

    // eslint-disable-next-line
  }, [
    lossCond,
    othCondDesc,
    notDisable,
    notDisableDesc,
    withConstAtted,
    freqAttType,
    disabledDuration,
  ]);

  const [showPart1, setShowPart1] = React.useState(true);
  const [showPart2, setShowPart2] = React.useState(
    appData.maf_req_part2 === 1 ? true : false
  );
  const [showPart3, setShowPart3] = React.useState(
    appData.maf_req_part3 === 1 ? true : false
  );
  const [showPart4, setShowPart4] = React.useState(
    appData.maf_req_part4 === 1 ? true : false
  );
  const [showPart5, setShowPart5] = React.useState(
    appData.maf_req_part5 === 1 ? true : false
  );
  const [showPart6, setShowPart6] = React.useState(
    appData.maf_req_part6 === 1 ? true : false
  );
  const [showPart7, setShowPart7] = React.useState(
    appData.maf_req_part7 === 1 ? true : false
  );

  const [disablePart1] = React.useState(false);
  const [disablePart2] = React.useState(
    appData.maf_req_part2 === 1 ? false : true
  );
  const [disablePart3] = React.useState(
    appData.maf_req_part3 === 1 ? false : true
  );
  const [disablePart4] = React.useState(
    appData.maf_req_part4 === 1 ? false : true
  );
  const [disablePart5] = React.useState(
    appData.maf_req_part5 === 1 ? false : true
  );
  const [disablePart6] = React.useState(
    appData.maf_req_part6 === 1 ? false : true
  );
  const [disablePart7] = React.useState(
    appData.maf_req_part7 === 1 ? false : true
  );

  const HideNViewPart1 = () => {
    setShowPart1(!showPart1);
  };
  const HideNViewPart2 = () => {
    setShowPart2(!showPart2);
  };
  const HideNViewPart3 = () => {
    setShowPart3(!showPart3);
  };
  const HideNViewPart4 = () => {
    setShowPart4(!showPart4);
  };
  const HideNViewPart5 = () => {
    setShowPart5(!showPart5);
  };
  const HideNViewPart6 = () => {
    setShowPart6(!showPart6);
  };
  const HideNViewPart7 = () => {
    setShowPart7(!showPart7);
  };

  const GoToPart2 = () => {
    inputPart2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GoToPart2b = () => {
    inputPart2bRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GoToPart3 = () => {
    inputPart3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GoToPart4 = () => {
    inputPart4Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GoToPart5 = () => {
    inputPart5Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GoToPart6 = () => {
    inputPart6Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showPointstoNote = () => {
    let modalContent = null;
    modalContent = (
      <div>
        <img 
          src={require("@/assets/images/pointtonote.png")}
          alt="Points to Note" 
        />
      </div>
    );
    DassCommonRef.current?.handleModalOpen(modalContent);
  };

  return (
    <div className="page">
      <div className="alignCenter" style={{ paddingTop: "10px" }}>
        <div style={{ fontSize: "12pt", fontWeight: 800 }}>
          MEDICAL ASSESSMENT FORM SOCIAL SECURITY ALLOWANCE (SSA) SCHEME
        </div>
      </div>

      <Panel
        Header={
          <div>
            <Label symbol="(I)" text="General" style={{ color: "white" }} />
          </div>
        }
        Content={
          <div style={{ padding: "20px" }}>
            <div className="row">
              <div style={{ paddingLeft: "10px", textAlign: "justify" }}>
                Under the Disability Allowance (DA), the role of doctors is to
                perform medical assessment on the applicants using the Medical
                Assessment Form and inform the Social Welfare Department whether
                the applicants are severely disabled within the meaning of the
                Scheme. An applicant certified by medical officers of public
                hospitals/clinics under the Department of Health or the Hospital
                Authority as severely disabled can be eligible for DA under the
                SSA Scheme. To be regarded as severely disabled within the
                meaning of DA, a person must fall into one of the categories set
                out in Part (II)(a) below. The aim of the categories, as
                defined, is to cover all those who are severely disabled and as
                a result need substantial help from others to cope with daily
                life, even if they are able to do a paid job. (For this purpose,
                those who are in Part (II)(a) below are deemed to need this
                substantial help.) For new applications, the applicants will{" "}
                <b>
                  <u>NOT</u>
                </b>{" "}
                be qualified for DA if their disablement is expected to{" "}
                <u>last for less than six months</u>. Subject to other
                eligibility criteria being met, an applicant who is severely
                disabled as defined above will be eligible for DA and the final
                authority for approval and granting of DA is vested in the
                Social Welfare Department.
              </div>
            </div>

            <div className="alignRight hidden">
              <Button
                text="Please proceed to Part (II)"
                style={{ width: "250px" }}
                onClick={GoToPart2}
              />
            </div>
          </div>
        }
        IsExpand={showPart1}
        IsDisabled={disablePart1}
        onExpand={HideNViewPart1}
      />

      <input className="focusRef" ref={inputPart2Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(II)"
              text="Nature / Degree of disablility"
              style={{ color: "white" }}
            />
          </div>
        }
        SubHeader={
          <div style={{ marginLeft: "35px" }}>
            <Label
              text="[Note: Please fill in Part(a) or (b); and tick the box(es) and fill in the blank(s) as appropriate]"
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div>
            <div className="alignRight">
              <Button
                text="[Points to Note*]"
                onClick={showPointstoNote}
                style={{
                  width: "200px",
                  backgroundColor: "transparent",
                  color: "navy",
                  fontWeight: "bold",
                }}
              />
            </div>

            <div>
              <Label
                symbol="(a)"
                text={
                  <div>
                    The patient is in a position broadly equivalent to one of
                    (i) to (vii) below <b> OR </b> meets (viii) below
                    <ToolTips
                      text={
                        <div style={{ textAlign: "justify" }}>
                          A profoundly deaf person who is certified to be
                          suffering from a perceptive or mixed deafness with a
                          hearing loss of 85 decibels or more in the better ear
                          for pure tone frequencies of 500, 1 000 and 2 000
                          cycles per second, or 75 to 85 decibels with other
                          physical handicaps which include lack of speech and
                          distortion of hearing can also be eligible for NDA.
                          Applicants suffering from hearing impairment should be
                          assessed by ENT doctors of the designated specialist
                          clinics/hospitals under the Hospital Authority using a
                          different set of medical assessment form. A profoundly
                          deaf person who is certified by the ENT doctors of the
                          designated specialist clinics/hospitals is deemed to
                          be qualified for DA.
                        </div>
                      }
                      content={
                        <div>
                          <img
                            style={{
                              marginLeft: 2,
                              marginBottom: 5,
                              height: 15,
                              width: 12,
                              cursor: "help",
                            }}
                            src={require("@/assets/images/plussign.png")}
                            alt=""
                          />
                        </div>
                      }
                    />
                    :
                  </div>
                }
              />
            </div>

            <div style={{ paddingLeft: "20px" }}>
              <CheckBox
                text={
                  <Label symbol="(i)" text="loss of functions of two limbs" />
                }
                onClick={OptLossLimbChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.LOSS_LIMB
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={
                  <Label
                    symbol="(ii)"
                    text="loss of functions of both hands or of all fingers and both thumbs"
                  />
                }
                onClick={OptLossHandChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.LOSS_HAND
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={
                  <Label symbol="(iii)" text="loss of functions of both feet" />
                }
                onClick={OptLossFeetChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.LOSS_FEET
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={<Label symbol="(iv)" text="total loss of sight" />}
                onClick={OptLossSightChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.LOSS_SIGHT
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={
                  <Label symbol="(v)" text="total paralysis (quadriplegia)" />
                }
                onClick={OptLossParalysisChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.TOTAL_PARALYSIS
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={<Label symbol="(vi)" text="paraplegia" />}
                onClick={OptParaplegiaChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.PARAPLEGIA
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={
                  <Label
                    symbol="(vii)"
                    text="illness, injury or deformity resulting in being bedridden"
                  />
                }
                onClick={OptBedriddenChange}
                isChecked={
                  lossCond === AppConstant.DASS_MAF.LOSS_COND.BEDRIDDEN
                }
                disabled={disabled || isDisablePart2a}
              />

              <CheckBox
                text={
                  <Label
                    symbol="(viii)"
                    text="any other conditions including visceral diseases as specified below:"
                  />
                }
                onClick={OptOthCondChange}
                isChecked={lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER}
                disabled={disabled || isDisablePart2a}
              />

              <div style={{ paddingLeft: "60px" }}>
                <div className="row">
                  <div>The patient is suffering from </div> &nbsp;&nbsp;
                  <InputControl
                    value={othCondDesc}
                    style={{ width: "590px" }}
                    maxLength={80}
                    onChange={(event: any) =>
                      othCondDescChangeHander(event.target.value)
                    }
                    disabled={
                      disabled ||
                      isDisablePart2a ||
                      lossCond !== AppConstant.DASS_MAF.LOSS_COND.OTHER
                    }
                  />
                </div>
                <div style={{ textAlign: "justify", width: "800px" }}>
                  (a disabling physical or mental condition; including but not
                  limited to organic brain syndrome, intellectual disability,
                  psychosis, neurosis, personality disorder) which produces a
                  degree of disablement broadly equivalent to that in (i) to
                  (vii) above, that it is to say, the patient needs substantial
                  help from others to cope with daily life, i.e. the severe
                  disability produces significant restriction or lack of ability
                  or volition comparing to other persons of the same age to
                  perform <u>at least one or more</u> of the following
                  activities in daily living to the extent that substantial help
                  from others is required:
                </div>
                <div style={{ textAlign: "justify", width: "800px" }}>
                  (1) working in the original occupation and performing any
                  other kind of work for which he/she is suited (not applicable
                  for patient aged below 15 years)
                  <br /> (2) coping with self-care and personal hygiene such as
                  feeding, dressing, grooming, toileting and/or bathing
                  <br /> (3) maintaining one's posture and dynamic balance while
                  standing or sitting, for daily activities, managing indoor
                  transfer (bed/chair, floor/chair, toilet transfer), travelling
                  to clinic, school, place of work
                  <br /> (4) expressing oneself, communicating and interacting
                  with others, maintaining cognitive abilities (orientation,
                  attention, concentration, memory, judgment, thinking, learning
                  ability, etc.), maintaining emotional control and social
                  behaviour
                  <ToolTips
                    text={
                      <div style={{ textAlign: "justify" }}>
                        "maintaining emotional control and social behaviour" as
                        defined under the context of a medical diagnostic
                        system, such as the latest WHO "International
                        Statistical Classification of Diseases and Related
                        Health Problems".
                      </div>
                    }
                    content={
                      <div>
                        <img
                          style={{
                            marginLeft: 2,
                            marginBottom: 5,
                            height: 15,
                            width: 15,
                            cursor: "help",
                          }}
                          src={require("@/assets/images/atsign.png")}
                          alt=""
                        />
                      </div>
                    }
                  />
                  <br /> [please elaborate in Part (VII), if appropriate]
                </div>
              </div>
            </div>

            <div className="alignRight" style={{ height: "40px" }}>
              <Button
                text="Please proceed to Part (III)"
                style={{ width: "250px" }}
                onClick={GoToPart3}
                disabled={
                  isDisablePart2a ||
                  lossCond === undefined ||
                  lossCond === "" ||
                  (lossCond === AppConstant.DASS_MAF.LOSS_COND.OTHER &&
                    othCondDesc === "")
                }
              />
            </div>

            <div style={{ paddingLeft: "0px" }}>
              <div style={{ paddingTop: "20px" }}>
                <Label symbol="(b)" text="" />
              </div>

              <input className="focusRef" ref={inputPart2bRef} />

              <div style={{ paddingLeft: "20px" }}>
                <CheckBox
                  text={
                    <div>
                      <div className="row">
                        <div>The patient is suffering from </div> &nbsp;
                        <InputControl
                          value={notDisableDesc}
                          maxLength={70}
                          style={{ width: "600px" }}
                          onChange={(event: any) =>
                            notDisableDescChangeHander(event.target.value)
                          }
                          disabled={disabled || isDisablePart2b || !notDisable}
                        />{" "}
                        &nbsp;
                      </div>
                      (a disabling physical or mental condition) but the degree
                      of disability is NOT TO THE EXTENT OF (a) above and hence
                      not regarded as severely disabled.
                      <div className="row">
                        <div> (Remarks, if any) : </div> &nbsp;&nbsp;
                        <InputControl
                          value={notDisableRemark}
                          style={{ width: "580px" }}
                          maxLength={75}
                          onChange={(event: any) =>
                            notDisableRemarkChangeHander(event.target.value)
                          }
                          disabled={disabled || isDisablePart2b || !notDisable}
                        />
                      </div>
                    </div>
                  }
                  onClick={OptnotDisableChange}
                  isChecked={notDisable === 1}
                  disabled={disabled || isDisablePart2b}
                />
              </div>
            </div>

            <div className="alignRight" style={{ height: "40px" }}>
              <Button
                text="Please proceed to Part (VI)"
                style={{ width: "250px" }}
                onClick={GoToPart6}
                disabled={
                  isDisablePart2b || notDisable !== 1 || notDisableDesc === ""
                }
              />
            </div>
          </div>
        }
        IsExpand={showPart2}
        IsDisabled={disablePart2}
        onExpand={HideNViewPart2}
      />

      <input className="focusRef" ref={inputPart3Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(III)"
              text="Whether the patient requires constant attendance"
              style={{ color: "white" }}
            />
          </div>
        }
        SubHeader={
          <div style={{ marginLeft: "40px" }}>
            <Label
              text="[Note: For cases falling within Part (II)(a) above ]"
              style={{ color: "white" }}
            />
            <Label
              text={
                <div>
                  <i>
                    Patient certified to be in need of constant attendance will
                    be eligible for Higher Disablility Allowance which is twice
                  </i>
                </div>
              }
              style={{ color: "white" }}
            />
            <Label
              text={
                <div>
                  <i>that of the normal rate under the SSA Scheme.</i>
                </div>
              }
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div>
            <div style={{ paddingTop: "20px" }}>The patient is:</div>

            <div style={{ padding: "20px" }}>
              <CheckBox
                text={<div>Not in need of constant attendance</div>}
                onClick={OptWithoutConstAtted}
                isChecked={withConstAtted === 0}
                disabled={disabled || isDisablePart3}
              />

              <br />

              <CheckBox
                text={
                  <div>
                    In need of constant attendance: [please tick the appropriate
                    box(es) as below]
                    <br /> <b> IN ADDITION TO </b> suffering from severe
                    disability as assessed in Part (II)(a) of the Medical
                    Assessment Form,
                    <br /> <b> ALSO REQUIRES </b> from another person:
                  </div>
                }
                onClick={OptWithConstAtted}
                isChecked={withConstAtted === 1}
                disabled={disabled || isDisablePart3}
              />

              <div style={{ padding: "20px" }}>
                <div>For patient aged 15 years or above</div>

                <CheckBox
                  text={
                    <div
                      style={{
                        paddingLeft: "10px",
                        textAlign: "justify",
                        width: "800px",
                      }}
                    >
                      <b>FREQUENT ATTENTION</b> throughout the{" "}
                      <b>
                        DAY <u>AND</u> PROLONGED
                      </b>{" "}
                      or <b>REPEATED ATTENTION</b> during the <b>NIGHT</b> in
                      connection with *{" "}
                      {sex === "M" ? (
                        <>
                          his/<s>her</s>
                        </>
                      ) : sex === "F" ? (
                        <>
                          <s>his</s>/her
                        </>
                      ) : (
                        <>his/her</>
                      )}{" "}
                      bodily functions, e.g. totally bedridden, quadriplegia,
                      etc;
                    </div>
                  }
                  onClick={freqAttTypeFTChange}
                  isChecked={
                    freqAttType ===
                      AppConstant.DASS_MAF.FREQ_ATTENT.FREQUENT_ATTENTION &&
                    isAbove15 === 1
                  }
                  disabled={
                    disabled ||
                    isDisablePart3 ||
                    isAbove15 === 0 ||
                    withConstAtted !== 1
                  }
                />

                <div style={{ paddingLeft: "400px" }}>
                  <b> OR </b>
                </div>

                <CheckBox
                  text={
                    <div
                      style={{
                        paddingLeft: "10px",
                        textAlign: "justify",
                        width: "800px",
                      }}
                    >
                      <b>CONTINUAL SUPERVISION</b> in order to avoid endangering{" "}
                      {sex === "M" ? (
                        <>
                          himself/<s>herself</s>
                        </>
                      ) : sex === "F" ? (
                        <>
                          <s>himself</s>/herself
                        </>
                      ) : (
                        <>himself/herself</>
                      )}{" "}
                      or others, e.g. severely demented/intellectually disabled,
                      etc.
                    </div>
                  }
                  onClick={freqAttTypeCSChange}
                  isChecked={
                    freqAttType ===
                      AppConstant.DASS_MAF.FREQ_ATTENT.CONTINUAL_SUPERVISION &&
                    isAbove15 === 1
                  }
                  disabled={
                    disabled ||
                    isDisablePart3 ||
                    isAbove15 === 0 ||
                    withConstAtted !== 1
                  }
                />
              </div>

              <div style={{ padding: "20px" }}>
                <div>For patient aged below 15 years</div>

                <CheckBox
                  text={
                    <div
                      style={{
                        paddingLeft: "10px",
                        textAlign: "justify",
                        width: "800px",
                      }}
                    >
                      <b>SUBSTANTIALLY MORE FREQUENT ATTENTION</b> throughout
                      the
                      <b>
                        {" "}
                        DAY <u>AND</u> PROLONGED
                      </b>
                      or <b>REPEATED ATTENTION</b> during the <b>NIGHT</b> of
                      that normally required by a person of the same age in
                      connection with *{" "}
                      {sex === "M" ? (
                        <>
                          his/<s>her</s>
                        </>
                      ) : sex === "F" ? (
                        <>
                          <s>his</s>/her
                        </>
                      ) : (
                        <>his/her</>
                      )}{" "}
                      bodily functions, e.g. totally bedridden, quadriplegia,
                      etc.;
                    </div>
                  }
                  onClick={freqAttTypeFTChange}
                  isChecked={
                    freqAttType ===
                      AppConstant.DASS_MAF.FREQ_ATTENT.FREQUENT_ATTENTION &&
                    isAbove15 === 0
                  }
                  disabled={
                    disabled ||
                    isDisablePart3 ||
                    isAbove15 === 1 ||
                    withConstAtted !== 1
                  }
                />

                <div style={{ paddingLeft: "400px" }}>
                  <b> OR </b>
                </div>

                <CheckBox
                  text={
                    <div
                      style={{
                        paddingLeft: "10px",
                        textAlign: "justify",
                        width: "800px",
                      }}
                    >
                      <b>
                        CONTINUAL ATTENTION AND SUPERVISION SUBSTANTIALLY IN
                        EXCESS{" "}
                      </b>{" "}
                      of that normally required by a person of the same age in
                      order to avoid endangering *{" "}
                      {sex === "M" ? (
                        <>
                          himself/<s>herself</s>
                        </>
                      ) : sex === "F" ? (
                        <>
                          <s>himself</s>/herself
                        </>
                      ) : (
                        <>himself/herself</>
                      )}{" "}
                      or others, e.g. uncontrolled hyperactivity or
                      intellectually disabled etc.
                    </div>
                  }
                  onClick={freqAttTypeCSChange}
                  isChecked={
                    freqAttType ===
                      AppConstant.DASS_MAF.FREQ_ATTENT.CONTINUAL_SUPERVISION &&
                    isAbove15 === 0
                  }
                  disabled={
                    disabled ||
                    isDisablePart3 ||
                    isAbove15 === 1 ||
                    withConstAtted !== 1
                  }
                />
              </div>
            </div>

            <div className="alignRight" style={{ height: "40px", display: "" }}>
              <Button
                text="Please proceed to Part (IV)"
                style={{ width: "250px" }}
                onClick={GoToPart4}
                disabled={
                  isDisablePart3 ||
                  withConstAtted === null ||
                  withConstAtted === -1 ||
                  (withConstAtted === 1 && freqAttType === "")
                }
              />
            </div>
          </div>
        }
        IsExpand={showPart3}
        IsDisabled={disablePart3 || isDisablePart3}
        onExpand={HideNViewPart3}
      />

      <input className="focusRef" ref={inputPart4Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(IV)"
              text="Duration of disabling condition"
              style={{ color: "white" }}
            />
          </div>
        }
        SubHeader={
          <div style={{ marginLeft: "40px" }}>
            <Label
              text="[Note: For cases falling within Part (II)(a) and (III) above]"
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div>
            <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
              <div>
                The disability resulting from the condition specified in Part
                (II) (a) and (III) is likely to last from *the date of
                application/the date
              </div>
              <div className="row">
                <div>
                  {" "}
                  after the expiry date of last certification, which is{" "}
                </div>{" "}
                &nbsp;&nbsp;
                <InputControl
                  value={appDate}
                  style={{ width: "120px" }}
                  disabled={true}
                />{" "}
                &nbsp;&nbsp;
                <div> (date to be filled by SSFU or MSSU) for: </div>
              </div>
            </div>

            <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
              <div className="row">
                <div style={{ width: "40%" }}>
                  <CheckBox
                    text={
                      <div>
                        <div className="row">
                          <div> less than 6 months </div>
                          <div style={{ width: "5px" }} />
                          <InputControl
                            value={
                              disabledDuration ===
                                AppConstant.DASS_MAF.DISABLED_DURATION
                                  .LESS_THAN_SIX_MONTH &&
                              disabledDurationDesc !== -1
                                ? disabledDurationDesc
                                : ""
                            }
                            style={{ width: "50px" }}
                            maxLength={2}
                            onChange={(event: any) => {
                              disabledDurationDescChangeHander(
                                event.target.value.replace(/[^0-9]/g, "")
                              );
                            }}
                            disabled={
                              disabled ||
                              disabledDuration !==
                                AppConstant.DASS_MAF.DISABLED_DURATION
                                  .LESS_THAN_SIX_MONTH
                            }
                          />
                          <div style={{ width: "5px" }} />
                          <div>
                            (see
                            <ToolTips
                              text={
                                <div style={{ textAlign: "justify" }}>
                                  For a new application, the patient will not be
                                  qualified for DA if his/her disablement
                                  specified in Part (II) (a) and (III) is
                                  expected to last for less than 6 months.
                                </div>
                              }
                              content={
                                <div>
                                  <img
                                    style={{
                                      marginLeft: 2,
                                      marginBottom: 5,
                                      height: 15,
                                      width: 12,
                                      cursor: "help",
                                    }}
                                    src={require("@/assets/images/numbersign.png")}
                                    alt=""
                                  />
                                </div>
                              }
                            />
                            ){" "}
                          </div>
                        </div>
                        <div style={{ paddingLeft: "100px" }}>
                          <i>(specify number of months)</i>{" "}
                        </div>
                      </div>
                    }
                    onClick={disabledDuration0T6MChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.LESS_THAN_SIX_MONTH
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>

                <div style={{ width: "60%" }}>
                  <CheckBox
                    text={<div>over 2 years - up to 3 years</div>}
                    onClick={disabledDuration2TO3YChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.TWO_TO_THREE_YR
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>
              </div>

              <div className="row">
                <div style={{ width: "40%" }}>
                  <CheckBox
                    text={<div>6 months</div>}
                    onClick={disabledDuration6MChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.SIX_MONTH
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>

                <div style={{ width: "60%" }}>
                  <CheckBox
                    text={
                      <div>
                        <div className="row">
                          <div style={{ width: "140px" }}>
                            {" "}
                            from 3 years to{" "}
                          </div>
                          <div style={{ width: "5px" }} />
                          <InputControl
                            value={
                              disabledDuration ===
                                AppConstant.DASS_MAF.DISABLED_DURATION
                                  .FROM_THREE_YR_TO &&
                              disabledDurationDesc !== -1
                                ? disabledDurationDesc
                                : ""
                            }
                            maxLength={2}
                            style={{ width: "50px" }}
                            onChange={(event: any) => {
                              disabledDurationDescChangeHander(
                                event.target.value.replace(/[^0-9]/g, "")
                              );
                            }}
                            disabled={
                              disabled ||
                              disabledDuration !==
                                AppConstant.DASS_MAF.DISABLED_DURATION
                                  .FROM_THREE_YR_TO
                            }
                          />
                          <div style={{ width: "5px" }} />
                          <div> years (specify) </div>
                        </div>
                      </div>
                    }
                    onClick={disabledDurationFR3YTOChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.FROM_THREE_YR_TO
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>
              </div>

              <div className="row">
                <div style={{ width: "40%" }}>
                  <CheckBox
                    text={<div>over 6 - 12 months</div>}
                    onClick={disabledDuration6TO12MChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.SIX_TO_TWELVE_MONTH
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>

                <div style={{ width: "60%" }}>
                  <CheckBox
                    text={
                      <div>
                        <div className="row">
                          <div style={{ width: "140px" }}>
                            {" "}
                            up to and including{" "}
                          </div>
                          <div style={{ width: "5px" }} />
                          <InputControl
                            value={
                              disabledDuration ===
                                AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO &&
                              disabledDurationDesc !== -1
                                ? disabledDurationDesc
                                : ""
                            }
                            maxLength={2}
                            style={{ width: "50px" }}
                            onChange={(event: any) => {
                              disabledDurationDescChangeHander(
                                event.target.value.replace(/[^0-9]/g, "")
                              );
                            }}
                            disabled={
                              disabled ||
                              (
                                disabledDuration !==
                                AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO
                              )
                            }
                          />
                          <div style={{ width: "5px" }} />
                          <div>
                            {" "}
                            years old (specify for child assessment service){" "}
                          </div>
                        </div>
                      </div>
                    }
                    onClick={disabledDurationUPTOChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.UP_TO
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>
              </div>

              <div className="row">
                <div style={{ width: "40%" }}>
                  <CheckBox
                    text={<div>over 1 year - up to 2 years</div>}
                    onClick={disabledDuration1TO2YChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.ONE_TO_TWO_YR
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>

                <div style={{ width: "60%" }}>
                  <CheckBox
                    text={<div>permanently</div>}
                    onClick={disabledDurationPERMChange}
                    isChecked={
                      disabledDuration ===
                      AppConstant.DASS_MAF.DISABLED_DURATION.PERMANENTLY
                    }
                    disabled={disabled || isDisablePart4}
                  />
                </div>
              </div>
            </div>
          </div>
        }
        IsExpand={showPart4}
        IsDisabled={disablePart4 || isDisablePart4}
        onExpand={HideNViewPart4}
      />

      <input className="focusRef" ref={inputPart5Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(V)"
              text="Assessment for fitness for marking a statement in relation to the application of SSA Scheme"
              style={{ color: "white" }}
            />
          </div>
        }
        SubHeader={
          <div style={{ marginLeft: "40px" }}>
            <Label
              text={
                <div>
                  (applicable for applicant aged 18 or above ONLY)
                  <ToolTips
                    text={
                      <div style={{ textAlign: "justify" }}>
                        Staff of Medical Social Services Unit (MSSU) or Social
                        Security Field Unit (SSFU) should cross out this part
                        [i.e. Part (V)] if the applicant aged under 18. Upon an
                        applicant reaches the age of 18 or when further
                        assessment on his/her mental fitness in making statement
                        before expiry of last MAF is deemed necessary, please
                        cross out the other parts of this MAF and leave only
                        this part blank [i.e. Part (V)] for doctor to determine
                        whether the applicant could receive DA payment on
                        his/her own or an appointee should be appointed to act
                        on behalf of the applicant to receive DA payment.
                      </div>
                    }
                    content={
                      <div>
                        <img
                          style={{
                            marginLeft: 2,
                            marginBottom: 5,
                            height: 15,
                            width: 12,
                            cursor: "help",
                          }}
                          src={require("@/assets/images/infinitysign.png")}
                          alt=""
                        />
                      </div>
                    }
                  />
                </div>
              }
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div style={{ padding: "20px" }}>
            <div className="row">
              <div style={{ width: "50%" }}>
                <CheckBox
                  text={
                    <div>
                      The patient is mentally{" "}
                      <u>
                        <b>fit</b>
                      </u>{" "}
                      for making a statement
                    </div>
                  }
                  onClick={mentalFitYChange}
                  isChecked={mentalFit === 1}
                  disabled={disabled || isDisablePart5}
                />
              </div>

              <div style={{ width: "50%" }}>
                <CheckBox
                  text={
                    <div>
                      The patient is mentally{" "}
                      <u>
                        <b>unfit</b>
                      </u>{" "}
                      for making a statement
                    </div>
                  }
                  onClick={mentalFitNChange}
                  isChecked={mentalFit === 0}
                  disabled={disabled || isDisablePart5}
                />
              </div>
            </div>
          </div>
        }
        IsExpand={showPart5}
        IsDisabled={disablePart5 || isDisablePart5}
        onExpand={HideNViewPart5}
      />

      <input className="focusRef" ref={inputPart6Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(VI)"
              text="Recommendation (tick one item only)"
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div style={{ padding: "20px" }}>
            <CheckBox
              text={
                <div>
                  <Label
                    text={
                      <div>
                        The patient does{" "}
                        <b>
                          <u>not</u>
                        </b>{" "}
                        meet the eligibility criteria of Disability Allowance
                        (DA) because:
                      </div>
                    }
                  />
                  <Label
                    symbol="(i)"
                    text={
                      <div>
                        *{" "}
                        {sex === "M" ? (
                          <>
                            his/<s>her</s>
                          </>
                        ) : sex === "F" ? (
                          <>
                            <s>his</s>/her
                          </>
                        ) : (
                          <>his/her</>
                        )}{" "}
                        degree of disablement is not equivalent to severely
                        disabled within the meaning of the DA, or
                      </div>
                    }
                  />
                  <Label
                    symbol="(ii)"
                    text={
                      <div>
                        *{" "}
                        {sex === "M" ? (
                          <>
                            his/<s>her</s>
                          </>
                        ) : sex === "F" ? (
                          <>
                            <s>his</s>/her
                          </>
                        ) : (
                          <>his/her</>
                        )}{" "}
                        disablement specified in Part (II)(a) is expected to
                        last for less than 6 months (applicable to new cases
                        only).
                      </div>
                    }
                  />
                </div>
              }
              onClick={recoResultNChange}
              isChecked={
                recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NOT_RECOMMEN
              }
              disabled={disabled || isDisablePart6 || isDisableNotMeet}
            />

            <br />

            <CheckBox
              text={
                <div>
                  <Label
                    text={
                      <div style={{ paddingLeft: "10px" }}>
                        The patient meets the eligibility criteria of{" "}
                        <b>Normal Disability Allowance</b> [see Part (II)(a)]
                        but not Higher Disability Allowance. [For conditions of
                        eligibility for Higher Disability Allowance, please
                        refer to Part (III)]
                      </div>
                    }
                  />
                </div>
              }
              onClick={recoResultPChange}
              isChecked={recoResult === AppConstant.DASS_MAF.RECOMMENDATION.NDA}
              disabled={disabled || isDisablePart6 || isDisableNDA}
            />

            <br />

            <CheckBox
              text={
                <div>
                  <Label
                    text={
                      <div style={{ paddingLeft: "10px" }}>
                        The patient meets the eligibility criteria of{" "}
                        <b>Higher Disability Allowance</b> {"{"} i.e. meeting
                        the criteria for Normal Disability Allowance [see Part
                        (II)(a)]{" "}
                        <b>
                          <u>and</u>
                        </b>{" "}
                        additional conditions for Higher Disability Allowance
                        [see Part (III)]{"}"}
                      </div>
                    }
                  />
                  <Label text="" />
                </div>
              }
              onClick={recoResultYChange}
              isChecked={recoResult === AppConstant.DASS_MAF.RECOMMENDATION.HDA}
              disabled={disabled || isDisablePart6 || isDisableHDA}
            />
          </div>
        }
        IsExpand={showPart6}
        IsDisabled={disablePart6 || isDisablePart6}
        onExpand={HideNViewPart6}
      />

      <input className="focusRef" ref={inputPart7Ref} />

      <Panel
        Header={
          <div>
            <Label
              symbol="(VII)"
              text="Change of assessment result compared to the last assessment and any other comments"
              style={{ color: "white" }}
            />
          </div>
        }
        SubHeader={
          <div style={{ marginLeft: "40px" }}>
            <Label
              text="[Note: To help other doctors assess the patient in future, please put down some physical findings and supportive"
              style={{ color: "white" }}
            />
            <Label
              text="evidence for assessment, where appropriate.]"
              style={{ color: "white" }}
            />
          </div>
        }
        Content={
          <div>
            <div style={{ paddingTop: "20px" }}>
              <Label symbol="(a)" text="Change of assessment result" />
            </div>

            <div style={{ padding: "20px" }}>
              <CheckBox
                text={
                  <div
                    style={{
                      paddingLeft: "10px",
                      textAlign: "justify",
                      width: "900px",
                    }}
                  >
                    <Label
                      text={
                        <div>
                          <b>
                            Change from permanent Normal Disability Allowance to
                            non-permanent Higher Disability Allowance
                          </b>
                          , but condition and the higher care level is subject
                          to review.
                        </div>
                      }
                    />
                  </div>
                }
                onClick={daChangeCChange}
                isChecked={
                  daChange === AppConstant.DASS_MAF.CHG_AX_RESULT.NDA2HDA
                }
                disabled={disabled || isDisablePart7a}
              />

              <br />

              <CheckBox
                text={
                  <div
                    style={{
                      paddingLeft: "10px",
                      textAlign: "justify",
                      width: "900px",
                    }}
                  >
                    <Label text="Other changes of assessment (e.g. duration of disabling condition, from Higher Disability Allowance to Normal Disability Allowance). Please specify reason:" />
                  </div>
                }
                onClick={daChangeOChange}
                isChecked={daChange === AppConstant.DASS_MAF.CHG_AX_RESULT.OTH}
                disabled={disabled || isDisablePart7a}
              />

              <div style={{ paddingLeft: "20px" }}>
                <InputControl
                  type={"textarea"}
                  value={othChangeReason}
                  maxLength={300}
                  style={{ height: "80px", width: "800px" }}
                  onChange={(event: any) =>
                    othChangeReasonChangeHander(event.target.value)
                  }
                  disabled={
                    disabled ||
                    daChange !== AppConstant.DASS_MAF.CHG_AX_RESULT.OTH ||
                    isDisablePart7a
                  }
                />
              </div>
            </div>

            <div>
              <Label symbol="(b)" text="Any other comments:" />
            </div>

            <div style={{ padding: "20px" }}>
              <div style={{ paddingLeft: "20px" }}>
                <InputControl
                  type={"textarea"}
                  value={othComment}
                  maxLength={340}
                  style={{ height: "80px", width: "800px" }}
                  onChange={(event: any) =>
                    othCommentChangeHander(event.target.value)
                  }
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        }
        IsExpand={showPart7}
        IsDisabled={disablePart7}
        onExpand={HideNViewPart7}
      />

      <DassCommon ref={DassCommonRef} mdHeight={800} mdWidth={620} />
    </div>
  );
});

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(DAMAF);
