# Use the official n8n image as the base
FROM n8nio/n8n:latest

# Switch to root to perform necessary system tasks
USER root

# Create the custom extensions directory
RUN mkdir -p /home/node/.n8n/custom

# Copy the entire n8n-nodes-hedera package into the n8n custom extensions directory
COPY n8n-nodes-hedera /home/node/.n8n/custom/n8n-nodes-hedera

# Set proper ownership
RUN chown -R node:node /home/node/.n8n/custom

# Set the N8N_CUSTOM_EXTENSIONS environment variable to point to the custom directory
ENV N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
ENV N8N_CORS_ALLOW_ORIGIN=http://localhost:3000

# Switch back to node user
USER node

# Expose n8n port
EXPOSE 5678 