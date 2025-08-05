# 🚀 Quick Setup - Import & Activate Hedera Workflow

## ✅ **Current Status**
- ✅ **Express Server**: Running on http://localhost:3000
- ✅ **n8n**: Running on http://localhost:5678 (with custom extensions)
- ❌ **Workflow**: Needs to be imported and activated

## 🔧 **3 Simple Steps**

### **Step 1: Open n8n**
- Go to: http://localhost:5678
- You should see the n8n interface

### **Step 2: Import Workflow**
1. **Click "Import from file"** (or drag and drop)
2. **Select**: `inventory-nft-workflow.json`
3. **Click "Import"**

### **Step 3: Activate Workflow**
1. **Click on the imported workflow** to open it
2. **Look for the "Hedera NFT Minting" node**:
   - ✅ **Should show Hedera logo** (not question mark)
   - ✅ **Should be properly connected**
3. **Click the toggle switch** in the top-right corner
4. **You should see**: "Workflow activated" message

## 🧪 **Test It**
```bash
node test-hedera-nft.js
```

## 🎯 **Expected Results**
- ✅ **Status 200** (not 404)
- ✅ **Real Token ID** and **Transaction ID**
- ✅ **Success message**: "Real Hedera NFT minted!"

## 🎉 **Then Test the UI**
1. Go to: http://localhost:3000
2. Use "Manual Entry" tab
3. Enter test data and click "Add Item Manually"
4. Should see real NFT metadata!

---
**The key issue was that the workflow wasn't imported and activated. Once you do this, everything should work!** 🚀 