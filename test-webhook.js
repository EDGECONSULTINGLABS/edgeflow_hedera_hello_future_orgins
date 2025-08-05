const fetch = require('node-fetch');

async function testWebhook() {
    const webhookUrl = 'http://localhost:5678/webhook-test/f9522019-e2fb-401a-b85f-bf43c41bc3bb';
    
    const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Testing webhook from Node.js',
        itemName: 'Test Item',
        sku: 'TEST-001',
        price: 99.99
    };

    console.log('🔍 Testing webhook:', webhookUrl);
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
    await testWebhook();
}

runTests(); 