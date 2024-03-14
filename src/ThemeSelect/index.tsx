import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { invoke } from "@tauri-apps/api/tauri";
import { DEFAULT_THEME_ID } from "../constants.ts";

type ThemeOption = {
  id: string;
  name: string;
};

type ThemeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ThemeSelect({ value, onChange }: ThemeSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const [themeOptions, setThemeOptions] = useState<ThemeOption[]>([]);
  useEffect(() => {
    invoke<ThemeOption[]>("get_theme_options").then(setThemeOptions);
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={value}
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={DEFAULT_THEME_ID}>Default</MenuItem>
          {themeOptions.map((option) => (
            <MenuItem value={option.id} key={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
