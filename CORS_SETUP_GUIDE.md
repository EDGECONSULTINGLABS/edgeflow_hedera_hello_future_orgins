# CORS Setup Guide for EdgeFlow Inventory System

## Overview
This guide helps you configure CORS (Cross-Origin Resource Sharing) to allow your HTML frontend to communicate with n8n webhooks.

## Current Configuration
- **Frontend Server**: Express.js running on `http://localhost:3000`
- **n8n Server**: Running on `http://localhost:5678`
- **HTML File**: `edgeflow-inventory-pro.html` makes fetch requests to n8n webhooks

## Option 1: Using Docker Compose (Recommended)

### Step 1: Update Docker Compose
The `docker-compose.yml` file has been updated with the CORS environment variable:

```yaml
environment:
  - N8N_CORS_ALLOW_ORIGIN=http://localhost:3000
```

### Step 2: Restart n8n with Docker
```bash
# Stop existing containers
docker-compose down

# Start with new CORS configuration
docker-compose up --build
```

## Option 2: Direct n8n Installation

### Using Windows Batch File
Run the provided `start-n8n-with-cors.bat` file:
```bash
start-n8n-with-cors.bat
```

### Using PowerShell
Run the provided `start-n8n-with-cors.ps1` file:
```powershell
.\start-n8n-with-cors.ps1
```

### Manual Command
```bash
set N8N_CORS_ALLOW_ORIGIN=http://localhost:3000 && n8n
```

## Option 3: Using .env File

Create a `.env` file in your project root:
```env
N8N_CORS_ALLOW_ORIGIN=http://localhost:3000
```

Then start n8n normally:
```bash
n8n
```

## Testing the Setup

### Step 1: Start Your Services
1. Start your Express server:
   ```bash
   node server.js
   ```
   This will run on `http://localhost:3000`

2. Start n8n with CORS enabled (using any method above)

### Step 2: Test the Connection
1. Open your browser and navigate to `http://localhost:3000`
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Try triggering a scan or form submission
5. Check for CORS errors in the console

### Step 3: Verify Success
✅ **Success Indicators:**
- No CORS errors in the browser console
- Network requests to n8n webhooks complete successfully
- Form submissions work without errors

❌ **If CORS errors persist:**
- Double-check the port numbers match
- Ensure n8n is running with the correct environment variable
- Verify the webhook URLs in your HTML file

## Troubleshooting

### Common Issues

1. **Wrong Port Number**
   - Make sure `N8N_CORS_ALLOW_ORIGIN` matches your frontend server port
   - Current setup: `http://localhost:3000`

2. **n8n Not Restarted**
   - Environment variables only take effect when n8n starts
   - Always restart n8n after changing CORS settings

3. **Multiple Origins**
   - For multiple origins, separate with commas:
   ```bash
   N8N_CORS_ALLOW_ORIGIN=http://localhost:3000,http://localhost:5500
   ```

4. **Wildcard (Not Recommended for Production)**
   ```bash
   N8N_CORS_ALLOW_ORIGIN=*
   ```

### Debug Commands

Check if n8n is running with CORS enabled:
```bash
# Check environment variables
echo $N8N_CORS_ALLOW_ORIGIN

# Check n8n logs
docker-compose logs n8n
```

## Security Notes

- Only allow necessary origins in production
- Avoid using wildcard (`*`) in production environments
- Consider using HTTPS in production with appropriate origins

## Next Steps

Once CORS is configured:
1. Test your webhook workflows in n8n
2. Verify data flows correctly between frontend and n8n
3. Check that NFT minting and inventory updates work as expected 