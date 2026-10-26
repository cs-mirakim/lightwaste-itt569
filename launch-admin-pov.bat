@echo off
title LightWaste IoT - POV Admin
color 0E
echo ======================================================================
echo             LIGHTWASTE IoT - POV PENTADBIR (ADMIN)
echo ======================================================================
echo.

cd /d "%~dp0"

netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo Memulakan pelayan Next.js...
    start "LightWaste Next.js Server" cmd /k "cd /d "%~dp0" && pnpm run dev"
    :wait_admin
    timeout /t 2 /nobreak >nul
    netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
    if %errorlevel% neq 0 goto wait_admin
    timeout /t 2 /nobreak >nul
)

echo Melancarkan Antaramuka POV Pentadbir (Bento Grid Dashboard)...
start "" "http://localhost:3000/admin"
