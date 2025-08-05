# 🚀 Activate Hedera NFT Minting Workflow

## Current Status
- ✅ **Express Server**: Running on http://localhost:3000
- ✅ **n8n**: Running on http://localhost:5678  
- ❌ **Hedera NFT Workflow**: NOT ACTIVE (needs to be imported and activated)

## 🔧 Step-by-Step Instructions

### 1. Open n8n Editor
- Go to: http://localhost:5678
- You should see the n8n interface

### 2. Import the Hedera NFT Workflow
1. **Click "Import from file"** (or drag and drop)
2. **Select the file**: `inventory-nft-workflow.json`
3. **Click "Import"**

### 3. Activate the Workflow
1. **Find the imported workflow** (should be named "Inventory NFT Minting Workflow")
2. **Click the toggle switch** in the top-right corner to activate it
3. **You should see**: "Workflow activated" message

### 4. Verify the Workflow
1. **Click on the workflow** to open it
2. **You should see**:
   - Webhook node (inventory-nft)
   - Hedera NFT Minting node
   - Success Response node
   - Error Response node

### 5. Test the Real Hedera NFT Minting
Run this command to test:
```bash
node test-hedera-nft.js
```

## 🎯 Expected Results
After activation, you should see:
- ✅ **Status 200** (not 404)
- ✅ **Real Token ID** (not mock data)
- ✅ **Real Transaction ID** (not mock data)
- ✅ **Success message**: "Real Hedera NFT minted!"

## 🔍 Troubleshooting
If you still get 404 errors:
1. **Check n8n**: Make sure n8n is running
2. **Check workflow**: Make sure "Inventory NFT Minting Workflow" is active
3. **Check webhook URL**: Should be `http://localhost:5678/webhook/inventory-nft`

## 🎉 Next Steps
Once the workflow is active:
1. **Open**: http://localhost:3000
2. **Use the new UI** with real Hedera NFT minting
3. **Test with Manual Entry** or Barcode Scan
4. **See real Token ID and Transaction ID** in the inventory log

---
**Note**: The current UI is now pointing to the real Hedera NFT minting webhook (`inventory-nft`), but the workflow needs to be active for it to work! 