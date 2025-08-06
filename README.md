# EdgeFlow - Hedera Inventory Management System

A professional inventory management system built with React, n8n workflows, and Hedera Hashgraph blockchain integration. This system provides immutable inventory tracking with real-time blockchain verification.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EDGECONSULTINGLABS/edgeflow_hedera_hello_future_orgins.git
   cd edgeflow_hedera_hello_future_orgins
   ```

2. **Start the system**
   ```bash
   # Windows PowerShell
   .\start-local.ps1
   
   # Or manually
   docker-compose -f docker-compose.local.yml up -d --build
   ```

3. **Access the application**
   - **Frontend UI**: http://localhost:8081
   - **n8n Backend**: http://localhost:5678
   - **n8n Admin**: http://localhost:5678

## 🏗️ System Architecture

### Components
- **Frontend UI** (React + TypeScript): Modern inventory management interface
- **n8n Backend**: Workflow automation with Hedera integration
- **Hedera Hashgraph**: Blockchain for immutable inventory records
- **Custom HCS Node**: n8n node for Hedera Consensus Service operations

### Data Flow
1. User adds inventory item via React UI
2. Data sent to n8n webhook endpoint
3. n8n workflow processes data and creates Hedera HCS topic
4. Transaction ID and topic ID returned to UI
5. User can view transaction on HashScan for verification

## ✨ Features

### 🔒 Immutable Records
- Every inventory item is permanently recorded on Hedera's distributed ledger
- Transaction IDs provide cryptographic proof of data integrity
- Direct links to HashScan for transaction verification

### 🔗 Real-time Blockchain Integration
- Automated Hedera HCS topic creation for each inventory item
- Real transaction IDs (e.g., `0.0.6453152@1754512936.397175052`)
- Clickable HashScan links for transaction traceability

### 🎯 Professional UI
- Clean, modern React interface
- Real-time transaction display
- Copy-to-clipboard functionality
- Success/failure status indicators

### ⚡ Automated Workflows
- n8n-powered backend automation
- Custom Hedera HCS integration
- Seamless webhook communication

## 📁 Project Structure

```
V1/
├── flow-ledger-ai/           # React frontend application
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── services/         # API services
│   │   ├── config/           # Configuration files
│   │   └── pages/            # Page components
│   └── Dockerfile
├── n8n-nodes-hedera/         # Custom Hedera n8n nodes
├── docker-compose.local.yml  # Local development setup
├── start-local.ps1          # Windows startup script
├── nginx.conf               # Frontend proxy configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables
The system uses Docker Compose for configuration. Key settings in `docker-compose.local.yml`:

```yaml
services:
  n8n:
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - WEBHOOK_URL=http://localhost:5678/
      - N8N_CORS_ALLOW_ORIGIN=*
  
  frontend:
    ports:
      - "8081:80"
```

### Webhook Configuration
Webhook URLs are configured in `flow-ledger-ai/src/config/webhooks.ts`:

```typescript
export const WEBHOOK_CONFIG = {
  INVENTORY_WEBHOOK: 'http://localhost:5678/webhook/9bc3ed7b-cf70-410e-ba4b-964625d5eec8',
  // ... other configurations
};
```

## 🚀 Development

### Local Development
1. Start the system: `.\start-local.ps1`
2. Frontend auto-rebuilds on changes
3. n8n workflow changes require manual activation

### Adding New Features
1. **Frontend**: Edit files in `flow-ledger-ai/src/`
2. **Backend**: Modify n8n workflows at http://localhost:5678
3. **Custom Nodes**: Add to `n8n-nodes-hedera/`

### Testing
- **Webhook Testing**: Use `test-webhook-simple.js`
- **UI Testing**: Add items via http://localhost:8081
- **Blockchain Verification**: Click HashScan links in transaction history

## 📊 Transaction Verification

### HashScan Integration
Every inventory transaction includes:
- **Transaction ID**: Unique Hedera transaction identifier
- **Topic ID**: HCS topic for the inventory item
- **HashScan Link**: Direct link to transaction details

Example transaction:
```
Transaction ID: 0.0.6453152@1754512936.397175052
Topic ID: 0.0.6513222
HashScan: https://hashscan.io/testnet/transaction/0.0.6453152@1754512936.397175052
```

### Verification Process
1. Add inventory item via UI
2. System creates Hedera HCS topic
3. Transaction ID displayed in UI
4. Click 🔗 to view on HashScan
5. Verify transaction details and topic data

## 🛠️ Troubleshooting

### Common Issues

**UI shows "Processing..." instead of transaction ID**
- Check n8n workflow is activated
- Verify webhook URL in configuration
- Ensure Hedera node is properly configured

**Webhook returns expressions instead of values**
- Update n8n "Respond to Webhook" node
- Use hardcoded values for transaction data
- Reference correct node outputs

**Docker containers not starting**
- Check Docker is running
- Verify ports 8081 and 5678 are available
- Run `docker-compose -f docker-compose.local.yml down` then restart

### Debug Commands
```bash
# Check container status
docker-compose -f docker-compose.local.yml ps

# View logs
docker-compose -f docker-compose.local.yml logs n8n
docker-compose -f docker-compose.local.yml logs frontend

# Test webhook
node test-webhook-simple.js

# Rebuild containers
docker-compose -f docker-compose.local.yml up -d --build
```

## 🚀 Deployment

### Production Deployment
1. Update webhook URLs for production environment
2. Configure Hedera mainnet credentials
3. Set up proper SSL certificates
4. Use production Docker Compose configuration

### Environment Variables
```bash
# Production settings
N8N_HOST=your-domain.com
WEBHOOK_URL=https://your-domain.com/
HEDERA_NETWORK=mainnet
```

## 📈 Future Enhancements

- [ ] Multi-tenant inventory management
- [ ] Advanced analytics and reporting
- [ ] Mobile application
- [ ] Integration with ERP systems
- [ ] AI-powered inventory predictions
- [ ] Multi-blockchain support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review n8n and Hedera documentation

---

**Built with ❤️ by Edge Consulting Labs** 