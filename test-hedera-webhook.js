const fetch = require('node-fetch');

async function testHederaWebhook() {
    const webhookUrl = 'http://localhost:5678/webhook/edgeflow-inventory-hedera';
    
    const testData = {
        itemName: 'Solana Pearl Earrings',
        sku: 'AO-E-003',
        price: 299.99,
        timestamp: new Date().toISOString(),
        source: 'EdgeFlow Inventory Scanner Pro'
    };

    console.log('🔍 Testing Hedera webhook:', webhookUrl);
    console.log('📤 Sending data:', JSON.stringify(testData, null, 2));

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('📊 Response status:', response.status);
        console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Success! Response:', JSON.stringify(data, null, 2));
            
            // Check for Hedera-specific fields
            if (data.tokenId && data.transactionId) {
                console.log('🎉 Hedera NFT minting successful!');
                console.log(`   Token ID: ${data.tokenId}`);
                console.log(`   Transaction ID: ${data.transactionId}`);
                console.log(`   Serial Numbers: ${data.serialNumbers}`);
            } else {
                console.log('⚠️  Hedera fields missing from response');
            }
        } else {
            const errorText = await response.text();
            console.log('❌ Error response:', errorText);
        }
    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
}

// Test n8n health first
async function testN8nHealth() {
    console.log('🔍 Testing n8n health...');
    try {
        const response = await fetch('http://localhost:5678/healthz');
        console.log('📊 n8n health status:', response.status);
        if (response.ok) {
            const data = await response.text();
            console.log('✅ n8n is healthy:', data);
        } else {
            console.log('❌ n8n health check failed');
        }
    } catch (error) {
        console.log('❌ Cannot connect to n8n:', error.message);
    }
    console.log('');
}

async function runTests() {
    await testN8nHealth();
    await testHederaWebhook();
}

runTests(); 