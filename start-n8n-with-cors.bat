@echo off
echo Starting n8n with CORS enabled for localhost:3000...
set N8N_CORS_ALLOW_ORIGIN=http://localhost:3000
echo CORS environment variable set to: %N8N_CORS_ALLOW_ORIGIN%
n8n
pause 