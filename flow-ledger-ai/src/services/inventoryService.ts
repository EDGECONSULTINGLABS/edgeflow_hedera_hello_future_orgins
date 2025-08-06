import { WEBHOOK_CONFIG } from "@/config/webhooks";

export interface InventoryItem {
  itemName: string;
  sku: string;
  price: number;
  timestamp: string;
}

export interface HederaResponse {
  success: boolean;
  message: string;
  itemName: string;
  sku: string;
  price: number;
  topicId: string;
  transactionId: string;
  topicMemo: string;
  metadata: {
    name: string;
    description: string;
    sku: string;
    price: number;
    createdDate: string;
  };
}

export class InventoryService {
  private static webhookUrl = WEBHOOK_CONFIG.INVENTORY_WEBHOOK;

  /**
   * Send inventory item to n8n webhook for processing
   */
  static async addInventoryItem(item: InventoryItem): Promise<HederaResponse> {
    try {
      console.log('Sending inventory data to n8n webhook:', item);
      console.log('Webhook URL:', this.webhookUrl);
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response received:', responseData);
      
      return responseData;
    } catch (error) {
      console.error('Error sending data to n8n:', error);
      throw error;
    }
  }

  /**
   * Update webhook URL (useful for environment switching)
   */
  static updateWebhookUrl(newUrl: string) {
    this.webhookUrl = newUrl;
  }

  /**
   * Get current webhook URL
   */
  static getWebhookUrl(): string {
    return this.webhookUrl;
  }
} 