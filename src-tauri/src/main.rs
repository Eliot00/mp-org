// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{borrow::Cow, fs, sync::OnceLock};

use anyhow::Result;
use css_inline::CSSInliner;
use orgize::Org;
use regex::Regex;
use serde::Deserialize;
use xdg::BaseDirectories;

static CSS: OnceLock<Result<String>> = OnceLock::new();

#[derive(Deserialize)]
struct Config {
    theme_path: String,
}

#[tauri::command]
fn render_html(org_str: &str) -> String {
    let mut writer = Vec::new();
    Org::parse(org_str).write_html(&mut writer).unwrap();

    let html = String::from_utf8(writer).unwrap();

    let possible_css = CSS.get_or_init(try_get_style_from_config);

    match possible_css {
        Ok(css) => {
            let inliner = CSSInliner::options()
                .inline_style_tags(false)
                .keep_link_tags(false)
                .keep_style_tags(false)
                .extra_css(Some(Cow::Borrowed(&css)))
                .build();
            let inlined = inliner.inline(&html).unwrap();
            let re = Regex::new(r"(?s)<body>(.*?)</body>").unwrap();
            re.captures(&inlined).unwrap()[1].trim().to_string()
        }
        Err(_e) => html,
    }
}

fn try_get_style_from_config() -> Result<String> {
    let xdg_dirs = BaseDirectories::with_prefix("mp-org").unwrap();

    let config_path = xdg_dirs.place_config_file("config.toml")?;
    let config_str = fs::read_to_string(config_path)?;
    let config: Config = toml::from_str(&config_str)?;
    let css_path = xdg_dirs.get_config_file("themes").join(&config.theme_path);
    Ok(fs::read_to_string(css_path)?)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![render_html])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
