# EdgeFlow Hedera - Hello Future Origins

A complete inventory management system built with React, n8n, and Hedera Hashgraph. This system allows you to create, manage, and track inventory items with blockchain integration.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git
- Windows PowerShell or Command Prompt

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EDGECONSULTINGLABS/edgeflow_hedera_hello_future_orgins.git
   cd edgeflow_hedera_hello_future_orgins
   ```

2. **Start the system**
   ```bash
   # Using PowerShell
   .\start-local.ps1
   
   # Or using Command Prompt
   start-local.bat
   ```

3. **Access the application**
   - Frontend UI: http://localhost:8081
   - n8n Backend: http://localhost:5678

## 🏗️ Architecture

### Components
- **Frontend**: React-based UI (`flow-ledger-ai/`)
- **Backend**: n8n workflow automation platform
- **Blockchain**: Hedera Hashgraph integration
- **Database**: n8n internal storage
- **Proxy**: Nginx for routing and CORS handling

### Services
- **edgeflow-frontend-local**: React application (Port 8081)
- **edgeflow-n8n-local**: n8n workflow engine (Port 5678)

## 📁 Project Structure

```
edgeflow_hedera_hello_future_orgins/
├── docker-compose.local.yml    # Docker configuration
├── flow-ledger-ai/             # React frontend application
├── n8n-nodes-hedera/          # Custom Hedera n8n nodes
├── nginx.conf                  # Nginx proxy configuration
├── start-local.bat            # Windows startup script
├── start-local.ps1            # PowerShell startup script
├── test-local-workflow.json   # Sample n8n workflow
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables
The system uses the following environment variables in `docker-compose.local.yml`:

- `N8N_HOST`: n8n host (default: localhost)
- `N8N_PORT`: n8n port (default: 5678)
- `N8N_PROTOCOL`: Protocol (default: http)
- `WEBHOOK_URL`: Webhook URL for n8n
- `N8N_CORS_ALLOW_ORIGIN`: CORS settings
- `N8N_BASIC_AUTH_ACTIVE`: Authentication settings

### Hedera Configuration
The system includes custom n8n nodes for Hedera integration:
- Hedera API credentials management
- HCS (Hedera Consensus Service) integration
- NFT creation and management

## 📋 Features

### Inventory Management
- Create and manage inventory items
- Track item details and metadata
- Blockchain-based verification
- Real-time updates

### Blockchain Integration
- Hedera Hashgraph integration
- HCS message publishing
- NFT creation for inventory items
- Transaction verification

### Workflow Automation
- n8n-based workflow automation
- Webhook integration
- Custom Hedera nodes
- Event-driven architecture

## 🛠️ Development

### Adding New Features
1. Modify the React frontend in `flow-ledger-ai/`
2. Update n8n workflows as needed
3. Extend custom Hedera nodes in `n8n-nodes-hedera/`
4. Test with the local development environment

### Custom Workflows
1. Access n8n at http://localhost:5678
2. Import the sample workflow from `test-local-workflow.json`
3. Modify workflows as needed
4. Export and save your custom workflows

## 🔍 Troubleshooting

### Common Issues

**Docker containers not starting**
```bash
# Check Docker status
docker ps -a

# Restart containers
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up -d
```

**Port conflicts**
- Ensure ports 8081 and 5678 are available
- Check for other services using these ports

**Hedera integration issues**
- Verify Hedera network connectivity
- Check API credentials in n8n
- Ensure Hedera SDK is properly installed

### Logs
```bash
# View container logs
docker logs edgeflow-frontend-local
docker logs edgeflow-n8n-local
```

## 🚀 Deployment

### Production Setup
1. Update environment variables for production
2. Configure proper SSL certificates
3. Set up production Hedera network credentials
4. Configure backup and monitoring

### Scaling
- Use Docker Swarm or Kubernetes for scaling
- Implement load balancing for multiple instances
- Set up proper database persistence

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the troubleshooting section

## 🔄 Updates

To update the system:
```bash
git pull origin master
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up -d --build
```

---

**EdgeFlow Hedera** - Building the future of inventory management with blockchain technology. 