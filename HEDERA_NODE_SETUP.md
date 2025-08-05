# 🔧 Hedera Node Setup Guide

## 🎯 Problem
The Hedera node is missing from your n8n installation, which is why the webhook is returning empty responses.

## 📋 Prerequisites
- n8n is running on http://localhost:5678
- You have the `n8n-nodes-hedera` directory in your workspace

## 🚀 Step-by-Step Installation

### Step 1: Install the Hedera Node
```bash
# Navigate to the Hedera node directory
cd n8n-nodes-hedera

# Install dependencies
npm install

# Build the node
npm run build

# Install the node globally for n8n
npm install -g .
```

### Step 2: Restart n8n
```bash
# Stop n8n (Ctrl+C)
# Then restart with CORS enabled
$env:N8N_CORS_ALLOW_ORIGIN = "http://localhost:3000"; n8n
```

### Step 3: Verify Installation
1. **Open n8n**: http://localhost:5678
2. **Create a new workflow**
3. **Add a node** - you should see "Hedera" in the node list
4. **If not visible**, the installation failed

## 🔧 Alternative Installation Methods

### Method 1: Direct Installation
```bash
# From your main directory
cd n8n-nodes-hedera
npm install
npm run build
npm install -g .
```

### Method 2: Development Installation
```bash
# For development/testing
cd n8n-nodes-hedera
npm install
npm run build
npm link
```

### Method 3: Manual Copy
```bash
# Copy the built files to n8n's custom nodes directory
# This varies by installation method
```

## 🧪 Testing the Installation

### Test 1: Check Node Availability
1. Open n8n: http://localhost:5678
2. Create new workflow
3. Add node → Search "Hedera"
4. Should see "Hedera" node available

### Test 2: Import and Test Workflow
1. **Import**: `inventory-nft-workflow.json`
2. **Activate** the workflow
3. **Test**: `node test-inventory-nft.js`

## 🎯 Expected Results

### Successful Installation:
- Hedera node appears in n8n node list
- Workflow imports without errors
- Test script returns proper JSON response

### Failed Installation:
- Hedera node not visible in n8n
- Import errors about missing node type
- Empty responses from webhook

## 🔧 Troubleshooting

### Issue 1: Node Not Visible
```bash
# Check if node was built properly
ls n8n-nodes-hedera/dist/nodes/Hedera/

# Rebuild if needed
cd n8n-nodes-hedera
npm run build
npm install -g .
```

### Issue 2: Import Errors
- Make sure n8n is restarted after installation
- Check n8n logs for node loading errors
- Verify the node type in the workflow JSON

### Issue 3: Still Empty Responses
- The workflow might not be saved/activated
- Check the "Respond to Webhook" node configuration
- Verify the Hedera node credentials (if required)

## 📋 Checklist

- [ ] Hedera node built successfully
- [ ] Node installed globally
- [ ] n8n restarted
- [ ] Hedera node visible in n8n
- [ ] Workflow imported successfully
- [ ] Workflow activated
- [ ] Test script runs without errors
- [ ] Webhook returns proper JSON response

## 🎉 Success Indicators

When everything is working correctly:
1. **Hedera node** appears in n8n node list
2. **Workflow imports** without errors
3. **Test script** returns:
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
     "metadata": { ... }
   }
   ```

## 🚨 Next Steps

After successful installation:
1. **Import**: `inventory-nft-workflow.json`
2. **Activate** the workflow
3. **Test**: `node test-inventory-nft.js`
4. **Update HTML**: Already done - points to `/webhook/inventory-nft`
5. **Test from browser**: http://localhost:3000

**The key is making sure the Hedera node is properly installed and n8n is restarted!** 