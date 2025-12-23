// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { defaultTheme } from "~/assets/theme";
import { renderOrgToHtml } from "./index";

const ORG_WITH_CODE = `#+begin_src js
const answer = 42;
  log(answer);
#+end_src
`;

function codeSection(html: string) {
	const section = new DOMParser()
		.parseFromString(html, "text/html")
		.querySelector<HTMLElement>("section.code-block");
	if (!section) {
		throw new Error("no code block section in output");
	}
	return section;
}

describe("default theme", () => {
	it("uses no CSS variables and no rem units, which WeChat drops on save", () => {
		expect(defaultTheme).not.toMatch(/var\(/);
		expect(defaultTheme).not.toMatch(/\d(?:\.\d+)?rem\b/);
	});
});

describe("renderOrgToHtml", () => {
	it("keeps the code block card on a section, not on pre", async () => {
		const html = await renderOrgToHtml(ORG_WITH_CODE, defaultTheme);
		const section = codeSection(html ?? "");

		const sectionStyle = section.getAttribute("style") ?? "";
		expect(sectionStyle).toContain("background-color");
		expect(sectionStyle).toMatch(/padding:\s*16px/);
		expect(sectionStyle).toMatch(/border-radius:\s*8px/);
		expect(sectionStyle).not.toMatch(/rem\b/);

		const preStyle = section.querySelector("pre")?.getAttribute("style") ?? "";
		expect(preStyle).not.toMatch(/padding:\s*16px/);
		expect(preStyle).not.toMatch(/background(-color)?:/);
		expect(preStyle).not.toContain("undefined");
	});

	it("encodes code whitespace as <br> and non-breaking spaces", async () => {
		const html = await renderOrgToHtml(ORG_WITH_CODE, defaultTheme);
		const code = codeSection(html ?? "").querySelector("code");

		expect(code).not.toBeNull();
		expect(code?.querySelectorAll("br")).toHaveLength(1);
		expect(code?.textContent).not.toContain(" ");
		expect(code?.textContent).toContain("\u00A0\u00A0log");
	});

	it("moves the theme's pre rules to the section and keeps pre's box model clean", async () => {
		const theme =
			"pre { padding: 20px; margin: 10px; background: #fafafa; border-radius: 12px; }";
		const html = await renderOrgToHtml(ORG_WITH_CODE, theme);
		const section = codeSection(html ?? "");

		const sectionStyle = section.getAttribute("style") ?? "";
		expect(sectionStyle).toMatch(/padding:\s*20px/);
		expect(sectionStyle).toContain("#fafafa");

		const preStyle = section.querySelector("pre")?.getAttribute("style") ?? "";
		expect(preStyle).not.toMatch(/20px/);
		expect(preStyle).not.toMatch(/10px/);
		expect(preStyle).toMatch(/padding:\s*0/);
	});
});
