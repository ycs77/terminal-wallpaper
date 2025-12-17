import { init } from './init.js'
import { add } from './add.js'
import { update } from './update.js'

const command = process.argv[2]
const args = process.argv.slice(3)

switch (command) {
  case 'init':
    init(args)
    break
  case 'add':
    if (args.length === 0) {
      console.error('✗ 請提供 collection 名稱')
      process.exit(1)
    }
    add(args[0], args.slice(1))
    break
  case 'update':
    update()
    break
  default:
    console.log('Terminal Wallpaper CLI (v1.0.0)')
    console.log('')
    console.log('使用方式:')
    console.log('  ./terminal-wallpaper init          初始化 Terminal Wallpaper')
    console.log('  ./terminal-wallpaper add <name>    新增桌布 collection')
    console.log('  ./terminal-wallpaper update        更新腳本')
    process.exit(command ? 1 : 0)
}
