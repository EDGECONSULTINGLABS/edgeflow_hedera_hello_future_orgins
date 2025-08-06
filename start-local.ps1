Write-Host "🚀 Starting EdgeFlow Local Development Environment..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Building and starting Docker containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.local.yml up -d --build

Write-Host ""
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "🌐 Services are now running:" -ForegroundColor Green
Write-Host "   - Frontend UI: http://localhost:8081" -ForegroundColor Cyan
Write-Host "   - n8n Backend: http://localhost:5678" -ForegroundColor Cyan
Write-Host "   - n8n Admin: http://localhost:8080/n8n/" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔧 Installing Hedera SDK in n8n container..." -ForegroundColor Yellow
docker exec edgeflow-n8n-local npm install @hashgraph/sdk --prefix /home/node/.n8n

Write-Host ""
Write-Host "✅ Local development environment is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Open http://localhost:8081 in your browser" -ForegroundColor White
Write-Host "   2. Import your n8n workflow" -ForegroundColor White
Write-Host "   3. Test the inventory management system" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop the services, run: docker-compose -f docker-compose.local.yml down" -ForegroundColor Red
Write-Host ""
Read-Host "Press Enter to continue..." 