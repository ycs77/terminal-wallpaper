import fs from 'node:fs'
import path from 'node:path'

export function updateReadme() {
  const projectRoot = path.resolve(import.meta.dirname, '..')
  const collectionsDir = path.resolve(projectRoot, 'collections')
  const readmePath = path.resolve(projectRoot, 'README.md')

  // 檢查 collections 目錄是否存在
  if (!fs.existsSync(collectionsDir)) {
    console.error('✗ collections 目錄不存在')
    process.exit(1)
  }

  // 檢查 README.md 是否存在
  if (!fs.existsSync(readmePath)) {
    console.error('✗ README.md 檔案不存在')
    process.exit(1)
  }

  // 掃描所有 collections（與 list.js 保持一致）
  const collections = fs.readdirSync(collectionsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  if (collections.length === 0) {
    console.log('✗ 目前沒有可用的集合')
    process.exit(1)
  }

  // 生成 Markdown table
  const tableHeader = '| 集合名稱 | 描述 |\n| --- | --- |'
  const tableRows = collections.map(collectionName => {
    const collectionJsonPath = path.resolve(collectionsDir, collectionName, 'collection.json')
    let description = ''

    if (fs.existsSync(collectionJsonPath)) {
      try {
        const collectionData = JSON.parse(fs.readFileSync(collectionJsonPath, 'utf-8'))
        description = collectionData.description || ''
      } catch (error) {
        // 若 JSON 損壞，描述留空
      }
    }

    return `| [\`${collectionName}\`](collections/${collectionName}) | ${description} |`
  })

  const listContent = tableHeader + '\n' + tableRows.join('\n')

  // 讀取 README.md
  let readmeContent = fs.readFileSync(readmePath, 'utf-8')

  // 檢查是否存在註解標籤
  if (!/<!-- list-start -->/.test(readmeContent) || !/<!-- list-end -->/.test(readmeContent)) {
    console.error('✗ README.md 缺少 <!-- list-start --> 或 <!-- list-end --> 標籤')
    process.exit(1)
  }

  // 替換列表內容
  const updatedContent = readmeContent.replace(
    /<!-- list-start -->[\s\S]*?\n<!-- list-end -->/,
    `<!-- list-start -->\n${listContent}\n<!-- list-end -->`
  )

  // 寫入 README.md
  fs.writeFileSync(readmePath, updatedContent, 'utf-8')
  console.log(`✓ 已更新 README.md (${collections.length} 個集合)`)
}
