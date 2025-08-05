# 🎯 Final Setup Guide - n8n GUI Installation

## ✅ **Current Status**
- ✅ **n8n**: Running on http://localhost:5678 (Status 200)
- ✅ **CORS**: Configured for http://localhost:3000
- ❌ **Hedera Node**: Needs to be installed via GUI
- ❌ **Workflow**: Needs to be imported

## 🔧 **Step 1: Install Hedera Node via GUI**

### **Access n8n Settings**
1. Open your browser and go to: **http://localhost:5678**
2. Click the **Settings** gear icon (top-right corner)
3. Click on **Community Nodes**

### **Install the Hedera Node**
1. Click **Install**
2. Click **Browse** to search npm packages
3. Search for: `n8n-nodes-hedera`
4. Select the package: `n8n-nodes-hedera`
5. Click **Install**
6. Check the box: "I understand the risks of installing unverified code from a public source"
7. Click **Install** to confirm

## 🔧 **Step 2: Import and Configure Workflow**

### **Import the Workflow**
1. Go back to the main n8n interface
2. Click **Import from file** (or drag and drop)
3. Select: `inventory-nft-workflow.json`
4. Click **Import**

### **Configure the Hedera Node**
1. Click on the imported workflow to open it
2. Look for the **"Hedera NFT Minting"** node
3. Click on the Hedera node to configure it:
   - Set up your Hedera credentials
   - Configure the NFT minting parameters

### **Activate the Workflow**
1. Click the **toggle switch** in the top-right corner
2. You should see: "Workflow activated" message

## 🧪 **Step 3: Test Everything**

### **Test the Webhook**
```bash
node test-hedera-nft.js
```

### **Expected Results**
- ✅ **Status 200** (not 404)
- ✅ **Real Token ID** and **Transaction ID**
- ✅ **Success message**: "Real Hedera NFT minted!"

### **Test the UI**
1. Go to: http://localhost:3000
2. Use "Manual Entry" tab
3. Enter test data and click "Add Item Manually"
4. Should see real NFT metadata!

## 🎯 **Why This Method is Better**
- ✅ **Official n8n method** from the [documentation](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/)
- ✅ **No environment variables** needed
- ✅ **Automatic updates** available
- ✅ **Cleaner setup** process
- ✅ **Easier management** through n8n GUI

## 🚀 **Next Steps**
1. Follow the GUI installation steps above
2. Import and configure the workflow
3. Test the webhook and UI
4. Start minting real NFTs!

---
**This is the official n8n way to install community nodes!** 🎯 