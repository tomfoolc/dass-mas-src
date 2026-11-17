import { createTheme } from "@mui/material";
import AppConstant from "@/constant/AppConstant";

export const colorCode = {
  highlight: "rgba(45, 45, 255, 1)",
  app_status_NC: AppConstant.DASS_STATUS_CODE.NEWLY_CREATED.COLORCODE,
  app_status_NF: AppConstant.DASS_STATUS_CODE.SAVED_MAF.COLORCODE,
  app_status_PE: AppConstant.DASS_STATUS_CODE.PENDING_CLINICAL_REVIEW.COLORCODE,
  app_status_RE: AppConstant.DASS_STATUS_CODE.REVIEWING_MAF.COLORCODE,
  app_status_CO: AppConstant.DASS_STATUS_CODE.COMPLETED_MAF.COLORCODE,
  app_status_CL: AppConstant.DASS_STATUS_CODE.CLOSED.COLORCODE,
  app_status_CA: AppConstant.DASS_STATUS_CODE.CANCELLED.COLORCODE,
  app_status_VO: AppConstant.DASS_STATUS_CODE.VOIDED.COLORCODE,
};

export const datagridTheme = createTheme({
  components: {
    //@ts-ignore - this isn't in the TS because DataGird is not exported from `@mui/material`
    MuiDataGrid: {
      styleOverrides: {
        column: {
          "&.statusNF": {
            borderLeft: "100px solid " + colorCode.app_status_NF,
          },
        },
        row: {
          "&.Mui-selected": {
            backgroundColor: colorCode.highlight,
            color: "white",
            "&:hover": {
              backgroundColor: colorCode.highlight,
              color: "white",
            },
          },
        },
      },
    },
  },
});
