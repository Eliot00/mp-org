import rehypeShiki from "@shikijs/rehype";
import { inlineContent } from "juice";
import katex from "rehype-katex";
import stringify from "rehype-stringify";
import { createDeferred, createEffect, createSignal } from "solid-js";
import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import linkToCite from "~/utils/cite";

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
	.use(rehypeShiki, {
		theme: "everforest-light",
	})
	.use(katex)
	.use(linkToCite)
	.use(stringify);

async function toHtml(orgStr: string, theme: string) {
	if (!orgStr) {
		return null;
	}

	const vfile = await processor.process(orgStr);
	const htmlStr = vfile.value.toString();
	return inlineContent(htmlStr, theme, {
		inlinePseudoElements: true,
	});
}

export default function Preview(props: Props) {
	const [html, setHtml] = createSignal("");
	const deferredOrgString = createDeferred(() => props.org, {
		timeoutMs: 1000,
	});

	createEffect(() => {
		toHtml(deferredOrgString(), props.theme).then((inlined) => {
			if (inlined) {
				setHtml(inlined);
			}
		});
	});

	return (
		<div class="h-full min-w-[375px] text-sm box-border outline-none shadow-md break-all overflow-auto">
			<section id="org-output" innerHTML={html()} />
		</div>
	);
}
