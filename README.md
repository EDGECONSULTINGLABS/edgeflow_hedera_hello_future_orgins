# EdgeFlow RWA Digital Record System

A comprehensive system that automatically creates digital records for Real-World Assets (RWAs) on the Hedera Testnet when new assets are registered through the EdgeFlow UI, integrating with Google Sheets for asset management.

## 🏗️ Architecture Overview

### Components

1. **EdgeFlow UI** (`public/add-item.html`) - Frontend interface for registering real-world assets
2. **n8n Workflow** (`n8n-workflows/`) - Automation hub for digital record creation
3. **Custom Hedera Node** (`nodes/HederaNode.ts`) - Extended n8n node for digital record operations
4. **Express Server** (`server.js`) - Backend API for handling requests
5. **Google Sheets Integration** - Asset management and digital record tracking

### Flow

1. User registers asset via EdgeFlow UI
2. Data sent to n8n webhook
3. Custom Hedera node creates digital record
4. Google Sheets updated with digital record details
5. Confirmation sent back to UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- n8n instance
- Hedera Testnet account
- Google Sheets API credentials

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd edgeflow-nft-minting

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Hedera Configuration
HEDERA_ACCOUNT_ID=your_account_id
HEDERA_PRIVATE_KEY=your_private_key
HEDERA_NETWORK=testnet

# Google Sheets Configuration
GOOGLE_SHEETS_CREDENTIALS=path_to_credentials.json
GOOGLE_SHEET_ID=your_sheet_id

# Server Configuration
PORT=3000
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

## 📁 Project Structure

```
edgeflow-nft-minting/
├── public/                 # Frontend assets
│   ├── add-item.html      # EdgeFlow UI
│   ├── styles.css         # Styling
│   └── scripts.js         # Frontend logic
├── nodes/                 # n8n custom nodes
│   └── HederaNode.ts      # Hedera NFT minting node
├── n8n-workflows/         # n8n workflow definitions
│   └── onboarding.json    # Main workflow
├── server.js              # Express server
├── package.json           # Dependencies
└── README.md             # This file
```

## 🔧 Configuration

### Hedera Setup

1. Create a Hedera Testnet account
2. Get your account ID and private key
3. Update `.env` file with credentials

### Google Sheets Setup

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create service account credentials
4. Share your Google Sheet with the service account email

### n8n Setup

1. Install the custom Hedera node
2. Import the onboarding workflow
3. Configure webhook endpoints
4. Set up Google Sheets node credentials

## 🎯 Features

- **Real-time NFT Minting**: Automatically mint NFTs when items are added
- **Barcode Scanning**: Optional barcode scanning with QuaggaJS
- **Metadata Storage**: Store item metadata on IPFS or in NFT memo
- **Inventory Tracking**: Google Sheets integration for centralized inventory
- **HIP-412 Compliance**: Follows Hedera Token Service standards
- **Testnet Ready**: Configured for Hedera Testnet deployment

## 🔗 API Endpoints

- `POST /api/add-item` - Add new inventory item and mint NFT
- `GET /api/inventory` - Get current inventory
- `GET /api/nft/:tokenId` - Get NFT details

## 📊 NFT Metadata Schema

```json
{
  "name": "Item Name",
  "description": "Item Description",
  "image": "IPFS_CID_or_URL",
  "attributes": [
    {
      "trait_type": "SKU",
      "value": "AO-E-003"
    },
    {
      "trait_type": "Price",
      "value": "299.99"
    },
    {
      "trait_type": "Category",
      "value": "Jewelry"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the EdgeFlow team
- Check the documentation in `/docs`

---

**Built with ❤️ by the EdgeFlow Team** 