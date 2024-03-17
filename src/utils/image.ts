import { unified, type Transformer } from "unified";
import parse from "uniorg-parse";
import { uniorgStringify } from "uniorg-stringify";
import { visit } from "unist-util-visit";
import { invoke } from "@tauri-apps/api/tauri";
import type { Link } from "uniorg";

const imageExtensions = /\.(png|jpe?g|gif|svg|bmp|webp)$/i;

function uploadImage(): Transformer {
  return async (tree) => {
    const promises: Promise<void>[] = [];

    visit(tree, "link", (node: Link) => {
      if (node.linkType === "file" && imageExtensions.test(node.path)) {
        const promise = invoke<string>("upload_image", {
          filePath: node.path,
        }).then((result) => {
          const newUrl = new URL(result);
          node.path = `//${newUrl.host}${newUrl.pathname}`;
          node.linkType = newUrl.protocol.slice(0, -1);
          node.rawLink = newUrl.href;
        });
        promises.push(promise);
      }
    });

    await Promise.all(promises);
    return tree;
  };
}

const processor = unified().use(parse).use(uploadImage).use(uniorgStringify);

export async function convertLocalImageLink(raw: string) {
  const res = await processor.process(raw);
  return res.value.toString();
}
