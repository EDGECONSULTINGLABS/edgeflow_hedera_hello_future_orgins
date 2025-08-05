Write-Host "Starting n8n with CORS enabled for localhost:3000..." -ForegroundColor Green
$env:N8N_CORS_ALLOW_ORIGIN = "http://localhost:3000"
Write-Host "CORS environment variable set to: $env:N8N_CORS_ALLOW_ORIGIN" -ForegroundColor Yellow
n8n 