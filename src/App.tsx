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
import { insertZeroWidthSpaces } from "./utils/spaces";
import { Tooltip } from "@mui/material";

function App() {
  const [value, setValue] = useState("");

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
          <Tooltip title="orgmode中行内样式（如加粗）标记前后需要空格，按此键可为没加空格的标记自动添加零宽空格">
            <Button onClick={() => setValue(insertZeroWidthSpaces)}>
              自动补全零宽空格
            </Button>
          </Tooltip>
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
