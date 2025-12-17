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
