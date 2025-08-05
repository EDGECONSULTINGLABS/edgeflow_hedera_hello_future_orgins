# Complete CORS Setup Guide for EdgeFlow Inventory

## ✅ CORS Environment Variable is Now Set

The CORS environment variable has been configured to allow requests from `http://localhost:3000` (your Express server).

## 🚀 How to Start n8n with CORS Enabled

### Option 1: PowerShell Script (Recommended)
```powershell
.\start-n8n-with-cors.ps1
```

### Option 2: Batch Script
```cmd
.\start-n8n-with-cors.bat
```

### Option 3: Manual Command
```powershell
$env:N8N_CORS_ALLOW_ORIGIN = "http://localhost:3000"; n8n
```

## 🔧 Current Status

- ✅ n8n is running on port 5678
- ✅ CORS is configured for localhost:3000
- ❌ Webhook workflow not imported/activated

## 📋 CRITICAL NEXT STEPS

You need to import and activate the workflow in n8n:

1. **Open n8n in your browser**: http://localhost:5678

2. **Import the workflow**:
   - Click "Import from file" or "Import from URL"
   - Select the file: `working-webhook.json`
   - Click "Import"

3. **Activate the workflow**:
   - After import, you'll see the workflow canvas
   - Click the toggle switch in the top-right corner to activate it
   - The switch should turn green/blue when active

4. **Test the webhook**:
   - Run: `node test-working-webhook.js`
   - Or test from your HTML page

## 🧪 Testing

After importing and activating the workflow, test with:

```bash
node test-working-webhook.js
```

You should see:
- ✅ Status: 200
- ✅ Valid JSON response with Token ID and Transaction ID

## 🔍 Troubleshooting

### If you get "webhook not registered":
- Make sure the workflow is imported
- Make sure the workflow is activated (toggle switch is ON)
- Check that the webhook path matches: `working-inventory`

### If you get CORS errors:
- Verify n8n was started with the CORS environment variable
- Check that your HTML page is served from `http://localhost:3000`

### If you get "invalid JSON response":
- The workflow is responding but with malformed JSON
- Check the workflow's "Respond to Webhook" node configuration

## 📁 Files Created/Updated

- `start-n8n-with-cors.ps1` - PowerShell script to start n8n with CORS
- `start-n8n-with-cors.bat` - Batch script to start n8n with CORS
- `working-webhook.json` - n8n workflow file
- `test-working-webhook.js` - Test script for the webhook

## 🎯 Expected Result

After completing these steps, your HTML page should be able to:
1. Send inventory data to n8n without CORS errors
2. Receive a response with Token ID and Transaction ID
3. Display the Hedera NFT metadata in the inventory log 