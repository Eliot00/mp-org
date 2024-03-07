import { useState, useCallback, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import CodeMirror from "@uiw/react-codemirror";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [htmlString, setHtmlString] = useState("");

  const onChange = useCallback((val: string) => {
    setValue(val);
    renderHtml(val);
  }, []);

  const renderHtml = async (orgStr: string) => {
    try {
      const htmlStr = await invoke<string>("render_html", { orgStr });
      setHtmlString(htmlStr);
    } catch (err) {
      console.error("Error rendering HTML:", err);
    }
  };

  useEffect(() => {
    renderHtml(value);
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
        <div className="preview-wrapper">
          <div className="preview">
            <section
              id="org-output"
              dangerouslySetInnerHTML={{ __html: htmlString }}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
