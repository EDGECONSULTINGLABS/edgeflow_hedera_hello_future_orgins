const fetch = require('node-fetch');

async function debugWebhookResponse() {
    const webhookUrl = 'http://localhost:5678/webhook/working-inventory';
    
    const testData = {
        itemName: 'Test Item',
        sku: 'TEST-001',
        price: 99.99,
        timestamp: new Date().toISOString(),
        source: 'EdgeFlow Inventory Scanner Pro'
    };

    console.log('🔍 Debugging webhook response...\n');
    console.log('📤 Sending POST request to:', webhookUrl);
    console.log('📤 Data:', JSON.stringify(testData, null, 2));

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('\n📊 Response status:', response.status);
        console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

        // Get the raw response text first
        const rawText = await response.text();
        console.log('\n📄 Raw response text:');
        console.log('---START---');
        console.log(rawText);
        console.log('---END---');
        console.log('📄 Response length:', rawText.length);

        // Try to parse as JSON
        try {
            const jsonData = JSON.parse(rawText);
            console.log('\n✅ Successfully parsed JSON:');
            console.log(JSON.stringify(jsonData, null, 2));
        } catch (jsonError) {
            console.log('\n❌ Failed to parse JSON:', jsonError.message);
            console.log('🔍 This suggests the response is incomplete or malformed');
        }

    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
}

debugWebhookResponse(); 