import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import {
  printWindowsTerminalConfigInstruction,
  getWindowsTerminalConfigPath,
  saveImageState
} from './utils.js'

export function use(collectionName) {
  const homeDir = os.homedir()
  const userWallpaperDir = path.resolve(homeDir, '.terminal-wallpaper')

  // 檢查 .terminal-wallpaper 資料夾是否存在
  if (!fs.existsSync(userWallpaperDir)) {
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

  // 檢查集合是否存在
  if (!fs.existsSync(sourceCollection)) {
    console.error(`✗ 集合 '${collectionName}' 不存在`)
    process.exit(1)
  }

  // 取得集合圖片路徑
  const sourceCollectionImagesPath = path.resolve(sourceCollection, 'images')

  // 取得 images 資料夾路徑
  const imagesDir = path.resolve(userWallpaperDir, 'images')

  // 重新建立 images 資料夾
  if (fs.existsSync(imagesDir)) {
    fs.rmSync(imagesDir, { recursive: true, force: true })
  }
  fs.mkdirSync(imagesDir)

  // 複製集合圖片到 .terminal-wallpaper/images
  const targetImagesPath = path.resolve(userWallpaperDir, 'images')
  fs.cpSync(sourceCollectionImagesPath, targetImagesPath, { recursive: true })

  // 取得集合的 metadata
  const collectionMetadataPath = path.resolve(sourceCollection, 'collection.json')
  const collectionMetadata = JSON.parse(fs.readFileSync(collectionMetadataPath, 'utf-8'))

  const { filenameTemplate, windowsTerminalSettings } = collectionMetadata

  // 保存當前顯示集合的 metadata
  const currentMetadata = {
    name: collectionName,
    addedAt: new Date().toISOString(),
    filenameTemplate,
    startIndex: 1,
    endIndex: fs.readdirSync(sourceCollectionImagesPath).length,
  }
  fs.writeFileSync(
    path.resolve(userWallpaperDir, 'metadata.json'),
    JSON.stringify(currentMetadata, null, 2),
    'utf-8'
  )

  const index = 1

  // 保存當前圖片狀態
  saveImageState(userWallpaperDir, index, filenameTemplate, windowsTerminalSettings)

  console.log(`✓ 已套用集合 '${collectionName}'`)
}
