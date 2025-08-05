@echo off
echo Building and starting n8n with custom nodes...
echo.

REM Build the Docker image
echo Building Docker image...
docker build -t edgeflow-n8n .

REM Run the container
echo Starting n8n container...
docker run -d --name edgeflow-n8n-container -p 5678:5678 edgeflow-n8n

echo.
echo n8n is starting up...
echo You can access it at: http://localhost:5678
echo.
echo To stop the container, run: docker stop edgeflow-n8n-container
echo To remove the container, run: docker rm edgeflow-n8n-container
echo.
pause 