import classes from "./preview.module.css";
import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import highlight from "rehype-highlight";
import stringify from "rehype-stringify";
import katex from "rehype-katex";
import { useEffect, useState } from "react";
import { inlineContent } from "juice";
import linkToCite from "../utils/cite";

type Props = {
  org: string;
  theme: string;
};

const processor = unified()
  .use(parse)
  .use(uniorg2rehype)
  .use(highlight)
  .use(katex)
  .use(linkToCite)
  .use(stringify);

export default function Preview({ org, theme }: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (org) {
      processor.process(org).then((vfile) => {
        const htmlStr = vfile.value.toString();
        const inlined = inlineContent(htmlStr, theme, {
          inlinePseudoElements: true,
        });
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
