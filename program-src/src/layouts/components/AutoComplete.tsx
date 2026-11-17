import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";

import {
  theme,
  styledInput,
  styledFocus,
  styledSvg,
  styledDisableSvg,
  styledLabel,
  styledInputRoot,
  styledDisableInputRoot,
} from "../common/MuiTheme";
import { Autocomplete, TextField } from "@mui/material";

import { IOptionItem } from "@/interface";

interface AutoCompleteProps {
  value?: {};
  optList: any[];
  onChange: (opt: IOptionItem) => void;
  width?: number;
  disabled?: boolean;
}

export default function AutoComplete(props: AutoCompleteProps) {

  const { value, optList = [], onChange, width = 250, disabled = false } = props;

  const cssStyles = {

    container: {
      display: "flex",
      paddingTop: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
    },

  }

  const handleChange = (event: any, item: any) => {
    onChange(item);
  };

  let renderHtml = null;

  renderHtml = (
    <div style={{ ...cssStyles.container }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ border: 0 }} style={{ width: width }}>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              value={value}
              id="autocomplete"
              options={optList}
              isOptionEqualToValue={(option, item) =>
                option.value || "" === item.value || ""
              }
              onChange={handleChange}
              disabled={disabled}
              getOptionLabel={(item) =>
                item.displayText ? item.displayText : ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="none"
                  variant="standard"
                  size="small"
                  sx={{
                    border: "none",
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": disabled ? { ...styledDisableInputRoot } : { ...styledInputRoot, ...{ paddingLeft : "4px"} },
                    "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000", },
                    svg: disabled ? { ...styledSvg, ...styledDisableSvg }: { ...styledSvg },
                    input: { ...styledInput },
                    focus: { ...styledFocus },
                    hover: { ...styledFocus },
                    label: { ...styledLabel },
                  }}
                />
              )}
              renderOption={(props: object, option: any, state: object) => (
                <div {...props} style={{ fontSize: "13px" }}>
                  {option.displayText}
                </div>
              )}
            />
          </FormControl>
        </Box>
      </ThemeProvider>
    </div>
  );

  return renderHtml;
}
