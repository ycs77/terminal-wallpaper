import fs from 'node:fs'
import path from 'node:path'

export function list() {
  const projectRoot = path.resolve(import.meta.dirname, '..')
  const collectionsDir = path.resolve(projectRoot, 'collections')

  // 檢查 collections 目錄是否存在
  if (!fs.existsSync(collectionsDir)) {
    console.error('✗ collections 目錄不存在')
    process.exit(1)
  }

  // 讀取 collections 目錄下的所有子目錄
  const collections = fs.readdirSync(collectionsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  if (collections.length === 0) {
    console.log('目前沒有可用的集合')
    return
  }

  console.log('可用的桌布集合:')
  console.log('')

  // 讀取每個集合的 collection.json 並顯示資訊
  for (const collectionName of collections) {
    const collectionJsonPath = path.resolve(collectionsDir, collectionName, 'collection.json')

    if (!fs.existsSync(collectionJsonPath)) {
      console.log(`  - ${collectionName} (無描述資訊)`)
      continue
    }

    try {
      const collectionData = JSON.parse(fs.readFileSync(collectionJsonPath, 'utf-8'))
      const description = collectionData.description || '無描述'
      console.log(`  - ${collectionName} - ${description}`)
    } catch (error) {
      console.log(`  - ${collectionName} (無法讀取描述資訊)`)
    }
  }
}
