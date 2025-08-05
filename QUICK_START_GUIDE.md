# 🚀 Quick Start Guide - Inventory NFT System

## 🎯 Current Status
- ✅ **n8n**: Running on http://localhost:5678 with CORS enabled
- ✅ **Express Server**: Running on http://localhost:3000
- ✅ **Hedera Node**: Installed and ready
- ❌ **Workflow**: Not imported yet (that's why you see question marks)

## 🔧 IMMEDIATE ACTION REQUIRED

### Step 1: Import the Simple Workflow
1. **Open n8n**: http://localhost:5678
2. **Click "Import from file"**
3. **Select**: `simple-inventory-workflow.json`
4. **Click "Import"**
5. **Activate the workflow** (toggle switch in top-right)

### Step 2: Test the Workflow
```bash
node test-simple-inventory.js
```

### Step 3: Test from Browser
1. **Open**: http://localhost:3000
2. **Go to "Manual Entry" tab**
3. **Enter**: 
   - Item Name: `Solana Pearl Earrings`
   - SKU: `AO-E-003`
   - Price: `299.99`
4. **Click "Add Item Manually"**
5. **Check for Token ID and Transaction ID** in the inventory log

## 🎯 Expected Results

### After Import and Activation:
- ✅ Workflow appears in n8n workflows list
- ✅ Toggle switch is ON (green/blue)
- ✅ Test script returns proper JSON
- ✅ Browser shows Token ID and Transaction ID

### Sample Response:
```json
{
  "success": true,
  "message": "Inventory logged successfully!",
  "itemName": "Solana Pearl Earrings",
  "sku": "AO-E-003",
  "price": 299.99,
  "tokenId": "0.0.1234567",
  "transactionId": "0.0.6453152@1703123456.123456789",
  "serialNumbers": [1],
  "metadata": {
    "name": "Solana Pearl Earrings",
    "description": "Inventory NFT for Solana Pearl Earrings (SKU: AO-E-003, Price: $299.99)",
    "attributes": [...]
  }
}
```

## 🚨 If You Still See Question Marks

### The question marks mean:
- The workflow is trying to use nodes that aren't loaded
- You need to import a working workflow first

### Solution:
1. **Delete the broken workflows** (the ones with question marks)
2. **Import**: `simple-inventory-workflow.json`
3. **Activate** the new workflow
4. **Test**: `node test-simple-inventory.js`

## 🎉 Success Indicators

- ✅ No more question marks in n8n
- ✅ Workflow imports without errors
- ✅ Test script returns JSON with Token ID and Transaction ID
- ✅ Browser inventory logging shows NFT metadata
- ✅ Inventory log displays: "Token ID: 0.0.1234567" and "Transaction ID: 0.0.6453152@1703123456.123456789"

## 📁 Key Files
- `simple-inventory-workflow.json` - Working workflow (no Hedera node required)
- `test-simple-inventory.js` - Test script
- `edgeflow-inventory-pro.html` - Frontend (updated to use simple workflow)

## 🚀 Next Steps After Success

Once the simple workflow is working:
1. **Test from browser**: Add inventory items
2. **Verify NFT metadata**: Check Token ID and Transaction ID
3. **Optional**: Import the full Hedera workflow later

**The key is importing and activating the `simple-inventory-workflow.json` file!** 🎯 