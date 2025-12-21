// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::process::Command;
use std::sync::OnceLock;
use std::{fs, path::PathBuf};

use dirs_next::config_dir;
use serde::{Deserialize, Serialize};

static CONFIG: OnceLock<Config> = OnceLock::new();

#[derive(Deserialize, Default)]
struct Config {
    theme: HashMap<String, Theme>,

    #[serde(default)]
    image: Option<ImageConfig>,
}

#[derive(Deserialize)]
struct Theme {
    name: String,
    path: String,
}

#[derive(Deserialize)]
struct ImageConfig {
    uploader: String,
}

#[derive(Serialize)]
struct ThemeOption {
    id: String,
    name: String,
}

fn get_or_init_config() -> &'static Config {
    CONFIG.get_or_init(|| load_config().unwrap_or_default())
}

fn load_config() -> Result<Config, Box<dyn std::error::Error>> {
    let config_path = get_config_path().join("config.toml");
    let config_content = fs::read_to_string(config_path)?;
    let config: Config = basic_toml::from_str(&config_content)?;
    Ok(config)
}

fn get_config_path() -> PathBuf {
    config_dir().unwrap().join("mp-org")
}

#[tauri::command]
fn get_theme_content(theme_id: String) -> Result<String, String> {
    let config = get_or_init_config();
    let theme = config.theme.get(&theme_id).ok_or("Theme not found")?;
    let theme_content = fs::read_to_string(get_config_path().join("themes").join(&theme.path))
        .map_err(|e| e.to_string())?;
    Ok(theme_content)
}

#[tauri::command]
fn get_theme_options() -> Result<Vec<ThemeOption>, String> {
    let config = get_or_init_config();
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

#[tauri::command]
fn upload_image(file_path: String) -> Result<String, String> {
    let config = get_or_init_config();
    if let Some(ImageConfig { ref uploader }) = config.image {
        let mut command = if cfg!(target_os = "windows") {
            let mut cmd = Command::new("cmd");
            cmd.args(["/C", uploader, &file_path]);
            cmd
        } else {
            let mut cmd = Command::new(uploader);
            cmd.arg(&file_path);
            cmd
        };
        let output = command.output().map_err(|e| e.to_string())?;
        let stdout = String::from_utf8_lossy(&output.stdout).to_string();
        Ok(stdout)
    } else {
        Err("Image uploader not configured".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_theme_content,
            get_theme_options,
            upload_image
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
