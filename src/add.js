import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import {
  printWindowsTerminalConfigInstruction,
  getWindowsTerminalConfigPath,
  saveImageState
} from './utils.js'

export function add(collectionName) {
  const homeDir = os.homedir()
  const targetDir = path.resolve(homeDir, '.terminal-wallpaper')

  // 檢查 .terminal-wallpaper 資料夾是否存在
  if (!fs.existsSync(targetDir)) {
    console.error('✗ 請先執行 `./terminal-wallpaper init` 初始化')
    process.exit(1)
  }

  // 讀取 Windows Terminal 設定檔
  let config = fs.readFileSync(getWindowsTerminalConfigPath(), 'utf-8')

  // 檢查 Windows Terminal 設定檔格式是否正確
  try {
    const parsedConfig = JSON.parse(config)
    if (
      !parsedConfig.profiles ||
      !parsedConfig.profiles.defaults ||
      typeof parsedConfig.profiles.defaults.backgroundImage === 'undefined' ||
      typeof parsedConfig.profiles.defaults.backgroundImageAlignment === 'undefined' ||
      typeof parsedConfig.profiles.defaults.backgroundImageOpacity === 'undefined' ||
      typeof parsedConfig.profiles.defaults.backgroundImageStretchMode === 'undefined'
    ) {
      throw new Error('Invalid config format')
    }
  } catch (error) {
    console.error('✗ 無法解析 Windows Terminal 設定檔，請確認設定檔格式正確')
    console.log()
    console.log()
    printWindowsTerminalConfigInstruction()
    process.exit(1)
  }

  // 取得專案根目錄
  const projectRoot = path.resolve(import.meta.dirname, '..')
  const sourceCollection = path.resolve(projectRoot, 'collections', collectionName)

  // 檢查 collection 是否存在
  if (!fs.existsSync(sourceCollection)) {
    console.error(`✗ Collection '${collectionName}' 不存在`)
    process.exit(1)
  }

  // 複製 collection 到 .terminal-wallpaper/images
  const targetCollection = path.resolve(targetDir, 'images')
  fs.cpSync(sourceCollection, targetCollection, { recursive: true })

  // 保存 collection 的 metadata
  const metadata = {
    name: collectionName,
    addedAt: new Date().toISOString(),
    startIndex: 1,
    endIndex: fs.readdirSync(sourceCollection).length,
  }
  fs.writeFileSync(
    path.resolve(targetDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    'utf-8'
  )

  const index = 1
  const filenameTemplate = 'images/image-%s.png'

  // 保存當前圖片狀態
  saveImageState(targetDir, index, filenameTemplate)

  console.log(`✓ Collection '${collectionName}' 已新增到 Terminal Wallpaper！`)
}
