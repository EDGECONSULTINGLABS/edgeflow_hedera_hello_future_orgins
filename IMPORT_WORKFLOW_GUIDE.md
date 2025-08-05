# 🚨 CRITICAL: Import and Activate the Workflow

## The Problem
Your n8n is running with CORS enabled, but the webhook `working-inventory` is not registered because the workflow hasn't been imported and activated.

## ✅ Step-by-Step Solution

### Step 1: Open n8n in Your Browser
1. Open your web browser
2. Go to: **http://localhost:5678**
3. You should see the n8n interface

### Step 2: Import the Workflow
1. **Click "Import from file"** (usually in the top menu or on the main page)
2. **Click "Choose File"** or drag and drop
3. **Select the file**: `working-webhook.json` (from your project folder)
4. **Click "Import"**

### Step 3: Activate the Workflow
1. After import, you'll see the workflow canvas with two nodes:
   - A **Webhook** node (left)
   - A **Success Response** node (right)
2. **Look for the toggle switch** in the top-right corner of the canvas
3. **Click the toggle switch** to activate it
4. The switch should turn **green/blue** when active

### Step 4: Verify the Webhook URL
1. Click on the **Webhook** node (left node)
2. In the right panel, you should see:
   - **Path**: `working-inventory`
   - **Method**: `POST`
   - **Webhook URL**: `http://localhost:5678/webhook/working-inventory`

### Step 5: Test the Webhook
1. **Open a new terminal** (keep n8n running)
2. **Run the test**:
   ```bash
   node test-working-webhook.js
   ```
3. **Expected result**:
   ```
   ✅ Success! Response: {
     "success": true,
     "message": "Inventory logged successfully!",
     "itemName": "sss",
     "sku": "343f",
     "price": 222.22,
     "tokenId": "0.0.1234567",
     "transactionId": "0.0.6453152@1703123456.123456789",
     "serialNumbers": [1],
     "metadata": { ... }
   }
   ```

## 🔍 Troubleshooting

### If you can't find "Import from file":
- Look for a **"+"** button or **"New Workflow"** button
- Click it and look for **"Import"** option

### If the toggle switch doesn't work:
- Make sure you're on the workflow canvas (not the main page)
- The toggle should be in the **top-right corner** of the canvas area

### If you get "webhook not registered" after import:
- Make sure the workflow is **activated** (toggle is ON)
- Check that the webhook path is exactly: `working-inventory`

### If you get "invalid JSON response":
- The workflow is working but the JSON is malformed
- Check the "Success Response" node configuration

## 📋 Quick Checklist

- [ ] n8n is running on http://localhost:5678
- [ ] Opened n8n in browser
- [ ] Imported `working-webhook.json`
- [ ] Activated the workflow (toggle ON)
- [ ] Tested with `node test-working-webhook.js`
- [ ] Got successful response with Token ID and Transaction ID

## 🎯 Final Result

Once completed, your HTML page will:
1. ✅ Send inventory data without CORS errors
2. ✅ Receive Token ID and Transaction ID
3. ✅ Display Hedera NFT metadata in the inventory log

**The key issue is that you MUST import and activate the workflow manually in the n8n UI. This cannot be done programmatically.** 