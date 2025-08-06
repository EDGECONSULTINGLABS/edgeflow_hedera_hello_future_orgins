// Webhook Configuration
export const WEBHOOK_CONFIG = {
  // n8n webhook for inventory management
  INVENTORY_WEBHOOK: 'http://localhost:5678/webhook/9bc3ed7b-cf70-410e-ba4b-964625d5eec8',
  
  // Base URLs for different environments
  BASE_URLS: {
    LOCAL: 'http://localhost:5678',
    DEVELOPMENT: 'https://dev-n8n.example.com',
    PRODUCTION: 'https://n8n.example.com'
  }
};

// Helper function to get webhook URL based on environment
export const getWebhookUrl = (webhookType: keyof typeof WEBHOOK_CONFIG, environment: keyof typeof WEBHOOK_CONFIG.BASE_URLS = 'LOCAL') => {
  const baseUrl = WEBHOOK_CONFIG.BASE_URLS[environment];
  
  switch (webhookType) {
    case 'INVENTORY_WEBHOOK':
      return `${baseUrl}/webhook/9bc3ed7b-cf70-410e-ba4b-964625d5eec8`;
    default:
      return WEBHOOK_CONFIG[webhookType];
  }
}; 