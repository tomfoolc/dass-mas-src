import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import { ThemeProvider } from "@mui/material/styles";
import {
  theme,
  styledInputRoot,
  styledDisableInputRoot,
  styledInput,
  styledFocus,
  styledSvg,
  styledLabel,
} from "../common/MuiTheme";

import Constant from "@/constant/Constant";
import Box from "@mui/material/Box";

interface DatePickerProps {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
  disabled?: boolean;
  width?: number;
}

export default function DatePicker(props: DatePickerProps) {
  
  const { width = 160, disabled = false } = props;

  const [value, setValue] = React.useState<Date | null>(props.value);

  const handleChange = (newValue: any) => {
    try {
      setValue(newValue);
      props.onChange(newValue);
    } catch (error) {}
  };

  let renderHtml = null;

  renderHtml = (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ border: 0 }} style={{ width: width, padding: "0px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              minDate={props.minDate}
              maxDate={props.maxDate}
              label=""
              inputFormat={Constant.Date.dateDisplayformat}
              value={value}
              onChange={(val) => {
                handleChange(val);
              }}
              disabled={disabled}
              disableMaskedInput={true}
              //disableFuture={true}
              renderInput={(params) =>
                disabled ? (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    margin="none"
                    sx={{
                      border: "none",
                      "& fieldset": { border: "none" },
                      ".MuiInputBase-root": { ...styledDisableInputRoot },
                      svg: { ...styledSvg },
                      input: { ...styledInput },
                      focus: { ...styledFocus },
                      hover: { ...styledFocus },
                      label: { ...styledLabel },
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },                       
                    }}
                  />
                ) : (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    margin="none"
                    sx={{
                      border: "none",
                      "& fieldset": { border: "none" },
                      ".MuiInputBase-root": { ...styledInputRoot },
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                      svg: { ...styledSvg },
                      input: { ...styledInput },
                      focus: { ...styledFocus },
                      hover: { ...styledFocus },
                      label: { ...styledLabel },
                    }}
                  />
                )
              }
            />
          </LocalizationProvider>
        </Box>
      </ThemeProvider>
    </div>
  );

  return renderHtml;
}
