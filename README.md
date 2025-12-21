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

請先安裝 Node.js 22，然後 clone 此儲存庫：

```bash
git clone https://github.com/ycs77/terminal-wallpaper.git
cd terminal-wallpaper
```

在當前目錄 (terminal-wallpaper) 下執行初始化指令：

```bash
./terminal-wallpaper init
```

然後將你的 Windows Terminal 設定檔 (settings.json) 中的 `profiles.defaults` 設定成以下格式：

```json
{
    "profiles":
    {
        "defaults":
        {
            "backgroundImage": "",
            "backgroundImageAlignment": "center",
            "backgroundImageOpacity": 0.1,
            "backgroundImageStretchMode": "uniformToFill"
        }
    }
}
```

## 使用方式

列出所有可用的桌布集合：

```bash
./terminal-wallpaper list
```

套用指定的桌布集合：

```bash
./terminal-wallpaper use <collection-name>
# 套用一個集合
./terminal-wallpaper use manosaba-characters
```

更新腳本：

```bash
./terminal-wallpaper update
```

## 設定自動更換終端機背景圖片

設定工作排程器，讓使用者登入時，自動執行更換終端機背景圖片的腳本。需要以系統管理員身分執行 PowerShell (將 `[user]` 替換為你的 Windows 使用者名稱)。

建立工作排程器任務：

```ps1
Register-ScheduledTask -TaskName "ChangeTerminalWallpaper" -Action (New-ScheduledTaskAction -Execute "C:\Program Files\nodejs\node.exe" -Argument "C:\Users\[user]\.terminal-wallpaper\change-wallpaper.js") -Trigger (New-ScheduledTaskTrigger -AtLogOn) -Settings (New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries) -RunLevel Limited
```

## 解除安裝

1. 刪除 `C:\Users\[user]\.terminal-wallpaper` 目錄
2. 從 Windows Terminal 設定中移除背景圖片設定
3. 使用 PowerShell 刪除工作排程器任務：`Unregister-ScheduledTask -TaskName "ChangeTerminalWallpaper" -Confirm:$false`
4. 刪除此儲存庫目錄

## 授權

[MIT License](LICENSE.md)

本倉庫中的桌布集合圖片均從網路上取得，版權歸原作者所有。
