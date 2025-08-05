# N8N Setup with Custom Nodes

This guide will help you set up n8n with the custom Hedera and Test nodes.

## Prerequisites

- Docker installed and running
- Node.js and npm (for building the nodes)

## Quick Start

### Option 1: Using the batch script (Windows)
1. Double-click `start-n8n.bat`
2. Wait for the Docker image to build and container to start
3. Access n8n at http://localhost:5678

### Option 2: Using Docker Compose
```bash
docker-compose up -d
```

### Option 3: Manual Docker commands
```bash
# Build the image
docker build -t edgeflow-n8n .

# Run the container
docker run -d --name edgeflow-n8n-container -p 5678:5678 edgeflow-n8n
```

## Custom Nodes

The following custom nodes should be available in n8n:

### Hedera Node
- **Display Name**: Hedera
- **Group**: Transform
- **Operations**: Mint NFT
- **Description**: Interact with Hedera network for NFT operations

### Test Node
- **Display Name**: Test Node
- **Group**: Transform
- **Description**: A simple test node for basic operations

## Troubleshooting

### Nodes not appearing?
1. Check that the Docker container is running:
   ```bash
   docker ps
   ```

2. Check the container logs:
   ```bash
   docker logs edgeflow-n8n-container
   ```

3. Rebuild the image:
   ```bash
   docker stop edgeflow-n8n-container
   docker rm edgeflow-n8n-container
   docker build -t edgeflow-n8n .
   docker run -d --name edgeflow-n8n-container -p 5678:5678 edgeflow-n8n
   ```

### Port already in use?
If port 5678 is already in use, you can change it in the docker-compose.yml or docker run command:
```bash
docker run -d --name edgeflow-n8n-container -p 5679:5678 edgeflow-n8n
```

## Stopping the Container

```bash
docker stop edgeflow-n8n-container
docker rm edgeflow-n8n-container
```

## Development

To modify the custom nodes:
1. Edit the TypeScript files in the `nodes/` directory
2. Run `npm run build` to compile the changes
3. Rebuild the Docker image
4. Restart the container 