# 🚀 Immediate Action Plan - Complete n8n Setup

## ⚠️ **Current Issue**
The webhook is returning empty responses because the workflow is not imported in n8n.

## 🎯 **What You Need to Do Right Now**

### **Step 1: Open n8n Interface**
1. **Go to**: http://localhost:5678
2. **Sign up** or **log in** to your n8n account

### **Step 2: Import the Workflow**
1. **Click "Import from file"** (or drag and drop)
2. **Select**: `inventory-nft-workflow.json`
3. **Click "Import"**

### **Step 3: Configure Hedera Node**
1. **Click on the "Hedera NFT Minting" node**
2. **Set these fields**:
   - **Resource**: `nft`
   - **NFT Operation**: `mintNft`
   - **Token ID**: Your actual collection token ID (e.g., `0.0.1234567`)
   - **NFT Name**: `={{ $json.itemName }}`
   - **NFT Description**: `={{ "Inventory NFT for " + $json.itemName + " (SKU: " + $json.sku + ", Price: $" + $json.price + ")" }}`
   - **NFT Image URL**: Your image URL
   - **NFT Type**: `image/png`
   - **Attributes**: Use the JSON array from `HEDERA_NODE_EXPRESSIONS.md`

### **Step 4: Add Hedera Credentials**
1. **Click "Add Credential"** → **"Hedera API"**
2. **Enter your Hedera account details**:
   - **Account ID**: Your Hedera account
   - **Private Key**: Your private key
   - **Network**: Testnet/Mainnet/Previewnet
3. **Click "Save"**

### **Step 5: Activate the Workflow**
1. **Click the toggle switch** in the top-right corner
2. **Verify**: "Workflow activated" message appears

## 🧪 **Test Immediately After Setup**

```bash
node test-hedera-nft.js
```

**Expected Result**: You should see a response with Token ID and Transaction ID, not an empty response.

## 📋 **Quick Reference - Hedera Node Expressions**

### **NFT Name**
```
={{ $json.itemName }}
```

### **NFT Description**
```
={{ "Inventory NFT for " + $json.itemName + " (SKU: " + $json.sku + ", Price: $" + $json.price + ")" }}
```

### **Attributes**
```
={{ [
  {"trait_type": "Item Name", "value": $json.itemName},
  {"trait_type": "SKU", "value": $json.sku},
  {"trait_type": "Price", "value": "$" + $json.price},
  {"trait_type": "Category", "value": "Inventory"},
  {"trait_type": "Asset Type", "value": "Physical Item"},
  {"trait_type": "Minted Date", "value": new Date().toISOString()},
  {"trait_type": "Source", "value": $json.source}
] }}
```

## 🎯 **Success Indicators**

After completing the setup, you should see:
- ✅ **n8n logs**: No more "webhook not registered" messages
- ✅ **Test response**: JSON with Token ID and Transaction ID
- ✅ **Frontend**: Real NFT metadata in inventory log

## 🔗 **Quick Links**

- **n8n Interface**: http://localhost:5678
- **Frontend UI**: http://localhost:3000
- **Test Script**: `node test-hedera-nft.js`
- **Expressions Guide**: `HEDERA_NODE_EXPRESSIONS.md`

---

**🎯 Complete these steps and your system will be fully functional!** 🚀 