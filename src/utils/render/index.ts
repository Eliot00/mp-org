import rehypeShiki from "@shikijs/rehype";
import { inlineContent } from "juice";
import katex from "rehype-katex";
import stringify from "rehype-stringify";
import { unified } from "unified";
import parse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import linkToCite from "~/utils/cite";
import wechatCodeBlock, { applyCodeBlockLayout } from "~/utils/code-block";

const processor = unified()
	.use(parse)
	.use(uniorg2rehype)
	.use(rehypeShiki, {
		theme: "everforest-light",
	})
	.use(wechatCodeBlock)
	.use(katex)
	.use(linkToCite)
	.use(stringify);

export async function renderOrgToHtml(orgStr: string, theme: string) {
	if (!orgStr) {
		return null;
	}

	const vfile = await processor.process(orgStr);
	const htmlStr = vfile.value.toString();
	const inlined = inlineContent(htmlStr, theme, {
		inlinePseudoElements: true,
	});
	return applyCodeBlockLayout(inlined);
}
