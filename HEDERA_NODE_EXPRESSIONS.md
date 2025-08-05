# 🔧 Hedera Node Expressions Configuration

## 📋 **Hedera NFT Minting Node Settings**

When you configure the "Hedera NFT Minting" node in n8n, use these expressions to properly read your inventory data:

### **🎯 Required Fields & Expressions**

#### **1. Token ID**
```
0.0.1234567
```
*Replace with your actual Hedera token collection ID*

#### **2. NFT Name**
```
={{ $json.itemName }}
```
*This reads the item name from the webhook data*

#### **3. NFT Description**
```
={{ "Inventory NFT for " + $json.itemName + " (SKU: " + $json.sku + ", Price: $" + $json.price + ")" }}
```
*Creates a descriptive text with item details*

#### **4. NFT Image URL**
```
https://example.com/inventory-nft.jpg
```
*Replace with your actual image URL*

#### **5. NFT Type**
```
image/png
```
*Or your preferred image type*

#### **6. Attributes (JSON Array)**
```
={{ [
  {
    "trait_type": "Item Name",
    "value": $json.itemName
  },
  {
    "trait_type": "SKU", 
    "value": $json.sku
  },
  {
    "trait_type": "Price",
    "value": "$" + $json.price
  },
  {
    "trait_type": "Category",
    "value": "Inventory"
  },
  {
    "trait_type": "Asset Type",
    "value": "Physical Item"
  },
  {
    "trait_type": "Minted Date",
    "value": new Date().toISOString()
  },
  {
    "trait_type": "Source",
    "value": $json.source
  }
] }}
```

## 📊 **Data Flow Explanation**

### **Input Data Structure** (from your frontend)
```json
{
  "itemName": "Solana Pearl Earrings",
  "sku": "AO-E-003", 
  "price": 299.99,
  "timestamp": "2025-08-04T00:01:57.079Z",
  "source": "EdgeFlow Inventory Scanner Pro"
}
```

### **How Expressions Work**
- `$json.itemName` → Reads "Solana Pearl Earrings"
- `$json.sku` → Reads "AO-E-003"
- `$json.price` → Reads 299.99
- `$json.source` → Reads "EdgeFlow Inventory Scanner Pro"

## 🎯 **Complete Node Configuration**

### **Resource**: `nft`
### **NFT Operation**: `mintNft`

### **Field Mappings**:
| Field | Expression | Example Output |
|-------|------------|----------------|
| **Token ID** | `0.0.1234567` | Your collection token ID |
| **NFT Name** | `={{ $json.itemName }}` | "Solana Pearl Earrings" |
| **NFT Description** | `={{ "Inventory NFT for " + $json.itemName + " (SKU: " + $json.sku + ", Price: $" + $json.price + ")" }}` | "Inventory NFT for Solana Pearl Earrings (SKU: AO-E-003, Price: $299.99)" |
| **NFT Image URL** | `https://example.com/inventory-nft.jpg` | Your image URL |
| **NFT Type** | `image/png` | Image type |
| **Attributes** | See JSON array above | Complete metadata |

## 🔧 **Step-by-Step Configuration**

1. **Open the Hedera NFT Minting node** in n8n
2. **Set Resource** to `nft`
3. **Set NFT Operation** to `mintNft`
4. **Copy each expression** above into the corresponding fields
5. **Replace Token ID** with your actual collection token ID
6. **Replace Image URL** with your actual image URL
7. **Save the node configuration**

## 📋 **Expected Output**

After configuration, the node will:
- ✅ Read inventory data from webhook
- ✅ Create NFT with proper metadata
- ✅ Mint on Hedera blockchain
- ✅ Return Token ID and Transaction ID

## 🧪 **Test the Configuration**

After setting up the expressions, test with:
```bash
node test-hedera-nft.js
```

You should receive a response like:
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
    "attributes": [...]
  }
}
```

---

**🎯 These expressions will properly read your inventory data and create meaningful NFTs!** 🚀 