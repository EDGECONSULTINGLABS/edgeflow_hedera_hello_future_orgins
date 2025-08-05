const fetch = require('node-fetch');

async function testUltraSimple() {
    const webhookUrl = 'http://localhost:5678/webhook/ultra-simple';
    const testData = {
        itemName: 'Solana Pearl Earrings',
        sku: 'AO-E-003',
        price: 299.99,
        timestamp: new Date().toISOString(),
        source: 'EdgeFlow Inventory Scanner Pro'
    };
    
    console.log('🔍 Testing Ultra Simple Fixed webhook...\n');
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
        
        if (response.ok) {
            const rawText = await response.text();
            console.log('\n📄 Raw response text:');
            console.log('---START---');
            console.log(rawText);
            console.log('---END---');
            console.log('📄 Response length:', rawText.length);
            
            try {
                const jsonData = JSON.parse(rawText);
                console.log('\n✅ Successfully parsed JSON:');
                console.log(JSON.stringify(jsonData, null, 2));
                
                if (jsonData.success && jsonData.tokenId && jsonData.transactionId) {
                    console.log('\n🎉 SUCCESS! Inventory logged with NFT metadata!');
                    console.log(`   Item: ${jsonData.itemName}`);
                    console.log(`   SKU: ${jsonData.sku}`);
                    console.log(`   Price: $${jsonData.price}`);
                    console.log(`   Token ID: ${jsonData.tokenId}`);
                    console.log(`   Transaction ID: ${jsonData.transactionId}`);
                    console.log(`   Serial Numbers: ${jsonData.serialNumbers}`);
                    if (jsonData.metadata) {
                        console.log(`   NFT Name: ${jsonData.metadata.name}`);
                        console.log(`   NFT Description: ${jsonData.metadata.description}`);
                    }
                } else if (jsonData.success === false) {
                    console.log('\n❌ Inventory logging failed:', jsonData.error);
                }
            } catch (jsonError) {
                console.log('\n❌ Failed to parse JSON:', jsonError.message);
            }
        } else {
            const errorText = await response.text();
            console.log('\n❌ Error response:', errorText);
        }
    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
}

testUltraSimple(); 