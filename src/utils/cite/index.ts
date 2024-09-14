import type { Plugin } from "unified";
import type { Node } from "unist";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

interface Link {
  text: string;
  href: string;
  index: number;
}

const linkToCite: Plugin = () => {
  const transformer = (tree: Node) => {
    let linkIndex = 1;
    const links: Link[] = [];

    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "a" &&
        typeof node.properties.href === "string" &&
        !node.properties.href.includes("mp.weixin.qq.com")
      ) {
        const text = node.children
          .map((child) => (child.type === "text" ? child.value : ""))
          .join("");
        links.push({ text, href: node.properties.href, index: linkIndex });

        const supNode = {
          type: "element",
          tagName: "sup",
          properties: {},
          children: [
            {
              type: "text",
              value: `[${linkIndex}]`,
            },
          ],
        };

        node.tagName = "cite";
        node.properties = {};
        node.children = [{ type: "text", value: text }, supNode];

        linkIndex += 1;
      }
    });

    if (links.length > 0) {
      const linksSection: Element = {
        type: "element",
        tagName: "section",
        properties: {
          class: "cite-section",
        },
        children: [
          {
            type: "element",
            tagName: "h4",
            children: [{ type: "text", value: "引用链接" }],
            properties: {},
          },
          {
            type: "element",
            tagName: "ul",
            properties: {},
            children: links.map((link) => ({
              type: "element",
              tagName: "li",
              properties: {},
              children: [
                { type: "text", value: `[${link.index}]: ${link.text} ` },
                { type: "text", value: link.href },
              ],
            })),
          },
        ],
      };
      (tree as Root).children.push(linksSection);
    }
  };

  return transformer;
};

export default linkToCite;
