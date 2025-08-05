# 🚀 Quick Setup Guide - Complete n8n & Hedera Configuration

## ✅ **Current Status**
- ✅ **n8n**: Running on http://localhost:5678
- ✅ **Frontend**: Running on http://localhost:3000  
- ✅ **Docker**: Container is up and running
- ⚠️ **Workflow**: Needs import and Hedera credentials

## 🔧 **Step 1: Access n8n Interface**

1. **Open your browser** and go to: **http://localhost:5678**
2. **Sign up** or **log in** to your n8n account
3. You should see the n8n workflow editor

## 🔧 **Step 2: Import the Hedera NFT Workflow**

1. **Click "Import from file"** (or drag and drop)
2. **Select**: `inventory-nft-workflow.json`
3. **Click "Import"**

### **Expected Workflow Components**
- **Webhook Trigger**: Receives inventory data
- **Hedera NFT Minting**: Mints NFTs with metadata
- **Success Response**: Returns Token ID and Transaction ID
- **Error Response**: Handles minting failures

## 🔧 **Step 3: Configure Hedera Credentials**

1. **Click on the "Hedera NFT Minting" node**
2. **Click "Add Credential"** → **"Hedera API"**
3. **Configure your Hedera account**:
   - **Account ID**: Your Hedera account (e.g., 0.0.12345)
   - **Private Key**: Your ED25519 or SECP256K1 private key
   - **Network**: Choose Testnet/Mainnet/Previewnet
4. **Click "Save"**

## 🔧 **Step 4: Configure NFT Parameters**

1. **In the Hedera node settings**:
   - **Token ID**: Set your collection token ID (e.g., 0.0.1234567)
   - **NFT Name**: `={{ $json.itemName }}` (from webhook data)
   - **NFT Description**: Inventory description with SKU and price
   - **NFT Image URL**: Set your inventory image URL
   - **Attributes**: JSON array with inventory metadata

## 🔧 **Step 5: Activate the Workflow**

1. **Click the toggle switch** in the top-right corner
2. **You should see**: "Workflow activated" message
3. **Note the webhook URL**: `http://localhost:5678/webhook/acc4cbdb-ae59-4d42-ae79-dd2689a64c60`

## 🧪 **Step 6: Test the Complete System**

### **Test with Terminal**
```bash
node test-hedera-nft.js
```

### **Expected Results**
- ✅ **Status 200** (not 404)
- ✅ **Real Token ID** and **Transaction ID**
- ✅ **Success message**: "Inventory logged and NFT minted successfully!"

### **Test with Frontend**
1. **Go to**: http://localhost:3000
2. **Use "Manual Entry" tab**
3. **Enter test data** and click "Add Item Manually"
4. **Should see real NFT metadata!**

## 📋 **Troubleshooting**

### **If Webhook Returns 404**
- Make sure workflow is imported and activated
- Check that webhook URL matches the one in n8n

### **If Hedera Node Fails**
- Verify Hedera credentials are correct
- Check that Token ID is valid
- Ensure you have sufficient HBAR balance

### **If Frontend Doesn't Update**
- Hard refresh browser (Ctrl+F5)
- Check browser console for errors
- Verify webhook URL in frontend code

## 🎯 **Success Indicators**

✅ **Complete Success Response**:
```json
{
  "success": true,
  "message": "Inventory logged and NFT minted successfully!",
  "itemName": "Test Diamond Ring",
  "sku": "TEST-DR-001",
  "price": 1500,
  "tokenId": "0.0.1234567",
  "transactionId": "0.0.6453152@1703123456.123456789",
  "serialNumbers": [1],
  "metadata": {
    "name": "Test Diamond Ring",
    "description": "Inventory NFT for...",
    "attributes": [...]
  }
}
```

## 🔗 **Useful Links**

- **n8n Interface**: http://localhost:5678
- **Frontend UI**: http://localhost:3000
- **Test Script**: `node test-hedera-nft.js`
- **Hedera Portal**: https://portal.hedera.com/

---

**🎉 Once configured, your complete Hedera NFT minting system will be ready!** 🚀✨ 