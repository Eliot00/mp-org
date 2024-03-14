// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::{fs, path::PathBuf};

use dirs_next::config_dir;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Config {
    theme: HashMap<String, Theme>,
}

#[derive(Deserialize)]
struct Theme {
    name: String,
    path: String,
}

#[derive(Serialize)]
struct ThemeOption {
    id: String,
    name: String,
}

fn get_config_path() -> PathBuf {
    config_dir().unwrap().join("mp-org")
}

fn read_config() -> Result<Config, Box<dyn std::error::Error>> {
    let config_path = get_config_path().join("config.toml");
    let config_content = fs::read_to_string(config_path)?;
    let config: Config = toml::from_str(&config_content)?;
    Ok(config)
}

#[tauri::command]
fn get_theme_content(theme_id: String) -> Result<String, String> {
    let config = read_config().map_err(|e| e.to_string())?;
    let theme = config.theme.get(&theme_id).ok_or("Theme not found")?;
    let theme_content = fs::read_to_string(get_config_path().join("themes").join(&theme.path))
        .map_err(|e| e.to_string())?;
    Ok(theme_content)
}

#[tauri::command]
fn get_theme_options() -> Result<Vec<ThemeOption>, String> {
    let config = read_config().map_err(|e| e.to_string())?;
    let themes = config
        .theme
        .iter()
        .map(|(id, theme)| ThemeOption {
            id: id.clone(),
            name: theme.name.clone(),
        })
        .collect();
    Ok(themes)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_theme_content,
            get_theme_options
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
