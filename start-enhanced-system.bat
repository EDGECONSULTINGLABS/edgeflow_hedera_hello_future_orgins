@echo off
echo Starting EdgeFlow Enhanced Unified System...

echo Starting Shared API on port 3003...
start "Shared API" cmd /k "cd shared-api && node server.js"

echo Starting Inventory UI on port 3000...
start "Inventory UI" cmd /k "npm start"

echo Starting Agent Kit on port 3001...
start "Agent Kit" cmd /k "cd hedera-agent-kit && npm run dev"

echo Starting CRA DApp on port 3002...
start "CRA DApp" cmd /k "cd hedera-cra-dapp && npm start"

echo.
echo ========================================
echo EdgeFlow Unified System Starting...
echo ========================================
echo.
echo Access Points:
echo - n8n Backend:     http://localhost:5678
echo - Inventory UI:    http://localhost:3000
echo - Shared API:      http://localhost:3003/api/health
echo - Agent Kit:       http://localhost:3001
echo - CRA DApp:        http://localhost:3002
echo.
echo Next Steps:
echo 1. Import workflow in n8n: http://localhost:5678
echo 2. Configure Hedera credentials
echo 3. Test inventory system: http://localhost:3000
echo 4. Test chatbot: http://localhost:3001
echo 5. Test blockchain UI: http://localhost:3002
echo.
pause 