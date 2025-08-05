const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());

// Configuration
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/inventory-nft';
const HEDERA_NETWORK = process.env.HEDERA_NETWORK || 'testnet';

// In-memory inventory storage (replace with database in production)
let inventory = [];
let nftCollections = [];
let transactions = [];

// API Routes

// Get all inventory items
app.get('/api/inventory', (req, res) => {
  res.json({
    success: true,
    data: inventory,
    total: inventory.length,
    totalValue: inventory.reduce((sum, item) => sum + (item.price || 0), 0)
  });
});

// Get inventory item by SKU
app.get('/api/inventory/:sku', (req, res) => {
  const item = inventory.find(i => i.sku === req.params.sku);
  if (item) {
    res.json({ success: true, data: item });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

// Add inventory item (with NFT minting)
app.post('/api/inventory', async (req, res) => {
  try {
    const { itemName, sku, price, timestamp, source } = req.body;
    
    // Add to local inventory
    const newItem = {
      id: Date.now().toString(),
      itemName,
      sku,
      price: parseFloat(price),
      timestamp: timestamp || new Date().toISOString(),
      source: source || 'API',
      status: 'processing'
    };
    
    inventory.push(newItem);
    
    // Send to n8n for NFT minting
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });
    
    if (n8nResponse.ok) {
      const n8nData = await n8nResponse.json();
      newItem.status = 'minted';
      newItem.nftData = n8nData;
      
      // Add to transactions
      transactions.push({
        id: Date.now().toString(),
        type: 'inventory_added',
        item: newItem,
        timestamp: new Date().toISOString(),
        n8nResponse: n8nData
      });
      
      res.json({
        success: true,
        message: 'Inventory item added and NFT minted',
        data: newItem,
        nftData: n8nData
      });
    } else {
      newItem.status = 'error';
      res.status(500).json({
        success: false,
        message: 'Failed to mint NFT',
        data: newItem
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get NFT collections
app.get('/api/collections', (req, res) => {
  res.json({
    success: true,
    data: nftCollections,
    total: nftCollections.length
  });
});

// Get transaction history
app.get('/api/transactions', (req, res) => {
  const { limit = 50, offset = 0 } = req.query;
  const paginatedTransactions = transactions
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json({
    success: true,
    data: paginatedTransactions,
    total: transactions.length,
    pagination: {
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: parseInt(offset) + parseInt(limit) < transactions.length
    }
  });
});

// Chatbot API for inventory queries
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    console.log(`[1/4] Received message from chatbot UI: "${message}"`);

    // Step 1: Get current inventory data for AI context
    const inventoryData = inventory.slice(-10); // Get last 10 items for context
    console.log('[2/4] Fetched inventory data to build AI context.');

    // Step 2: Construct the prompt for the AI
    const prompt = `
      You are an inventory management assistant for EdgeFlow. Based on the following inventory data, answer the user's question in a helpful and professional manner.
      
      Current Inventory Data: ${JSON.stringify(inventoryData, null, 2)}
      Total Items: ${inventory.length}
      Total Value: $${inventory.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
      
      User Question: "${message}"
      
      Please provide a clear, helpful response about the inventory system.
    `;
    console.log('[3/4] Sending prompt to AI processing...');

    // Step 3: Process with enhanced chatbot logic
    const response = await processChatMessage(message, context);
    console.log(`[4/4] Generated response: "${response.text}"`);

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error in /api/chat endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Chat error',
      error: error.message
    });
  }
});

// Analytics API
app.get('/api/analytics', (req, res) => {
  const totalValue = inventory.reduce((sum, item) => sum + (item.price || 0), 0);
  const mintedCount = inventory.filter(item => item.status === 'minted').length;
  const errorCount = inventory.filter(item => item.status === 'error').length;
  
  res.json({
    success: true,
    data: {
      totalItems: inventory.length,
      totalValue,
      mintedNFTs: mintedCount,
      errors: errorCount,
      successRate: inventory.length > 0 ? (mintedCount / inventory.length * 100).toFixed(2) : 0,
      recentTransactions: transactions.slice(-10)
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      n8n: N8N_WEBHOOK_URL,
      hederaNetwork: HEDERA_NETWORK,
      inventoryCount: inventory.length,
      transactionCount: transactions.length
    }
  });
});

// Chatbot message processing
async function processChatMessage(message, context = {}) {
  const lowerMessage = message.toLowerCase();
  
  // Inventory queries
  if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
    return {
      type: 'inventory_summary',
      text: `Current inventory: ${inventory.length} items with total value of $${inventory.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}`,
      data: {
        totalItems: inventory.length,
        totalValue: inventory.reduce((sum, item) => sum + (item.price || 0), 0)
      }
    };
  }
  
  if (lowerMessage.includes('latest') || lowerMessage.includes('recent')) {
    const recentItems = inventory.slice(-5);
    return {
      type: 'recent_items',
      text: `Recent items: ${recentItems.map(item => `${item.itemName} ($${item.price})`).join(', ')}`,
      data: recentItems
    };
  }
  
  if (lowerMessage.includes('expensive') || lowerMessage.includes('highest price')) {
    const mostExpensive = inventory.reduce((max, item) => item.price > max.price ? item : max, { price: 0 });
    return {
      type: 'most_expensive',
      text: `Most expensive item: ${mostExpensive.itemName} at $${mostExpensive.price}`,
      data: mostExpensive
    };
  }
  
  if (lowerMessage.includes('sku') && context.sku) {
    const item = inventory.find(i => i.sku.toLowerCase().includes(context.sku.toLowerCase()));
    if (item) {
      return {
        type: 'item_details',
        text: `Found item: ${item.itemName} - SKU: ${item.sku}, Price: $${item.price}`,
        data: item
      };
    }
  }
  
  // Default response
  return {
    type: 'general',
    text: "I can help you with inventory questions. Try asking about stock levels, recent items, or specific SKUs.",
    suggestions: [
      "What items are in stock?",
      "Show me the latest items",
      "What's the most expensive item?",
      "Find item by SKU"
    ]
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Shared API Server running on port ${PORT}`);
  console.log(`📱 Available at: http://localhost:${PORT}`);
  console.log(`💚 Health check at: http://localhost:${PORT}/api/health`);
  console.log(`📋 Connected services:`);
  console.log(`   n8n Webhook: ${N8N_WEBHOOK_URL}`);
  console.log(`   Hedera Network: ${HEDERA_NETWORK}`);
});

module.exports = app; 