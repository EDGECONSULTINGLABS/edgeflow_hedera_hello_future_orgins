# EdgeFlow Services Startup Script
Write-Host "Starting EdgeFlow Services..." -ForegroundColor Green

# Stop any existing Node.js processes
Write-Host "Stopping existing Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start Inventory UI (Port 3000)
Write-Host "Starting Inventory UI on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server.js" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 3

# Start Shared API (Port 3003)
Write-Host "Starting Shared API on port 3003..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\shared-api'; node server.js" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 3

# Start Agent Kit (Port 3001)
Write-Host "Starting Agent Kit on port 3001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\hedera-agent-kit'; npm run dev" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 3

# Start CRA DApp (Port 3002)
Write-Host "Starting CRA DApp on port 3002..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\hedera-cra-dapp'; npm start" -WindowStyle Normal

# Wait for services to start
Write-Host "Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check port status
Write-Host "Checking service status..." -ForegroundColor Green
netstat -an | findstr ":300"

Write-Host "`n🎉 All services started!" -ForegroundColor Green
Write-Host "`nAccess Points:" -ForegroundColor White
Write-Host "- Inventory UI:    http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Shared API:      http://localhost:3003/api/health" -ForegroundColor Cyan
Write-Host "- Agent Kit:       http://localhost:3001" -ForegroundColor Cyan
Write-Host "- CRA DApp:        http://localhost:3002" -ForegroundColor Cyan
Write-Host "- n8n Backend:     http://localhost:5678" -ForegroundColor Cyan

Write-Host "`nNext Steps:" -ForegroundColor White
Write-Host "1. Import workflow in n8n: http://localhost:5678" -ForegroundColor Yellow
Write-Host "2. Configure Hedera credentials" -ForegroundColor Yellow
Write-Host "3. Test inventory system: http://localhost:3000" -ForegroundColor Yellow
Write-Host "4. Test chatbot: http://localhost:3001" -ForegroundColor Yellow
Write-Host "5. Test blockchain UI: http://localhost:3002" -ForegroundColor Yellow

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 