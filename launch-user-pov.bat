@echo off
title LightWaste IoT - POV User
color 0B
echo ======================================================================
echo              LIGHTWASTE IoT - POV PENGGUNA (USER)
echo ======================================================================
echo.

cd /d "%~dp0"

netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo Memulakan pelayan Next.js...
    start "LightWaste Next.js Server" cmd /k "cd /d "%~dp0" && pnpm run dev"
    :wait_user
    timeout /t 2 /nobreak >nul
    netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
    if %errorlevel% neq 0 goto wait_user
    timeout /t 2 /nobreak >nul
)

echo Melancarkan Antaramuka POV Pengguna...
start "" "http://localhost:3000/user"
