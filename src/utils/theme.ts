// #if TARGET_PLATFORM == 'desktop'
import { invoke } from "@tauri-apps/api/core";
// #endif

export function setThemeById(id: string, callback: (theme: string) => void) {
  // #if TARGET_PLATFORM == 'desktop'
  invoke<string>("get_theme_content", { themeId: id }).then(callback);
  // #endif
}

export type ThemeOption = {
  id: string;
  name: string;
};

export function getThemeOptions(callback: (options: ThemeOption[]) => void) {
  // #if TARGET_PLATFORM == 'desktop'
  invoke<ThemeOption[]>("get_theme_options").then(callback);
  // #endif
}
