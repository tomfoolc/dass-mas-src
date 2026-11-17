const AppConstant = {

  APP_CLUSTER_CODE: [
    ["ALL", "ALL"],
    ["HKE", "HKE"],
    ["HKW", "HKW"],
    //["KCC", "KCC"],
    //["KEC", "KEC"],
    ["KWC", "KWC"],
    //["NTE", "NTE"],
    ["NTW", "NTW"],
  ],  

  APP_CLUSTER_CODE_OPTLIST: [ 
    { id: "ALL", displayText: "ALL", value: "ALL"}, 
    { id: "HKE", displayText: "HKE", value: "HKE"},
    { id: "HKW", displayText: "HKW", value: "HKW"},
    { id: "KCC", displayText: "KCC", value: "KCC"},
    { id: "KEC", displayText: "KEC", value: "KEC"},
    { id: "KWC", displayText: "KWC", value: "KWC"},
    { id: "NTE", displayText: "NTE", value: "NTE"},
    { id: "NTW", displayText: "NTW", value: "NTW"},
  ],   

  APP_UNIT_TYPE_OPTLIST: [ 
    { id: "ALL", displayText: "ALL", value: "ALL", cluster : "ALL", hospital : "ALL"  },
    { id: "MSSU", displayText: "MSSU", value: "MSSU", cluster : "ALL", hospital : "ALL" }, 
    { id: "SPECIALTY", displayText: "SPECIALTY", value: "SPECIALTY", cluster : "ALL", hospital : "ALL" }, 
    { id: "WARD", displayText: "WARD", value: "WARD", cluster : "ALL", hospital : "ALL" }, 
  ],

  APP_STATUS_OPTLIST: [ 
    { id: "ALL", displayText: "ALL", value: "ALL"},
    { id: "SAVED_MAF", displayText: "Saved DA MAF", value: "SAVED_MAF"}, 
    { id: "PEND_C_REVIEW", displayText: "Pending Clinical Review", value: "PEND_C_REVIEW"},
    { id: "REVIEW_MAF", displayText: "Reviewing DA MAF", value: "REVIEW_MAF"},
    { id: "COMPLETED_MAF", displayText: "Completed DA MAF", value: "COMPLETED_MAF"},
    { id: "CLOSED", displayText: "Closed", value: "CLOSED"},
    { id: "CANCELLED", displayText: "Cancelled", value: "CANCELLED"},
  ],     

  APP_OVERDUE_DAYS: 28,
  APP_ADDR_LENGTH : 280,
  APP_REMARK_LENGTH : 400,
  DASS_SYSTEM_LAUNCH_DATE : "2024-03-18",

  DASS_DOC_TYPE: {
    HKIC: "I",
    HKBC: "B",
  },

  DASS_HOSPITAL_TYPE: {
    HOSPITAL: "H",
    CLINIC: "C",
  },

  DASS_UNIT_TYPE: {
    SPEC: "SPEC",
    WARD: "WARD",
    MSSU: "MSSU",
  },

  DASS_TYPE: {
    NEW_FROM_MSSU: "N",
    REFER_FROM_SWD: "R",
  },

  DASS_APP_TYPE: {
    NEW: "NEW",
    NDA: "NDA",
    HDA: "HDA",
  },

  DASS_APP: {
    TREAT_SPEC_TYPE: {
      SPECIALTY: "S",
      WARD: "W",
    },
  },

  DASS_STATUS_CODE: {
    NEWLY_CREATED: {
      CODE: "NEWLY_CREATE",
      DESC: "Newly created",
      SEQ: 10,
      COLORCODE: "rgba(255, 255, 255, 1)",
    },

    SAVED_MAF: {
      CODE: "SAVED_MAF",
      DESC: "Saved DA MAF",
      SEQ: 20,
      COLORCODE: "rgba(158, 158, 158, 1)",
    },

    PENDING_CLINICAL_REVIEW: {
      CODE: "PEND_C_REVIEW",
      DESC: "Pending Clinical Review",
      SEQ: 30,
      COLORCODE: "rgba(251, 172, 188, 1)",
    },

    REVIEWING_MAF: {
      CODE: "REVIEW_MAF",
      DESC: "Reviewing DA MAF",
      SEQ: 40,
      COLORCODE: "rgba(151, 185, 255, 1)",
    },

    COMPLETED_MAF: {
      CODE: "COMPLETED_MAF",
      DESC: "Completed DA MAF",
      SEQ: 50,
      COLORCODE: "rgb(0, 162, 232, 1)",
    },

    CLOSED: {
      CODE: "CLOSED",
      DESC: "Closed",
      SEQ: 60,
      COLORCODE: "rgb(114, 91, 117, 1)",
    },

    CANCELLED: {
      CODE: "CANCELLED",
      DESC: "Cancelled",
      SEQ: 99,
      COLORCODE: "red",
    },

    VOIDED: {
      CODE: "VOIDED",
      DESC: "Voided",
      SEQ: 99,
      COLORCODE: "red",
    },

    SIGNED: {
      CODE: "SIGNED",
      DESC: "Signed",
      SEQ: 99,
      COLORCODE: "red",
    },

    UNSIGNED: {
      CODE: "UNSIGNED",
      DESC: "Unsigned",
      SEQ: 99,
      COLORCODE: "red",
    },

    PHYSICALLY_SIGNED: {
      CODE: "PHYSICALLY_SIGNED",
      DESC: "Physically signed",
      SEQ: 99,
      COLORCODE: "red",
    },        
  },

  DASS_MAF: {
    LOSS_COND: {
      LOSS_LIMB: "LOSS_LIMB",
      LOSS_HAND: "LOSS_HAND",
      LOSS_FEET: "LOSS_FEET",
      LOSS_SIGHT: "LOSS_SIGHT",
      TOTAL_PARALYSIS: "TOTAL_PARALYSIS",
      PARAPLEGIA: "PARAPLEGIA",
      BEDRIDDEN: "BEDRIDDEN",
      OTHER: "OTHER",
    },

    FREQ_ATTENT: {
      FREQUENT_ATTENTION: "FT",
      CONTINUAL_SUPERVISION: "CS",
    },

    DISABLED_DURATION: {
      LESS_THAN_SIX_MONTH: "0TO6M",
      SIX_MONTH: "6M",
      SIX_TO_TWELVE_MONTH: "6TO12M",
      ONE_TO_TWO_YR: "1TO2Y",
      TWO_TO_THREE_YR: "2TO3Y",
      FROM_THREE_YR_TO: "FR3YTO",
      UP_TO: "UPTO",
      PERMANENTLY: "PERM",
    },

    RECOMMENDATION: {
      NOT_RECOMMEN: "NO",
      NDA: "NDA",
      HDA: "HDA",
    },

    CHG_AX_RESULT: {
      NDA2HDA: "NDA2HDA",
      OTH: "OTH",
    },
  },
};

export default AppConstant;
