# Hedera NFT Minting Setup Guide

## 🎯 Goal
Configure your EdgeFlow inventory system to automatically mint NFTs on Hedera when items are logged, providing Token ID and Transaction ID metadata.

## 📋 Prerequisites
- ✅ n8n running with CORS enabled
- ✅ Express server running on port 3000
- ✅ Hedera testnet account with HBAR

## 🔧 Step-by-Step Setup

### Step 1: Import the New Workflow
1. Open n8n interface: `http://localhost:5678`
2. Click **"Import from file"**
3. Select: `edgeflow-inventory-with-hedera.json`
4. Click **"Import"**

### Step 2: Configure Hedera Credentials
1. In the imported workflow, click on the **"Mint NFT"** node
2. Click **"Add Credential"** → **"Hedera API"**
3. Configure with your Hedera testnet credentials:
   ```
   Account ID: 0.0.6453152
   Private Key: 0xf77303fd7ed6c1d0bb05df222cb314a083d2a2d91ccc1009a1eb022b2a4b5cb7
   Network: testnet
   ```
4. Save the credential

### Step 3: Update Token ID
1. In the **"Mint NFT"** node, update the `tokenId` field:
   - Replace `0.0.1234567` with your actual token ID
   - Or create a new token collection first

### Step 4: Activate the Workflow
1. Click the **"Activate"** toggle switch
2. Click **"Execute workflow"** to register the webhook

### Step 5: Test the Integration
Run the test script:
```bash
node test-hedera-webhook.js
```

## 🧪 Testing

### Test 1: Command Line
```bash
node test-hedera-webhook.js
```

### Test 2: Web Interface
1. Open: `http://localhost:3000/edgeflow-inventory-pro.html`
2. Add an item manually or scan a barcode
3. Check that Token ID and Transaction ID are populated

## 📊 Expected Response Format

When successful, you should see:
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
    "description": "NFT for Solana Pearl Earrings (SKU: AO-E-003)",
    "image": "https://example.com/nft-image.jpg",
    "attributes": [
      {"trait_type": "SKU", "value": "AO-E-003"},
      {"trait_type": "Price", "value": "299.99"},
      {"trait_type": "Category", "value": "Inventory"},
      {"trait_type": "Minted Date", "value": "2024-01-01T10:00:00.000Z"}
    ]
  }
}
```

## 🔍 Troubleshooting

### Issue 1: "Token not found"
- **Solution**: Create a token collection first or update the tokenId in the workflow

### Issue 2: "Insufficient HBAR"
- **Solution**: Add HBAR to your testnet account via Hedera Portal

### Issue 3: "Invalid credentials"
- **Solution**: Double-check your account ID and private key format

### Issue 4: "Webhook not found"
- **Solution**: Make sure the workflow is activated and executed once

## 🎨 Customization Options

### Update NFT Metadata
In the workflow, modify the **"Mint NFT"** node:
- `nftName`: Customize the NFT name
- `nftDescription`: Add detailed description
- `nftImageUrl`: Set actual image URL
- `attributes`: Add custom attributes

### Token Collection
To create a new token collection:
1. Use the **"Import Inventory"** operation in the Hedera node
2. Set collection name and symbol
3. Use the returned tokenId in your minting workflow

## 🔗 Useful Links
- [Hedera Portal](https://portal.hedera.com/) - Get testnet HBAR
- [HashScan](https://hashscan.io/testnet) - View transactions
- [Hedera Documentation](https://docs.hedera.com/) - API reference

## 🚀 Next Steps
Once working:
1. Create a production token collection
2. Add real NFT images
3. Implement metadata validation
4. Add transaction monitoring
5. Set up error handling and retries 