# Terminal Wallpaper

此儲存庫包含 Lucas Yang 常用的 Windows Terminal 桌布集合和輔助的 CLI 小工具。

## 桌布集合列表

<!-- list-start -->
| 集合名稱 | 描述 |
| --- | --- |
| [`majotabi`](collections/majotabi) | 魔女之旅 角色 |
| [`manosaba-cg`](collections/manosaba-cg) | 魔法少女的魔女審判 CG |
| [`manosaba-characters`](collections/manosaba-characters) | 魔法少女的魔女審判 角色 |
| [`manosaba-characters-majoka`](collections/manosaba-characters-majoka) | 魔法少女的魔女審判 角色魔女化 |
<!-- list-end -->

## 安裝

請先 clone 此儲存庫：

```bash
git clone https://github.com/ycs77/terminal-wallpaper.git
```

## 使用方式

在當前目錄下執行初始化指令：

```bash
./terminal-wallpaper init
```

列出所有可用的桌布集合：

```bash
./terminal-wallpaper list
```

套用指定的桌布集合：

```bash
./terminal-wallpaper use <collection-name>
# 範例：套用一個集合
./terminal-wallpaper use majotabi
```

更新腳本：

```bash
./terminal-wallpaper update
```

解除安裝：

1. 刪除 `C:\Users\[user]\.terminal-wallpaper` 目錄
2. 從 Windows Terminal 設定中移除背景圖片設定

## 設定自動更換終端機背景圖片

您可以使用工作排程器自動更換 Windows Terminal 的背景圖片：

- **名稱:** ChangeTerminalWallpaper
- **觸發程序:** 登入時 / 當任何使用者登入時執行
- **動作:**
  - **程式或指令碼:** `"C:\Program Files\nodejs\node.exe"`
  - **新增引數:** `C:\Users\[user]\.terminal-wallpaper\change-wallpaper.js`

此設定會在使用者登入時，自動執行更換終端機背景圖片的腳本。

## 授權

[MIT License](LICENSE.md)

本倉庫中的桌布集合圖片均從網路上取得，版權歸原作者所有。
