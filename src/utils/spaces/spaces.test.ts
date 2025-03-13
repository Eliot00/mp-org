import { describe, expect, it } from "vitest";

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

	it("should handle links correctly without modifying their content", () => {
		// 测试包含链接和需要处理的斜体
		const inputText = [
			"包含链接的测试：[[https://example.com][示例/链接]]，以及需要/斜体/处理的部分",
			"另一个[[http://a.com/b?c=d&e=f]]的测试，带/内部斜杠/",
		].join("\n"); // 支持多行测试

		const expectedOutput = [
			"包含链接的测试：[[https://example.com][示例/链接]]，以及需要\u200B/斜体/\u200B处理的部分",
			"另一个[[http://a.com/b?c=d&e=f]]的测试，带\u200B/内部斜杠/\u200B",
		].join("\n");

		expect(insertZeroWidthSpaces(inputText)).toBe(expectedOutput);
	});

	it("should handle complex link structures", () => {
		const testCases = [
			{
				input: "在[[file:/path/to/file]]中的链接和/斜体/",
				expect: "在[[file:/path/to/file]]中的链接和\u200B/斜体/\u200B",
			},
			{
				input: "混合*粗体*和[[https://a.com/b_c]]中的_下划线_",
				expect:
					"混合\u200B*粗体*\u200B和[[https://a.com/b_c]]中的\u200B_下划线_\u200B",
			},
		];

		for (const { input, expect: expected } of testCases) {
			expect(insertZeroWidthSpaces(input)).toBe(expected);
		}
	});
});
