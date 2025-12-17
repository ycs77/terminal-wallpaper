import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { copyStubScripts } from './utils.js'

export function update() {
  const homeDir = os.homedir()
  const targetDir = path.resolve(homeDir, '.terminal-wallpaper')

  // 檢查 .terminal-wallpaper 資料夾是否存在
  if (!fs.existsSync(targetDir)) {
    console.error('✗ 請先執行 `./terminal-wallpaper init` 初始化')
    process.exit(1)
  }

  // 複製腳本檔案
  copyStubScripts()

  console.log('✓ 已更新腳本')
}
