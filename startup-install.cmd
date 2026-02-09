@echo off
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "ChangeTerminalWallpaper" /t REG_SZ /d "wscript.exe \"%USERPROFILE%\.terminal-wallpaper\start.vbs\" \"%USERPROFILE%\.terminal-wallpaper\change-wallpaper.js\"" /f
echo.
echo Terminal Wallpaper startup installed successfully!
pause
