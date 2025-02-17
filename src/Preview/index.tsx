import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import highlight from "rehype-highlight";
import stringify from "rehype-stringify";
import katex from "rehype-katex";
import { inlineContent } from "juice";
import linkToCite from "~/utils/cite";
import { createSignal, createEffect } from "solid-js";

type Props = {
  org: string;
  theme: string;
};

const processor = unified()
  .use(parse)
  .use(uniorg2rehype, {
    imageFilenameExtensions: [
      "png",
      "jpeg",
      "jpg",
      "gif",
      "tiff",
      "tif",
      "xbm",
      "xpm",
      "pbm",
      "pgm",
      "ppm",
      "pnm",
      "svg",
      "webp",
    ],
  })
  .use(highlight)
  .use(katex)
  .use(linkToCite)
  .use(stringify);

export default function Preview(props: Props) {
  const [html, setHtml] = createSignal("");

  createEffect(() => {
    if (props.org) {
      processor.process(props.org).then((vfile) => {
        const htmlStr = vfile.value.toString();
        const inlined = inlineContent(htmlStr, props.theme, {
          inlinePseudoElements: true,
        });
        setHtml(inlined);
      });
    }
  });

  return (
    <div class="h-full min-w-[375px] text-sm box-border outline-none shadow-md break-all overflow-auto">
      <section id="org-output" innerHTML={html()} />
    </div>
  );
}
