import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { copyStubScripts, printWindowsTerminalConfigInstruction } from './utils.js'

export function init(args) {
  const hasForce = args.includes('--force')
  const homeDir = os.homedir()
  const userWallpaperDir = path.resolve(homeDir, '.terminal-wallpaper')

  // 檢查資料夾是否已存在
  if (fs.existsSync(userWallpaperDir) && !hasForce) {
    console.log('ℹ Terminal Wallpaper 已經初始化過了')
    return
  }

  // 如果資料夾存在就刪除
  if (fs.existsSync(userWallpaperDir)) {
    fs.rmSync(userWallpaperDir, { recursive: true, force: true })
  }

  // 建立 .terminal-wallpaper 資料夾
  fs.mkdirSync(userWallpaperDir, { recursive: true })

  // 複製腳本檔案
  copyStubScripts()

  // 建立 images 資料夾
  const imagesDir = path.resolve(userWallpaperDir, 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  console.log('✓ Terminal Wallpaper 初始化完成！')
  console.log()
  console.log()
  printWindowsTerminalConfigInstruction()
}
