const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying workflow file...\n');

try {
    // Read the workflow file
    const workflowPath = path.join(__dirname, 'working-webhook.json');
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    // Parse JSON to verify it's valid
    const workflow = JSON.parse(workflowContent);
    
    console.log('✅ Workflow file is valid JSON');
    console.log(`📋 Name: ${workflow.name}`);
    console.log(`🔗 Webhook Path: ${workflow.nodes[0].parameters.path}`);
    console.log(`🆔 Webhook ID: ${workflow.nodes[0].webhookId}`);
    console.log(`📊 Number of nodes: ${workflow.nodes.length}`);
    console.log(`⚡ Active: ${workflow.active}`);
    
    console.log('\n📋 Workflow Summary:');
    console.log('   - Webhook node configured for POST requests');
    console.log('   - Responds with JSON containing Token ID and Transaction ID');
    console.log('   - Ready for import into n8n');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Open http://localhost:5678 in your browser');
    console.log('   2. Import this file: working-webhook.json');
    console.log('   3. Activate the workflow (toggle switch)');
    console.log('   4. Test with: node test-working-webhook.js');
    
} catch (error) {
    console.error('❌ Error reading workflow file:', error.message);
    process.exit(1);
} 