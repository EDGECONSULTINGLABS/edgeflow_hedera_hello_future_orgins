#!/bin/bash

# EdgeFlow Production Deployment Script
# =====================================
# This script deploys the complete EdgeFlow system to a DigitalOcean droplet
# Usage: ./deploy-to-production.sh

set -e  # Exit on any error

# Configuration
DROPLET_IP="165.232.132.113"
GITHUB_REPO="https://github.com/EDGECONSULTINGLABS/edgeflow_hedera_hello_future_orgins.git"
PROJECT_NAME="edgeflow"

echo "🚀 Starting EdgeFlow Production Deployment to $DROPLET_IP"
echo "=================================================="

# Step 1: Connect to Droplet and Install Dependencies
echo "📦 Step 1: Installing dependencies on droplet..."
ssh root@$DROPLET_IP << 'EOF'
    echo "--> Updating server packages..."
    apt-get update -y
    
    echo "--> Installing Docker..."
    apt-get install -y docker.io docker-compose git curl
    
    echo "--> Starting Docker service..."
    systemctl start docker
    systemctl enable docker
    
    echo "--> Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    
    echo "--> Installing PM2 for process management..."
    npm install -g pm2
EOF

# Step 2: Clone and Setup Project
echo "📁 Step 2: Setting up project on droplet..."
ssh root@$DROPLET_IP << EOF
    echo "--> Cloning project from GitHub..."
    cd /root
    rm -rf $PROJECT_NAME
    git clone $GITHUB_REPO
    cd $PROJECT_NAME
    
    echo "--> Installing project dependencies..."
    npm install
    
    echo "--> Installing shared-api dependencies..."
    cd shared-api && npm install && cd ..
    
    echo "--> Installing hedera-agent-kit dependencies..."
    cd hedera-agent-kit && npm install && cd ..
    
    echo "--> Installing hedera-cra-dapp dependencies..."
    cd hedera-cra-dapp && npm install && cd ..
EOF

# Step 3: Create Production Configuration
echo "⚙️  Step 3: Creating production configuration..."
ssh root@$DROPLET_IP << EOF
    cd /root/$PROJECT_NAME
    
    echo "--> Creating production docker-compose.yml..."
    cat > docker-compose.prod.yml << 'DOCKER_COMPOSE_EOF'
version: '3.8'

services:
  n8n:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=$DROPLET_IP
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://$DROPLET_IP:5678/
      - N8N_CORS_ALLOW_ORIGIN=http://$DROPLET_IP:3000
      - N8N_CORS_ALLOW_CREDENTIALS=true
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped

volumes:
  n8n_data:
DOCKER_COMPOSE_EOF

    echo "--> Creating production environment files..."
    
    # Shared API .env
    cat > shared-api/.env << 'SHARED_API_EOF'
PORT=3003
NODE_ENV=production
N8N_URL=http://$DROPLET_IP:5678
OPENAI_API_KEY=your_openai_api_key_here
SHARED_API_EOF

    # Agent Kit .env.local
    cat > hedera-agent-kit/.env.local << 'AGENT_KIT_EOF'
NEXT_PUBLIC_API_URL=http://$DROPLET_IP:3003
NEXT_PUBLIC_N8N_URL=http://$DROPLET_IP:5678
NEXT_PUBLIC_INVENTORY_URL=http://$DROPLET_IP:3000
AGENT_KIT_EOF

    # CRA DApp .env
    cat > hedera-cra-dapp/.env << 'CRA_DAPP_EOF'
REACT_APP_API_URL=http://$DROPLET_IP:3003
REACT_APP_N8N_URL=http://$DROPLET_IP:5678
REACT_APP_INVENTORY_URL=http://$DROPLET_IP:3000
REACT_APP_HEDERA_NETWORK=testnet
CRA_DAPP_EOF

    echo "--> Updating frontend URLs..."
    sed -i 's/localhost/$DROPLET_IP/g' edgeflow-inventory-pro.html
    sed -i 's/localhost/$DROPLET_IP/g' shared-api/server.js
EOF

