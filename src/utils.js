import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

export function copyStubScripts() {
  const homeDir = os.homedir()
  const targetDir = path.resolve(homeDir, '.terminal-wallpaper')
  const projectRoot = path.resolve(import.meta.dirname, '..')

  const stubFile = path.resolve(projectRoot, 'stub', 'change-wallpaper.js')
  const targetFile = path.resolve(targetDir, 'change-wallpaper.js')
  fs.copyFileSync(stubFile, targetFile)
}

export function printWindowsTerminalConfigInstruction() {
  console.log('請將你的 Windows Terminal 設定檔（settings.json）中的 profiles.defaults 設定成以下格式：')
  console.log()
  console.log('{')
  console.log('    "profiles": ')
  console.log('    {')
  console.log('        "defaults": ')
  console.log('        {')
  console.log('            "backgroundImage": "",')
  console.log('            "backgroundImageAlignment": "bottomRight",')
  console.log('            "backgroundImageOpacity": 0.1,')
  console.log('            "backgroundImageStretchMode": "none"')
  console.log('        }')
  console.log('    }')
  console.log('}')
}

export function getWindowsTerminalConfigPath() {
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

export function saveImageState(targetDir, index, filenameTemplate) {
  // 取得索引檔案路徑
  const indexFilePath = path.resolve(targetDir, 'index')

  // 格式化索引為兩位數字字串
  const indexStr = String(index).padStart(2, '0')

  // 將索引儲存至檔案
  fs.writeFileSync(indexFilePath, String(index), 'utf-8')

  // 取得 Windows Terminal 設定檔 路徑
  const windowsTerminalConfigPath = getWindowsTerminalConfigPath()

  // 讀取 Windows Terminal 設定檔
  let config = fs.readFileSync(windowsTerminalConfigPath, 'utf-8')

  // 取得圖片路徑
  const imagePath = path.resolve(targetDir, filenameTemplate.replace('%s', indexStr))

  // 檢查背景圖片路徑是否包含反斜線
  const hasBackslashesInPath = /"defaults":\s*\{[^}]*"backgroundImage": *"[^"]*\\+/.test(config)

  // 更新背景圖片路徑
  config = config.replace(
    /(?<="defaults":\s*\{[^}]*"backgroundImage": *")[^"]*/,
    hasBackslashesInPath
      ? imagePath.replaceAll(/[/\\]/g, '\\\\')
      : imagePath.replaceAll(/\\/g, '/')
  )

  // 更新 Windows Terminal 設定檔
  fs.writeFileSync(windowsTerminalConfigPath, config, 'utf-8')
}
