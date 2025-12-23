import type { Element, ElementContent, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * WeChat's editor rebuilds pasted content when the draft is saved:
 * `pre` box styling (padding/background/border-radius/margin) and raw
 * whitespace inside `pre` are not preserved, only inline styles on
 * `section`/`span`/`code` survive. So code blocks are rendered as a
 * `section` card with an inner `pre`, and every newline/space is encoded
 * as `<br>`/`&nbsp;`.
 */
export const CODE_BLOCK_CLASS = "code-block";

const NBSP = "\u00A0";
const TAB_SIZE = 4;

const SECTION_STYLE = [
	"margin: 24px 8px",
	"padding: 16px",
	"border-radius: 8px",
	"overflow: auto",
];

const PRE_STYLE = [
	// Keep names single-word: juice mangles quoted font families in inline styles.
	"font-family: Menlo, Consolas, monospace",
	"font-size: 13px",
	"line-height: 1.7",
	"white-space: pre",
];

const CODE_STYLE = [
	"background: none",
	"border: 0",
	"padding: 0",
	"color: inherit",
];

const CARD_DECLARATION =
	/^(?:margin|padding|background|border|border-radius|box-shadow|overflow)(?:-|$)/;

function readStyle(style: unknown): string | undefined {
	return typeof style === "string" ? style : undefined;
}

function parseStyle(style: string | undefined): Map<string, string> {
	const declarations = new Map<string, string>();
	if (!style) {
		return declarations;
	}

	for (const part of style.split(";")) {
		const declaration = part.trim();
		if (!declaration) {
			continue;
		}
		const separator = declaration.indexOf(":");
		if (separator === -1) {
			continue;
		}
		declarations.set(
			declaration.slice(0, separator).trim().toLowerCase(),
			declaration.slice(separator + 1).trim(),
		);
	}

	return declarations;
}

function serializeStyle(declarations: Map<string, string>) {
	return [...declarations]
		.map(([property, value]) => `${property}: ${value}`)
		.join("; ");
}

function hasClass(node: Element, name: string) {
	const value = node.properties.className ?? node.properties.class;
	const classes = Array.isArray(value)
		? value.map(String)
		: typeof value === "string"
			? value.split(/\s+/)
			: [];
	return classes.includes(name);
}

function lineBreak(): Element {
	return { type: "element", tagName: "br", properties: {}, children: [] };
}

/** Shiki wraps every source line in `<span class="line">`; WeChat strips the class anyway. */
function flattenLineSpans(node: Element) {
	node.children = node.children.flatMap((child): ElementContent[] => {
		if (child.type !== "element") {
			return [child];
		}
		flattenLineSpans(child);
		return hasClass(child, "line") ? child.children : [child];
	});
}

/** Raw newlines/spaces inside `pre` are dropped by WeChat on save. */
function encodeWhitespace(node: Element) {
	node.children = node.children.flatMap((child): ElementContent[] => {
		if (child.type === "text") {
			return encodeText(child.value);
		}
		if (child.type === "element") {
			encodeWhitespace(child);
		}
		return [child];
	});
}

function encodeText(value: string): ElementContent[] {
	const children: ElementContent[] = [];

	value
		.replace(/\r\n?/g, "\n")
		.split("\n")
		.forEach((line, index) => {
			if (index > 0) {
				children.push(lineBreak());
			}
			if (line) {
				children.push({
					type: "text",
					value: line.replace(/\t/g, NBSP.repeat(TAB_SIZE)).replace(/ /g, NBSP),
				});
			}
		});

	return children;
}

const wechatCodeBlock: Plugin<[], Root> = () => {
	return (tree) => {
		const codeBlocks: {
			node: Element;
			index: number;
			parent: Element | Root;
		}[] = [];

		visit(tree, "element", (node, index, parent) => {
			if (node.tagName !== "pre" || !parent || typeof index !== "number") {
				return;
			}
			if (
				node.children.some(
					(child) => child.type === "element" && child.tagName === "code",
				)
			) {
				codeBlocks.push({ node, index, parent });
			}
		});

		for (const { node, index, parent } of codeBlocks) {
			const code = node.children.find(
				(child): child is Element =>
					child.type === "element" && child.tagName === "code",
			);
			if (!code) {
				continue;
			}

			const shikiStyle = parseStyle(readStyle(node.properties.style));
			const background =
				shikiStyle.get("background-color") ?? shikiStyle.get("background");
			const color = shikiStyle.get("color");

			flattenLineSpans(code);
			encodeWhitespace(code);

			const sectionStyle = [...SECTION_STYLE];
			if (background) {
				sectionStyle.push(`background-color: ${background}`);
			}

			const preStyle = [...PRE_STYLE];
			if (color) {
				preStyle.push(`color: ${color}`);
			}

			const section: Element = {
				type: "element",
				tagName: "section",
				properties: {
					className: [CODE_BLOCK_CLASS],
					style: sectionStyle.join("; "),
				},
				children: [
					{
						type: "element",
						tagName: "pre",
						properties: { style: preStyle.join("; ") },
						children: [
							{
								type: "element",
								tagName: "code",
								properties: { style: CODE_STYLE.join("; ") },
								children: code.children,
							},
						],
					},
				],
			};

			parent.children[index] = section;
		}
	};
};

/**
 * Move the box styling of the inner `pre` (from the theme's `pre` rule)
 * onto the wrapper `section`, which WeChat keeps, and reset the `pre` box
 * model so the card is not drawn twice.
 */
export function applyCodeBlockLayout(html: string) {
	const document = new DOMParser().parseFromString(html, "text/html");

	for (const section of document.querySelectorAll<HTMLElement>(
		`section.${CODE_BLOCK_CLASS}`,
	)) {
		const pre = Array.from(section.children).find(
			(child): child is HTMLElement => child.tagName === "PRE",
		);
		if (!pre) {
			continue;
		}

		const preDeclarations = parseStyle(pre.getAttribute("style") ?? undefined);
		const sectionDeclarations = parseStyle(
			section.getAttribute("style") ?? undefined,
		);

		for (const [property, value] of [...preDeclarations]) {
			if (CARD_DECLARATION.test(property)) {
				sectionDeclarations.set(property, value);
				preDeclarations.delete(property);
			}
		}
		preDeclarations.set("margin", "0");
		preDeclarations.set("padding", "0");

		section.setAttribute("style", serializeStyle(sectionDeclarations));
		pre.setAttribute("style", serializeStyle(preDeclarations));
	}

	return document.body.innerHTML;
}

export default wechatCodeBlock;
