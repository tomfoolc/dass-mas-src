import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `Verdana, Tahoma, sans-serif`,
    fontSize: 13,
  },
  palette: {
    text: {
      primary: "",
    },
  },
  spacing: 0,
});

export const styledInputRoot = {
  border: "1px solid gray",
  backgroundColor: "white",
  paddingLeft: "2px",
  paddingRight: "2px",
  height: "25px",
  borderRadius: "5px",
};

export const styledDisableInputRoot = {
  fontSize: 13,
  border: "1px solid gray",
  backgroundColor: "rgb(217, 221, 227)",
  paddingLeft: "2px",
  paddingRight: "2px",
  height: "25px",
  borderRadius: "5px",
};

export const styledACInputRoot = {
  fontSize: 13,
  border: "1px solid gray",
  backgroundColor: "white",
  paddingLeft: "2px",
  paddingRight: "2px",
  borderRadius: "5px",
};

export const styledInput = {
  fontSize: 13,
  color: "black",
  padding: "5px",
};

export const styledSelectRoot = {
  fontSize: 13,
  border: "1px solid gray",
  backgroundColor: "white",
  padding: "2px",
  paddingLeft: "4px",
  margin: "0px",
  outline: "none",
};

export const styledDisableSelectRoot = {
  fontSize: 13,
  border: "1px solid gray",
  backgroundColor: "rgb(217, 221, 227)",
  padding: "2px",
  paddingLeft: "4px",
  margin: "0px",
  outline: "none",
};

export const styledDiv = {
  color: "black",
  padding: "5px",
};

export const styledFocus = {
  color: "black",
};

export const styledSvg = {
  color: "black",
  padding: "0px",
  height: "20px",
  width: "33px",
};

export const styledDisableSvg = {
  color: "gray",
};

export const styledLabel = {};
