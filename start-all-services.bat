@echo off
echo Starting EdgeFlow Unified System...

echo Starting Shared API on port 3003...
start "Shared API" cmd /k "cd shared-api && node server.js"

echo Starting Agent Kit on port 3001...
start "Agent Kit" cmd /k "cd hedera-agent-kit && npm run dev"

echo Starting CRA DApp on port 3002...
start "CRA DApp" cmd /k "cd hedera-cra-dapp/template && npm start"

echo All services started!
echo.
echo Access points:
echo - Inventory UI: http://localhost:3000
echo - Shared API: http://localhost:3003
echo - Agent Kit: http://localhost:3001
echo - CRA DApp: http://localhost:3002
echo - n8n: http://localhost:5678
echo.
pause 