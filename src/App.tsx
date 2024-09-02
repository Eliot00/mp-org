import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Preview from "./Preview";
import Stack from "@mui/material/Stack";
import ThemeSelect from "./ThemeSelect";
import { DEFAULT_THEME_ID } from "./constants";
import { defaultTheme } from "./assets/theme";
import { convertLocalImageLink } from "./utils/image";
import { setThemeById } from "./utils/theme";

function App() {
  const [value, setValue] = useState("");
  console.log(value.length);
  console.log(value.startsWith("​="));

  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    if (themeId === DEFAULT_THEME_ID) {
      setTheme(defaultTheme);
    } else {
      setThemeById(themeId, setTheme);
    }
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid xs={12}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={async () => {
              const newValue = await convertLocalImageLink(value);
              setValue(newValue);
            }}
          >
            上传本地图片
          </Button>
          <ThemeSelect value={themeId} onChange={setThemeId} />
          <Button
            variant="contained"
            onClick={async (e) => {
              e.preventDefault();

              const htmlStr = document.getElementById("org-output")?.innerHTML;
              if (htmlStr) {
                const type = "text/html";
                const blob = new Blob([htmlStr], { type });
                const data = [new ClipboardItem({ [type]: blob })];
                navigator.clipboard.write(data);
              }
            }}
          >
            Copy
          </Button>
        </Stack>
      </Grid>
      <Grid xs={6} sx={{ height: "calc(100vh - 54px)" }}>
        <CodeMirror
          height="100%"
          style={{ height: "100%" }}
          value={value}
          onChange={setValue}
        />
      </Grid>
      <Grid xs={6} sx={{ height: "calc(100vh - 54px)" }}>
        <Preview org={value} theme={theme} />
      </Grid>
    </Grid>
  );
}

export default App;
