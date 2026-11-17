import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { ThemeProvider } from "@mui/material/styles";
import {
  theme,
  styledSelectRoot,
  styledDisableSelectRoot,
  styledSvg,
  styledDiv,
  styledInput,
  styledFocus,
  styledLabel,
} from "../common/MuiTheme";

import { IOptionItem } from '@/interface';

interface MultipleCheckboxSelectProps {
  value: IOptionItem[];
  optList: IOptionItem[];
  onChange: (opts: IOptionItem[]) => void;
  width?: number;
  disabled?: boolean;
}

export default function MultipleSelectCheckmarks(props: MultipleCheckboxSelectProps) {

  const { value=[], optList, onChange, width = 250, disabled = false } = props;

  const cssStyles = {

    container: {
      display: "flex",
      paddingTop: "0px",
    },

  }

  const handleChange = (event: any) => {

    const {
      target: { value },
    } = event;

    let duplicateRemoved: any = [];

    value.forEach((item: any) => {
      if (duplicateRemoved.findIndex((o: any) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x: any) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    onChange(duplicateRemoved);
  };

  return (
    <div>
      <div style={{ ...cssStyles.container }}>
        <ThemeProvider theme={theme}>
          <FormControl style={{ width: width, padding: "0px" }}>
            <Select
              labelId="checkboxlist"
              id="checkboxlist"
              multiple
              value={value}
              onChange={handleChange}
              disabled={disabled}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.map((x: any) => x.displayText).join(', ')}
              sx={{
                border: "none",
                "& fieldset": { border: "none" },
                ".MuiSelect-select": disabled ? { ...styledDisableSelectRoot } : { ...styledSelectRoot },
                "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000", }, 
                svg: { ...styledSvg },
                div: { ...styledDiv },
                input: { ...styledInput },
                focus: { ...styledFocus },
                hover: { ...styledFocus },
                label: { ...styledLabel },
              }}
            >
              {optList.map((variant: any) => (
                <MenuItem key={variant.id} value={variant} >
                  <Checkbox
                    style={{ height: "20px" }}
                    checked={
                      value.findIndex((item: any) => item.id === variant.id) >= 0
                    }
                  />
                  <ListItemText primary={variant.displayText} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
}
