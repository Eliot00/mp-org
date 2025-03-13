import { toaster } from "@kobalte/core";
import type { TooltipTriggerProps } from "@kobalte/core/tooltip";
import {
	createCodeMirror,
	createEditorControlledValue,
	createEditorFocus,
} from "solid-codemirror";
import { createEffect, createSignal } from "solid-js";
import { defaultTheme } from "~/assets/theme";
import { Button } from "~/components/ui/button";
import {
	Toast,
	ToastContent,
	ToastList,
	ToastRegion,
} from "~/components/ui/toast";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { DEFAULT_THEME_ID } from "~/constants";
import { convertLocalImageLink } from "~/utils/image";
import { insertZeroWidthSpaces } from "~/utils/spaces";
import { setThemeById } from "~/utils/theme";
import Preview from "./Preview";
import ThemeSelect from "./ThemeSelect";

import "./App.css";

function App() {
	const [value, setValue] = createSignal("");
	const { editorView, ref: editorRef } = createCodeMirror({
		onValueChange: setValue,
	});
	createEditorControlledValue(editorView, value);

	const { setFocused } = createEditorFocus(editorView);
	createEffect(() => {
		if (editorView()) {
			setFocused(true);
		}
	});

	const [themeId, setThemeId] = createSignal(DEFAULT_THEME_ID);
	const [theme, setTheme] = createSignal(defaultTheme);
	createEffect(() => {
		if (themeId() === DEFAULT_THEME_ID) {
			setTheme(defaultTheme);
		} else {
			setThemeById(themeId(), setTheme);
		}
	});

	return (
		<main class="h-vh flex flex-col">
			<div class="p-2 flex items-center gap-2">
				<Button
					onClick={async () => {
						const newValue = await convertLocalImageLink(value());
						setValue(newValue);
					}}
				>
					上传本地图片
				</Button>
				<Tooltip>
					<TooltipTrigger
						as={(props: TooltipTriggerProps) => (
							<Button
								variant="outline"
								{...props}
								onClick={() => setValue(insertZeroWidthSpaces)}
							>
								自动补全零宽空格
							</Button>
						)}
					/>
					<TooltipContent>
						<p>
							orgmode中行内样式（如加粗）标记前后需要空格，按此键可为没加空格的标记自动添加零宽空格
						</p>
					</TooltipContent>
				</Tooltip>
				<ThemeSelect value={themeId()} onChange={setThemeId} />
				<Button
					onClick={async (e) => {
						e.preventDefault();

						const htmlStr = document.getElementById("org-output")?.innerHTML;
						if (htmlStr) {
							const type = "text/html";
							const blob = new Blob([htmlStr], { type });
							const data = [new ClipboardItem({ [type]: blob })];
							navigator.clipboard.write(data);

							toaster.show((props) => (
								<Toast toastId={props.toastId}>
									<ToastContent>复制成功</ToastContent>
								</Toast>
							));
						}
					}}
				>
					Copy
				</Button>
			</div>
			<div class="flex-1 w-full p-2 flex gap-2">
				<div ref={editorRef} class="flex-1 h-full overflow-auto *:h-full" />
				<div class="flex-1 h-full max-h-full flex items-center justify-center">
					<Preview org={value()} theme={theme()} />
				</div>
			</div>
			<ToastRegion>
				<ToastList />
			</ToastRegion>
		</main>
	);
}

export default App;
