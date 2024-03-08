import classes from "./preview.module.css";
import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import highlight from "rehype-highlight";
import stringify from "rehype-stringify";
import { useEffect, useState } from "react";
import { inlineContent } from "juice";
import { defaultTheme } from "../assets/theme";

type Props = {
  org: string;
};

export default function Preview({ org }: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (org) {
      const processor = unified()
        .use(parse)
        .use(uniorg2rehype)
        // @ts-expect-error: Just type error, don't know why
        .use(highlight)
        .use(stringify);

      processor.process(org).then((vfile: { value: string }) => {
        const htmlStr = vfile.value;
        const inlined = inlineContent(htmlStr, defaultTheme);
        setHtml(inlined);
      });
    }
  }, [org]);

  return (
    <div className={classes.previewWrapper}>
      <div className={classes.preview}>
        <section id="org-output" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
