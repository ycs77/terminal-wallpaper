# Terminal Wallpaper

此儲存庫包含 Lucas Yang 常用的 Windows Terminal 桌布集合和輔助的 CLI 小工具。

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

新增桌布 collection 到當前環境：

```bash
./terminal-wallpaper add <collection-name>
# 範例：新增一個 collection
./terminal-wallpaper add majotabi
```

更新腳本：

```bash
./terminal-wallpaper update
```

## 設定自動更換終端機背景圖片

您可以使用工作排程器自動更換 Windows Terminal 的背景圖片：

- **名稱:** ChangeTerminalWallpaper
- **觸發程序:** 登入時 / 當任何使用者登入時執行
- **動作:**
  - **程式或指令碼:** `"C:\Program Files\nodejs\node.exe"`
  - **新增引數:** `C:\Users\[user]\.terminal-wallpaper\change-wallpaper.js`

此設定會在使用者登入時，自動執行更換終端機背景圖片的腳本。
