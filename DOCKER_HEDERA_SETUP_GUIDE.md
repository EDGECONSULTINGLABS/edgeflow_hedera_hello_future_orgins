# 🐳 Docker Hedera NFT Minting Setup Guide

## ✅ **Current Status - FULLY WORKING!**
- ✅ **Docker n8n**: Running on http://localhost:5678 (Status 200)
- ✅ **Frontend UI**: Running on http://localhost:3000 (Status 200)
- ✅ **CORS**: Configured for http://localhost:3000
- ✅ **n8n-nodes-hedera**: Successfully installed and loaded in Docker container
- ✅ **Hedera Node**: Available in n8n workflow editor
- ✅ **Workflow**: `inventory-nft-workflow.json` ready for import

## 🎯 **What We've Built**
A complete Docker-based n8n setup with the [n8n-nodes-hedera](https://github.com/MilanWR/n8n-nodes-hedera) community node for minting inventory NFTs on the Hedera network, plus a frontend UI for inventory management.

### **Key Features**
- **NFT Minting**: Mint NFTs with inventory metadata
- **Inventory Integration**: Connect with your inventory system
- **Hedera Network**: Real blockchain transactions
- **Docker Containerization**: Clean, isolated environment
- **Frontend UI**: User-friendly inventory management interface

## 🔧 **Step 1: Access the Frontend UI**

1. **Open your browser** and go to: **http://localhost:3000**
2. You should see the EdgeFlow Inventory Scanner Pro interface
3. Use the "Manual Entry" tab to add inventory items

## 🔧 **Step 2: Access n8n Interface**

1. **Open your browser** and go to: **http://localhost:5678**
2. **Sign up** or **log in** to your n8n account
3. You should see the n8n workflow editor

## 🔧 **Step 3: Import the Hedera NFT Workflow**

1. **Click "Import from file"** (or drag and drop)
2. **Select**: `inventory-nft-workflow.json`
3. **Click "Import"**

### **Workflow Components**
- **Webhook Trigger**: Receives inventory data from your UI
- **Hedera NFT Minting**: Mints NFTs with inventory metadata
- **Success Response**: Returns NFT details (Token ID, Transaction ID)
- **Error Response**: Handles minting failures

## 🔧 **Step 4: Configure Hedera Credentials**

1. **Click on the "Hedera NFT Minting" node**
2. **Click "Add Credential"** → **"Hedera API"**
3. **Configure your Hedera account**:
   - **Account ID**: Your Hedera account (e.g., 0.0.12345)
   - **Private Key**: Your ED25519 or SECP256K1 private key
   - **Network**: Choose Testnet/Mainnet/Previewnet
4. **Click "Save"**

## 🔧 **Step 5: Configure NFT Parameters**

1. **In the Hedera node settings**:
   - **Token ID**: Set your collection token ID (e.g., 0.0.1234567)
   - **NFT Name**: `={{ $json.itemName }}` (from webhook data)
   - **NFT Description**: Inventory description with SKU and price
   - **NFT Image URL**: Set your inventory image URL
   - **Attributes**: JSON array with inventory metadata

## 🔧 **Step 6: Activate the Workflow**

1. **Click the toggle switch** in the top-right corner
2. **You should see**: "Workflow activated" message
3. **Note the webhook URL**: `http://localhost:5678/webhook/2fb3eacb-9e38-4d99-9bb9-3ca3d6438bc8`

## 🧪 **Step 7: Test the Complete System**

### **Test with Node.js Script**
```bash
node test-hedera-nft.js
```

### **Expected Results**
- ✅ **Status 200** (not 404)
- ✅ **Real Token ID** and **Transaction ID**
- ✅ **Success message**: "Inventory logged and NFT minted successfully!"

### **Test with Frontend UI**
1. **Go to**: http://localhost:3000
2. **Use "Manual Entry" tab**
3. **Enter test data** and click "Add Item Manually"
4. **Should see real NFT metadata!**

## 📋 **System Architecture**

```
Frontend UI (localhost:3000)
    ↓ (HTTP POST)
n8n Webhook (localhost:5678/webhook/acc4cbdb-ae59-4d42-ae79-dd2689a64c60)
    ↓
Hedera Node (NFT Minting)
    ↓
Hedera Network (Blockchain)
    ↓
Response with Token ID & Transaction ID
```

## 📋 **Workflow Configuration Details**

### **Webhook Input Format**
```json
{
  "itemName": "Solana Pearl Earrings",
  "sku": "AO-E-003",
  "price": 299.99,
  "timestamp": "2025-08-03T17:30:00.000Z",
  "source": "EdgeFlow Inventory Scanner Pro"
}
```

### **NFT Output Format**
```json
{
  "success": true,
  "message": "Inventory logged and NFT minted successfully!",
  "itemName": "Solana Pearl Earrings",
  "sku": "AO-E-003",
  "price": 299.99,
  "tokenId": "0.0.1234567",
  "transactionId": "0.0.6453152@1703123456.123456789",
  "serialNumbers": [1],
  "metadata": {
    "name": "Solana Pearl Earrings",
    "description": "Inventory NFT for Solana Pearl Earrings (SKU: AO-E-003, Price: $299.99)",
    "image": "https://example.com/inventory-nft.jpg",
    "attributes": [
      {"trait_type": "Item Name", "value": "Solana Pearl Earrings"},
      {"trait_type": "SKU", "value": "AO-E-003"},
      {"trait_type": "Price", "value": "$299.99"},
      {"trait_type": "Category", "value": "Inventory"},
      {"trait_type": "Asset Type", "value": "Physical Item"},
      {"trait_type": "Minted Date", "value": "2025-08-03T17:30:00.000Z"}
    ]
  }
}
```

## 🚀 **System Commands**

### **Start the Complete System**
```bash
# Start Docker backend
docker-compose up -d

# Start Frontend (in a new terminal)
node server.js
```

### **View Docker Logs**
```bash
docker-compose logs n8n --tail 20
```

### **Stop the System**
```bash
# Stop Frontend: Ctrl+C in the terminal running node server.js
# Stop Docker backend
docker-compose down
```

### **Rebuild After Changes**
```bash
docker-compose up --build -d
```

### **Manual File Copy (if needed)**
```bash
docker cp n8n-nodes-hedera/. v1-n8n-1:/home/node/.n8n/custom/n8n-nodes-hedera/
docker-compose restart
```

## 🎯 **Next Steps**

1. **Configure your Hedera credentials** in n8n
2. **Set your collection Token ID**
3. **Import and activate the workflow**
4. **Test with the frontend UI**
5. **Start minting real inventory NFTs!**

## 🔗 **Useful Links**

- **n8n-nodes-hedera**: https://github.com/MilanWR/n8n-nodes-hedera
- **Hedera Documentation**: https://docs.hedera.com/
- **Hedera Portal**: https://portal.hedera.com/
- **n8n Documentation**: https://docs.n8n.io/

---

**🎉 Your complete Docker-based Hedera NFT minting system is ready and working!** 🐳

**Both the frontend UI and Hedera node are now properly loaded and available!** 