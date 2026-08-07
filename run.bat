@echo off
cd /d "%~dp0"

REM 8446 avoids the sibling projects: GreyEdge 8444, SkinProtocolRX 8443/8445, RKidds 8765.
set PORT=8446
set URL=http://127.0.0.1:%PORT%

REM Free the port if a previous dev server is still holding it
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  echo Port %PORT% is in use by PID %%a - stopping it...
  taskkill /PID %%a /F >nul 2>&1
)

where pnpm >nul 2>&1
if errorlevel 1 (
  echo ERROR: pnpm was not found on PATH.
  echo Open a terminal where "pnpm --version" works, or install pnpm via mise.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  pnpm install
  if errorlevel 1 (
    echo ERROR: pnpm install failed.
    pause
    exit /b 1
  )
)

echo Starting The GreyEdge Group on %URL%
echo Opening browser when the server is ready...

REM Wait until the port accepts connections, then open the default browser.
start "" powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p=%PORT%; $u='%URL%'; for ($i=0; $i -lt 90; $i++) { try { $c = New-Object Net.Sockets.TcpClient; $c.Connect('127.0.0.1',$p); $c.Close(); Start-Process $u; exit 0 } catch {} ; Start-Sleep -Milliseconds 500 }; Write-Host ('Timed out waiting for '+$u); Read-Host 'Press Enter'"

pnpm dev
pause
