# 📦 Inventory Group Configuration Guide

## 🎯 **What to Add to Your Inventory Group**

### **Inventory Group Fields**
Based on the frontend data structure, here are the fields you should add to your inventory group:

#### **Required Fields**
1. **Item Name** (Text) - `itemName`
2. **SKU** (Text) - `sku` 
3. **Price** (Number) - `price`
4. **Timestamp** (DateTime) - `timestamp`
5. **Source** (Text) - `source`

#### **NFT Metadata Fields** (After NFT Minting)
6. **Token ID** (Text) - `tokenId`
7. **Transaction ID** (Text) - `transactionId`
8. **Serial Numbers** (JSON Array) - `serialNumbers`
9. **NFT Name** (Text) - `metadata.name`
10. **NFT Description** (Text) - `metadata.description`
11. **NFT Image URL** (Text) - `metadata.image`
12. **NFT Attributes** (JSON Array) - `metadata.attributes`

## 📋 **JSON Structure from Frontend**

### **Input Data (From Frontend)**
```json
{
  "itemName": "Solana Pearl Earrings",
  "sku": "AO-E-003",
  "price": 299.99,
  "timestamp": "2025-01-03T17:30:00.000Z",
  "source": "EdgeFlow Inventory Scanner Pro"
}
```

### **Response Data (After NFT Minting)**
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
      {"trait_type": "Minted Date", "value": "2025-01-03T17:30:00.000Z"}
    ]
  }
}
```

## 🔧 **Inventory Group Setup**

### **Step 1: Create Inventory Group**
1. Go to your inventory management system
2. Create a new group called "EdgeFlow Inventory"
3. Set the group ID to: `INV`

### **Step 2: Add Fields**
Add these fields to your inventory group:

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `itemName` | Text | Product name | "Solana Pearl Earrings" |
| `sku` | Text | Stock keeping unit | "AO-E-003" |
| `price` | Number | Item price | 299.99 |
| `timestamp` | DateTime | When item was added | "2025-01-03T17:30:00.000Z" |
| `source` | Text | Data source | "EdgeFlow Inventory Scanner Pro" |
| `tokenId` | Text | Hedera token ID | "0.0.1234567" |
| `transactionId` | Text | Blockchain transaction | "0.0.6453152@1703123456.123456789" |
| `serialNumbers` | JSON Array | NFT serial numbers | [1] |
| `nftName` | Text | NFT metadata name | "Solana Pearl Earrings" |
| `nftDescription` | Text | NFT description | "Inventory NFT for..." |
| `nftImageUrl` | Text | NFT image URL | "https://example.com/inventory-nft.jpg" |
| `nftAttributes` | JSON Array | NFT metadata attributes | [{"trait_type": "Item Name", "value": "..."}] |

### **Step 3: Configure Data Mapping**
Map the incoming JSON fields to your inventory group fields:

```javascript
// Mapping from frontend to inventory group
const inventoryMapping = {
  "Item Name": "itemName",
  "SKU": "sku", 
  "Price": "price",
  "Timestamp": "timestamp",
  "Source": "source",
  "Token ID": "tokenId",
  "Transaction ID": "transactionId",
  "Serial Numbers": "serialNumbers",
  "NFT Name": "metadata.name",
  "NFT Description": "metadata.description", 
  "NFT Image URL": "metadata.image",
  "NFT Attributes": "metadata.attributes"
};
```

## 📊 **Data Flow**

```
Frontend Input → n8n Webhook → Hedera NFT Minting → Inventory Group
     ↓              ↓              ↓                    ↓
JSON Data    → Process Data → Mint NFT → Store in Inventory
```

## 🎯 **Testing the Integration**

### **Test with Sample Data**
```json
{
  "itemName": "Test Diamond Ring",
  "sku": "TEST-DR-001", 
  "price": 1500.00,
  "timestamp": "2025-01-03T18:00:00.000Z",
  "source": "EdgeFlow Inventory Scanner Pro"
}
```

### **Expected Inventory Entry**
After NFT minting, your inventory should contain:
- **Item Name**: Test Diamond Ring
- **SKU**: TEST-DR-001
- **Price**: $1,500.00
- **Token ID**: 0.0.1234567
- **Transaction ID**: 0.0.6453152@1703123456.123456789
- **NFT Metadata**: Complete NFT attributes

## 🔗 **Integration Points**

1. **Frontend**: Sends inventory data to n8n webhook
2. **n8n**: Processes data and mints NFT
3. **Hedera**: Creates NFT on blockchain
4. **Inventory Group**: Stores complete inventory record

---

**🎉 Your inventory group is now ready to receive EdgeFlow data!** 📦✨ 