import { createSignal, onMount } from "solid-js";
import { DEFAULT_THEME_ID } from "../constants.ts";
import { ThemeOption, getThemeOptions } from "../utils/theme.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type ThemeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ThemeSelect(props: ThemeSelectProps) {
  const [themeOptions, setThemeOptions] = createSignal<ThemeOption[]>([
    { id: DEFAULT_THEME_ID, name: "Default" },
  ]);
  onMount(async () => {
    await getThemeOptions((options) =>
      setThemeOptions((old) => [...old, ...options]),
    );
  });

  return (
    <Select
      options={themeOptions()}
      optionValue="id"
      optionTextValue="name"
      value={themeOptions().find((o) => o.id === props.value)}
      onChange={(v) => props.onChange(v?.id ?? DEFAULT_THEME_ID)}
      placeholder="Select a theme..."
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.name}</SelectItem>
      )}
    >
      <SelectTrigger class="w-[180px]">
        <SelectValue<ThemeOption>>
          {(state) => state.selectedOption().name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}
