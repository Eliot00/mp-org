import { describe, it, expect } from "vitest";

import { insertZeroWidthSpaces } from ".";

describe("insertZeroWidthSpaces", () => {
  it("should insert zero-width spaces around Org mode inline styles", () => {
    const inputText =
      "这是*加粗*的文本，和/斜体/的文本。还有一些_下划线_和+删除线+以及=verbatim=和~代码块~。";
    const expectedOutput =
      "这是\u200B*加粗*\u200B的文本，和\u200B/斜体/\u200B的文本。还有一些\u200B_下划线_\u200B和\u200B+删除线+\u200B以及\u200B=verbatim=\u200B和\u200B~代码块~\u200B。";
    expect(insertZeroWidthSpaces(inputText)).toBe(expectedOutput);
  });

  it("should not insert additional zero-width spaces if already present or if spaces are already there", () => {
    const inputTextWithSpaces = "这是 *加粗* 的文本，和 /斜体/ 的文本。";
    const inputTextWithZeroWidthSpaces =
      "这是\u200B*加粗*\u200B的文本，和\u200B/斜体/\u200B的文本。";

    // 输出应该与输入相同，不做重复操作
    expect(insertZeroWidthSpaces(inputTextWithSpaces)).toBe(
      inputTextWithSpaces,
    );
    expect(insertZeroWidthSpaces(inputTextWithZeroWidthSpaces)).toBe(
      inputTextWithZeroWidthSpaces,
    );
  });
});