# Step 4: Configure Firewall
echo "🔥 Step 4: Configuring firewall..."
ssh root@$DROPLET_IP << 'EOF'
    echo "--> Configuring UFW firewall..."
    ufw --force reset
    ufw default deny incoming
    ufw default allow outgoing
    
    # Allow SSH
    ufw allow ssh
    
    # Allow application ports
    ufw allow 3000/tcp  # Inventory UI
    ufw allow 3001/tcp  # Agent Kit
    ufw allow 3002/tcp  # CRA DApp
    ufw allow 3003/tcp  # Shared API
    ufw allow 5678/tcp  # n8n
    
    ufw --force enable
    echo "--> Firewall configured and enabled"
EOF

# Step 5: Create Production Startup Script
echo "🚀 Step 5: Creating production startup script..."
ssh root@$DROPLET_IP << EOF
    cd /root/$PROJECT_NAME
    
    echo "--> Creating production startup script..."
    cat > start-production.sh << 'STARTUP_EOF'
#!/bin/bash

echo "🚀 Starting EdgeFlow Production Services..."

# Stop any existing services
echo "--> Stopping existing services..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

# Start n8n in Docker
echo "--> Starting n8n in Docker..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for n8n to be ready
echo "--> Waiting for n8n to start..."
sleep 30

# Start other services with PM2
echo "--> Starting Shared API..."
cd /root/$PROJECT_NAME/shared-api
pm2 start server.js --name "shared-api" --env production

echo "--> Starting Inventory UI..."
cd /root/$PROJECT_NAME
pm2 start "node server.js" --name "inventory-ui" --cwd /root/$PROJECT_NAME

echo "--> Starting Agent Kit..."
cd /root/$PROJECT_NAME/hedera-agent-kit
pm2 start "npm run dev" --name "agent-kit" --cwd /root/$PROJECT_NAME/hedera-agent-kit

echo "--> Starting CRA DApp..."
cd /root/$PROJECT_NAME/hedera-cra-dapp
pm2 start "npm start" --name "cra-dapp" --cwd /root/$PROJECT_NAME/hedera-cra-dapp

# Save PM2 configuration
pm2 save
pm2 startup

echo "✅ All services started!"
echo ""
echo "🌐 Access Points:"
echo "- Inventory UI:    http://$DROPLET_IP:3000"
echo "- Shared API:      http://$DROPLET_IP:3003/api/health"
echo "- Agent Kit:       http://$DROPLET_IP:3001"
echo "- CRA DApp:        http://$DROPLET_IP:3002"
echo "- n8n Backend:     http://$DROPLET_IP:5678"
echo ""
echo "📊 Service Status:"
pm2 status
docker-compose -f docker-compose.prod.yml ps
STARTUP_EOF

    chmod +x start-production.sh
EOF

# Step 6: Deploy and Start Services
echo "🚀 Step 6: Deploying and starting services..."
ssh root@$DROPLET_IP << EOF
    cd /root/$PROJECT_NAME
    ./start-production.sh
EOF

# Step 7: Verify Deployment
echo "✅ Step 7: Verifying deployment..."
ssh root@$DROPLET_IP << 'EOF'
    echo "--> Checking service status..."
    pm2 status
    docker-compose -f docker-compose.prod.yml ps
    
    echo "--> Testing endpoints..."
    curl -f http://localhost:3003/api/health || echo "Shared API not ready yet"
    curl -f http://localhost:5678 || echo "n8n not ready yet"
EOF

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Your EdgeFlow system is now live at:"
echo "- Inventory UI:    http://$DROPLET_IP:3000"
echo "- Shared API:      http://$DROPLET_IP:3003/api/health"
echo "- Agent Kit:       http://$DROPLET_IP:3001"
echo "- CRA DApp:        http://$DROPLET_IP:3002"
echo "- n8n Backend:     http://$DROPLET_IP:5678"
echo ""
echo "📋 Next Steps:"
echo "1. Import the workflow in n8n: http://$DROPLET_IP:5678"
echo "2. Configure Hedera credentials in n8n"
echo "3. Test the inventory system"
echo "4. Set up your OpenAI API key in shared-api/.env"
echo ""
echo "🔧 Management Commands:"
echo "- View logs: ssh root@$DROPLET_IP 'pm2 logs'"
echo "- Restart services: ssh root@$DROPLET_IP 'cd /root/$PROJECT_NAME && ./start-production.sh'"
echo "- Update code: ssh root@$DROPLET_IP 'cd /root/$PROJECT_NAME && git pull && ./start-production.sh'" 