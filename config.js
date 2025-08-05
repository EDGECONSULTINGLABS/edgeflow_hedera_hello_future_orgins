// EdgeFlow NFT Minting System Configuration
// This file contains the environment configuration for the application

module.exports = {
  // Hedera Configuration
  hedera: {
    accountId: '0.0.6453152',
    privateKey: '0xf77303fd7ed6c1d0bb05df222cb314a083d2a2d91ccc1009a1eb022b2a4b5cb7',
    network: 'testnet'
  },

  // Google Sheets Configuration
  googleSheets: {
    credentials: './credentials/google-sheets-credentials.json',
    sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
  },

  // Server Configuration
  server: {
    port: 3000,
    n8nWebhookUrl: 'http://localhost:5678/webhook/edgeflow-onboarding'
  },

  // IPFS Configuration (Optional - for metadata storage)
  ipfs: {
    gateway: 'https://ipfs.io/ipfs/',
    apiUrl: 'https://api.ipfs.io/api/v0'
  },

  // Application Configuration
  app: {
    nodeEnv: 'development',
    logLevel: 'debug'
  }
}; 