import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ThemeProvider } from "@mui/material/styles";
import {
  theme,
  styledSelectRoot,
  styledDisableSelectRoot,
  styledDiv,
  styledInput,
  styledFocus,
  styledSvg,
  styledDisableSvg,
  styledLabel,
} from "../common/MuiTheme";

interface DropdownListProps {
  id?: string;
  value: string;
  list: string[][];
  onSelect: (value: string) => void;
  width?: number;
  disabled?: boolean;
}

export default function DropdownList(props: DropdownListProps) {
  const { id = "ddl", value, list = [], onSelect, width = 160, disabled = false } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value);
  };

  let renderHtml = null;

  renderHtml = (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ border: 0 }} style={{ width: width, padding: "0px" }}>
          <FormControl fullWidth>
            <Select
              id={id}
              key={value}
              value={value}
              label="Age"
              onChange={handleChange}
              disabled={disabled}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  { border: 0 },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { border: 0 },
                "& legend": { display: "none" },
                "& fieldset": { top: 0, outline: "none" },
                ".MuiSelect-select": disabled ? { ...styledDisableSelectRoot } : { ...styledSelectRoot },
                "& .MuiSvgIcon-root": {
                  right: "1px",
                },                
                svg: disabled ? { ...styledSvg, ...styledDisableSvg }: { ...styledSvg },
                div: { ...styledDiv },
                input: { ...styledInput },
                focus: { ...styledFocus },
                hover: { ...styledFocus },
                label: { ...styledLabel },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              inputProps={{ MenuProps: { disableScrollLock: true } }}
            >
              {list.map((item) => (
                <MenuItem key={item[1]} value={item[1]}>
                  {item[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </ThemeProvider>
    </div>
  );

  return renderHtml;
}
