#!/bin/bash

# EdgeFlow Backend Deployment Script
echo "🚀 Starting EdgeFlow Backend Deployment..."

# Update system
echo "📦 Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "📋 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 22/tcp
ufw allow 5678/tcp
ufw --force enable

# Build and start n8n
echo "🔨 Building and starting n8n with Hedera node..."
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for n8n to start
echo "⏳ Waiting for n8n to start..."
sleep 30

# Check if n8n is running
if curl -s http://localhost:5678 > /dev/null; then
    echo "✅ n8n is running successfully!"
    echo "🌐 Access n8n at: http://165.232.132.113:5678"
    echo "🔗 Webhook URL: http://165.232.132.113:5678/webhook/inventory-nft"
else
    echo "❌ n8n failed to start. Check logs with: docker-compose -f docker-compose.prod.yml logs"
fi

echo "🎉 Deployment complete!" 