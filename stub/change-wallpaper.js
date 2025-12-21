/**
 * Terminal Wallpaper 自動更換背景圖片腳本 v1.1.0
 */

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

// 讀取 metadata
const metadataPath = path.resolve(import.meta.dirname, 'metadata.json')

if (!fs.existsSync(metadataPath)) {
  console.error('✗ 請先使用 `./terminal-wallpaper use` 指令套用任意一個桌布集合')
  process.exit(1)
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
const { filenameTemplate, startIndex, endIndex } = metadata

let index = startIndex

// 取得索引檔案路徑
const indexFilePath = path.resolve(import.meta.dirname, 'index')

// 如果索引檔案存在則更新索引
if (fs.existsSync(indexFilePath)) {
  index = parseInt(fs.readFileSync(indexFilePath, 'utf-8'))
  // 索引遞增
  index++

  // 如果索引超過結束索引則重置
  if (index > endIndex) {
    index = startIndex
  }
}

// 保存當前圖片狀態
saveImageState(import.meta.dirname, index, filenameTemplate)

// from src/utils.js
function getWindowsTerminalConfigPath() {
  return path.resolve(
    os.homedir(),
    'AppData',
    'Local',
    'Packages',
    'Microsoft.WindowsTerminal_8wekyb3d8bbwe',
    'LocalState',
    'settings.json'
  )
}

// from src/utils.js
function saveImageState(userWallpaperDir, index, filenameTemplate, windowsTerminalSettings = {}) {
  // 取得索引檔案路徑
  const indexFilePath = path.resolve(userWallpaperDir, 'index')

  // 格式化索引為兩位數字字串
  const indexStr = String(index).padStart(2, '0')

  // 將索引儲存至檔案
  fs.writeFileSync(indexFilePath, String(index), 'utf-8')

  // 取得 Windows Terminal 設定檔 路徑
  const windowsTerminalConfigPath = getWindowsTerminalConfigPath()

  // 讀取 Windows Terminal 設定檔
  let config = fs.readFileSync(windowsTerminalConfigPath, 'utf-8')

  // 取得圖片路徑
  const imagePath = path.resolve(userWallpaperDir, 'images', filenameTemplate.replace('%s', indexStr))

  // 檢查背景圖片路徑是否包含反斜線
  const hasBackslashesInPath = /"defaults":\s*\{[^}]*"backgroundImage": *"[^"]*\\+/.test(config)

  // 更新背景圖片路徑
  config = config.replace(
    /(?<="defaults":\s*\{[^}]*"backgroundImage": *")[^"]*/,
    hasBackslashesInPath
      ? imagePath.replaceAll(/[/\\]/g, '\\\\')
      : imagePath.replaceAll(/\\/g, '/')
  )

  // 更新背景圖片對齊方式
  if (typeof windowsTerminalSettings.backgroundImageAlignment !== 'undefined') {
    config = config.replace(
      /(?<="defaults":\s*\{[^}]*"backgroundImageAlignment": *")[^"]*/,
      windowsTerminalSettings.backgroundImageAlignment
    )
  }

  // 更新背景圖片不透明度
  if (typeof windowsTerminalSettings.backgroundImageOpacity !== 'undefined') {
    config = config.replace(
      /(?<="defaults":\s*\{[^}]*"backgroundImageOpacity": *)[\d.]+/,
      String(windowsTerminalSettings.backgroundImageOpacity)
    )
  }

  // 更新背景圖片拉伸模式
  if (typeof windowsTerminalSettings.backgroundImageStretchMode !== 'undefined') {
    config = config.replace(
      /(?<="defaults":\s*\{[^}]*"backgroundImageStretchMode": *")[^"]*/,
      windowsTerminalSettings.backgroundImageStretchMode
    )
  }

  // 更新 Windows Terminal 設定檔
  fs.writeFileSync(windowsTerminalConfigPath, config, 'utf-8')
}
