import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Preview from "./Preview";

function App() {
  const [value, setValue] = useState("");

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid xs={12}>
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
      </Grid>
      <Grid xs={6} sx={{ height: "calc(100vh - 54px)" }}>
        <CodeMirror
          height="100%"
          style={{ height: "100%" }}
          value={value}
          onChange={onChange}
        />
      </Grid>
      <Grid xs={6} sx={{ height: "calc(100vh - 54px)" }}>
        <Preview org={value} />
      </Grid>
    </Grid>
  );
}

export default App;
