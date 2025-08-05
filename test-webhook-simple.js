const fetch = require('node-fetch');

async function testWebhook() {
    const webhookUrl = 'http://localhost:5678/webhook/inventory-nft';
    const testData = {
        itemName: 'Test Item',
        sku: 'TEST-001',
        price: 99.99,
        timestamp: new Date().toISOString(),
        source: 'Test'
    };

    console.log('🔍 Testing webhook:', webhookUrl);
    console.log('📤 Data:', JSON.stringify(testData, null, 2));

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('\n📊 Response Status:', response.status);
        console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('📄 Response Length:', responseText.length);
        console.log('📄 Response Text:', responseText);
        
        if (responseText.length > 0) {
            try {
                const jsonResponse = JSON.parse(responseText);
                console.log('✅ Parsed JSON:', JSON.stringify(jsonResponse, null, 2));
            } catch (e) {
                console.log('❌ Not valid JSON');
            }
        } else {
            console.log('⚠️ Empty response body');
        }

    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

testWebhook(); 