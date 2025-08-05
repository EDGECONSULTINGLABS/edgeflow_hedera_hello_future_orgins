# EdgeFlow Unified Inventory System Startup Script
Write-Host "🚀 Starting EdgeFlow Unified Inventory System..." -ForegroundColor Green

# Check if Docker is running
Write-Host "📋 Checking Docker status..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not available. Please install Docker Desktop." -ForegroundColor Red
    exit 1
}

# Start n8n with Docker
Write-Host "🐳 Starting n8n with Hedera integration..." -ForegroundColor Yellow
docker-compose up -d n8n

# Wait for n8n to start
Write-Host "⏳ Waiting for n8n to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check n8n status
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 5
    Write-Host "✅ n8n is running on http://localhost:5678" -ForegroundColor Green
} catch {
    Write-Host "⚠️ n8n may still be starting up..." -ForegroundColor Yellow
}

# Start shared API
Write-Host "🔗 Starting shared API service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd shared-api; npm install; npm start"

# Wait for shared API
Start-Sleep -Seconds 5

# Start Hedera Agent Kit (if available)
if (Test-Path "hedera-agent-kit") {
    Write-Host "🤖 Starting Hedera Agent Kit..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd hedera-agent-kit; npm install; npm run dev"
}

# Start Hedera CRA DApp (if available)
if (Test-Path "hedera-cra-dapp/template") {
    Write-Host "📱 Starting Hedera CRA DApp..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd hedera-cra-dapp/template; npm install; npm start"
}

# Start current inventory system
Write-Host "📦 Starting current inventory system..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm install; node server.js"

# Display system status
Write-Host "`n🎯 EdgeFlow Unified System Status:" -ForegroundColor Cyan
Write-Host "   n8n (Backend):     http://localhost:5678" -ForegroundColor White
Write-Host "   Inventory UI:      http://localhost:3000" -ForegroundColor White
Write-Host "   Agent Kit (Chat):  http://localhost:3001" -ForegroundColor White
Write-Host "   CRA DApp (Blockchain): http://localhost:3002" -ForegroundColor White
Write-Host "   Shared API:        http://localhost:3003" -ForegroundColor White

Write-Host "`n💡 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Import workflow in n8n: http://localhost:5678" -ForegroundColor White
Write-Host "   2. Configure Hedera credentials" -ForegroundColor White
Write-Host "   3. Test inventory system: http://localhost:3000" -ForegroundColor White
Write-Host "   4. Try the chatbot: http://localhost:3001" -ForegroundColor White
Write-Host "   5. Explore blockchain UI: http://localhost:3002" -ForegroundColor White

Write-Host "`n🎉 System startup complete!" -ForegroundColor Green 