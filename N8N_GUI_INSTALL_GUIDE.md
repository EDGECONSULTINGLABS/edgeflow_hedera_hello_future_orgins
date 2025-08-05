# 🎯 n8n GUI Installation for Hedera Node

## 📋 **Official n8n Method (Recommended)**

Based on the [n8n documentation](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/), we can install the Hedera node directly through n8n's GUI interface.

## 🔧 **Step-by-Step Installation**

### **Step 1: Access n8n Settings**
1. Open n8n: http://localhost:5678
2. Go to **Settings** (gear icon in the top-right)
3. Click on **Community Nodes**

### **Step 2: Install Hedera Node**
1. Click **Install**
2. Click **Browse** to search npm packages
3. Search for: `n8n-nodes-hedera`
4. Select the package: `n8n-nodes-hedera`
5. Click **Install**
6. Agree to the risks: "I understand the risks of installing unverified code from a public source"

### **Step 3: Verify Installation**
1. The Hedera node should appear in the **Community Nodes** list
2. You should see it in the node palette when creating workflows

## 🎯 **Benefits of GUI Installation**
- ✅ **Official n8n method**
- ✅ **No environment variables needed**
- ✅ **Automatic updates available**
- ✅ **Easier management**
- ✅ **No custom extensions setup**

## 🔄 **Next Steps After Installation**
1. **Import workflow**: Use `inventory-nft-workflow.json`
2. **Configure Hedera credentials**: Set up your Hedera account
3. **Activate workflow**: Click the toggle switch
4. **Test webhook**: Run `node test-hedera-nft.js`

## 🚀 **Why This is Better**
- Uses n8n's official community node system
- No need for custom extensions environment variables
- Automatic version management
- Cleaner setup process

---
**Let's use n8n's official GUI installation method!** 🎯 