import { createDeferred, createEffect, createSignal } from "solid-js";
import { renderOrgToHtml } from "~/utils/render";

type Props = {
	org: string;
	theme: string;
};

export default function Preview(props: Props) {
	const [html, setHtml] = createSignal("");
	const deferredOrgString = createDeferred(() => props.org, {
		timeoutMs: 1000,
	});

	createEffect(() => {
		renderOrgToHtml(deferredOrgString(), props.theme).then((inlined) => {
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
