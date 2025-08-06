@echo off
echo 🚀 Starting EdgeFlow Local Development Environment...
echo.

echo 📦 Building and starting Docker containers...
docker-compose -f docker-compose.local.yml up -d --build

echo.
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak > nul

echo.
echo 🌐 Services are now running:
echo    - Frontend UI: http://localhost:8081
echo    - n8n Backend: http://localhost:5678
echo    - n8n Admin: http://localhost:8080/n8n/
echo.

echo 🔧 Installing Hedera SDK in n8n container...
docker exec edgeflow-n8n-local npm install @hashgraph/sdk --prefix /home/node/.n8n

echo.
echo ✅ Local development environment is ready!
echo.
echo 📝 Next steps:
echo    1. Open http://localhost:8081 in your browser
echo    2. Import your n8n workflow
echo    3. Test the inventory management system
echo.
echo 🛑 To stop the services, run: docker-compose -f docker-compose.local.yml down
echo.
pause 