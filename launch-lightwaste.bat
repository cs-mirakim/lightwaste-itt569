@echo off
title LightWaste IoT - Master Launcher
color 0A
echo ======================================================================
echo             LIGHTWASTE IoT LIGHTING MANAGEMENT SYSTEM
echo ======================================================================
echo.

cd /d "%~dp0"

echo [1/3] Memeriksa status pelayan web (Next.js port 3000)...
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo       [OK] Pelayan Next.js sudah aktif.
) else (
    echo       Pelayan belum aktif. Memulakan 'pnpm run dev' di tetingkap baharu...
    start "LightWaste Next.js Server" cmd /k "cd /d "%~dp0" && pnpm run dev"
    
    echo [2/3] Menunggu pelayan sedia menerima sambungan...
    :wait_loop
    timeout /t 2 /nobreak >nul
    netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
    if %errorlevel% neq 0 (
        echo       Sedang memuatkan modul Next.js...
        goto wait_loop
    )
    timeout /t 2 /nobreak >nul
    echo       [OK] Pelayan siap sedia!
)

echo.
echo [3/3] Melancarkan UI Sistem:
echo       - POV User  : http://localhost:3000/user
echo       - POV Admin : http://localhost:3000/admin
echo.

start "" "http://localhost:3000/user"
timeout /t 1 /nobreak >nul
start "" "http://localhost:3000/admin"

echo ======================================================================
echo  Kedua-dua antaramuka (User & Admin POV) telah berjaya dilancarkan!
echo  Tetingkap ini boleh ditutup bila-bila masa.
echo ======================================================================
echo.
pause
