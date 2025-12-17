import { init } from './init.js'
import { use } from './use.js'
import { update } from './update.js'

const command = process.argv[2]
const args = process.argv.slice(3)

switch (command) {
  case 'init':
    init(args)
    break
  case 'use':
    if (args.length === 0) {
      console.error('✗ 請提供 collection 名稱')
      process.exit(1)
    }
    use(args[0], args.slice(1))
    break
  case 'update':
    update()
    break
  default:
    console.log('Terminal Wallpaper CLI (v1.0.2)')
    console.log('')
    console.log('使用方式:')
    console.log('  ./terminal-wallpaper init          初始化 Terminal Wallpaper')
    console.log('  ./terminal-wallpaper use <name>    套用指定的桌布集合')
    console.log('  ./terminal-wallpaper update        更新腳本')
    process.exit(command ? 1 : 0)
}
