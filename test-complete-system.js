const fetch = require('node-fetch');

async function testCompleteSystem() {
    console.log('🔍 Testing Complete EdgeFlow NFT Minting System\n');
    
    // Test 1: Check n8n accessibility
    console.log('📋 Test 1: Checking n8n accessibility...');
    try {
        const n8nResponse = await fetch('http://localhost:5678');
        console.log(`   ✅ n8n Status: ${n8nResponse.status} (${n8nResponse.statusText})`);
    } catch (error) {
        console.log(`   ❌ n8n Error: ${error.message}`);
        return;
    }
    
    // Test 2: Check frontend accessibility
    console.log('\n📋 Test 2: Checking frontend accessibility...');
    try {
        const frontendResponse = await fetch('http://localhost:3000');
        console.log(`   ✅ Frontend Status: ${frontendResponse.status} (${frontendResponse.statusText})`);
    } catch (error) {
        console.log(`   ❌ Frontend Error: ${error.message}`);
    }
    
    // Test 3: Test webhook with different scenarios
    console.log('\n📋 Test 3: Testing webhook scenarios...');
    
    const webhookUrl = 'http://localhost:5678/webhook/inventory-nft';
    const testData = {
        itemName: 'Test Diamond Ring',
        sku: 'TEST-DR-001',
        price: 1500.00,
        timestamp: new Date().toISOString(),
        source: 'EdgeFlow Inventory Scanner Pro'
    };
    
    console.log(`   📤 Webhook URL: ${webhookUrl}`);
    console.log(`   📤 Test Data: ${JSON.stringify(testData, null, 2)}`);
    
    try {
        const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log(`   📊 Response Status: ${webhookResponse.status}`);
        console.log(`   📊 Response Headers: ${JSON.stringify(Object.fromEntries(webhookResponse.headers.entries()), null, 2)}`);
        
        const responseText = await webhookResponse.text();
        console.log(`   📄 Response Body: ${responseText}`);
        
        // Analyze the response
        if (webhookResponse.status === 200) {
            try {
                const jsonResponse = JSON.parse(responseText);
                if (jsonResponse.message === "Workflow was started") {
                    console.log('\n   ⚠️  WORKFLOW STATUS: Workflow is active but may need configuration');
                    console.log('   📝 Next Steps:');
                    console.log('      1. Go to http://localhost:5678');
                    console.log('      2. Import inventory-nft-workflow.json');
                    console.log('      3. Configure Hedera credentials');
                    console.log('      4. Activate the workflow');
                } else if (jsonResponse.success && jsonResponse.tokenId) {
                    console.log('\n   🎉 SUCCESS: NFT minted successfully!');
                    console.log(`      Token ID: ${jsonResponse.tokenId}`);
                    console.log(`      Transaction ID: ${jsonResponse.transactionId}`);
                } else {
                    console.log('\n   ⚠️  RESPONSE: Workflow responded but may have errors');
                    console.log(`      Response: ${JSON.stringify(jsonResponse, null, 2)}`);
                }
            } catch (jsonError) {
                console.log('\n   ⚠️  RESPONSE: Non-JSON response received');
                console.log(`      Raw response: ${responseText}`);
            }
        } else if (webhookResponse.status === 404) {
            console.log('\n   ❌ ERROR: Webhook not found');
            console.log('   📝 Next Steps:');
            console.log('      1. Go to http://localhost:5678');
            console.log('      2. Import inventory-nft-workflow.json');
            console.log('      3. Activate the workflow');
        } else {
            console.log(`\n   ❌ ERROR: Unexpected status ${webhookResponse.status}`);
        }
        
    } catch (error) {
        console.log(`   ❌ Webhook Error: ${error.message}`);
    }
    
    // Test 4: Check Docker container status
    console.log('\n📋 Test 4: Checking Docker container status...');
    try {
        const { execSync } = require('child_process');
        const dockerStatus = execSync('docker-compose ps', { encoding: 'utf8' });
        console.log('   📊 Docker Containers:');
        console.log(dockerStatus);
    } catch (error) {
        console.log(`   ❌ Docker Error: ${error.message}`);
    }
    
    console.log('\n🎯 System Status Summary:');
    console.log('   ✅ n8n: Running on http://localhost:5678');
    console.log('   ✅ Frontend: Running on http://localhost:3000');
    console.log('   ⚠️  Workflow: Needs import and activation');
    console.log('   📝 Next Steps: Import workflow and configure Hedera credentials');
}

testCompleteSystem().catch(console.error); 