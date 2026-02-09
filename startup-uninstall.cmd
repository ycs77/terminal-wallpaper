@echo off
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "ChangeTerminalWallpaper" /f
echo.
echo Terminal Wallpaper startup uninstalled successfully!
pause
