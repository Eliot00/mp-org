import classes from "./preview.module.css";
import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import highlight from "rehype-highlight";
import stringify from "rehype-stringify";
import katex from "rehype-katex";
import { useEffect, useState } from "react";
import { inlineContent } from "juice";

type Props = {
  org: string;
  theme: string;
};

const processor = unified()
  .use(parse)
  .use(uniorg2rehype)
  // @ts-expect-error: Just type error, don't know why
  .use(highlight)
  .use(katex)
  .use(stringify);

export default function Preview({ org, theme }: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (org) {
      processor.process(org).then((vfile: { value: string }) => {
        const htmlStr = vfile.value;
        const inlined = inlineContent(htmlStr, theme);
        setHtml(inlined);
      });
    }
  }, [org, theme]);

  return (
    <div className={classes.previewWrapper}>
      <div className={classes.preview}>
        <section id="org-output" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
