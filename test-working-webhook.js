const fetch = require('node-fetch');

async function testWorkingWebhook() {
    const webhookUrl = 'http://localhost:5678/webhook/working-inventory';
    
    const testData = {
        itemName: 'sss',
        sku: '343f',
        price: 222.22,
        timestamp: new Date().toISOString(),
        source: 'EdgeFlow Inventory Scanner Pro'
    };

    console.log('🔍 Testing working webhook:', webhookUrl);
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
                console.log('🎉 Webhook working with Token ID and Transaction ID!');
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

async function runTest() {
    await testWorkingWebhook();
}

runTest(); 