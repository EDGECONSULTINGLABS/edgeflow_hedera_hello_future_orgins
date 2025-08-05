"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaNode = void 0;
class HederaNode {
    constructor() {
        this.description = {
            displayName: 'Hedera',
            name: 'hedera',
            icon: 'file:hedera.svg',
            group: ['transform'],
            version: 1,
            description: 'Interact with Hedera network for NFT operations',
            defaults: {
                name: 'Hedera',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Mint NFT',
                            value: 'mintNft',
                            description: 'Mint a new NFT',
                            action: 'Mint a new NFT',
                        },
                    ],
                    default: 'mintNft',
                    noDataExpression: true,
                },
                {
                    displayName: 'Token Name',
                    name: 'tokenName',
                    type: 'string',
                    default: 'My NFT',
                    description: 'Name of the NFT token',
                },
                {
                    displayName: 'Token Symbol',
                    name: 'tokenSymbol',
                    type: 'string',
                    default: 'NFT',
                    description: 'Symbol of the NFT token',
                },
                {
                    displayName: 'Metadata',
                    name: 'metadata',
                    type: 'string',
                    default: '{}',
                    description: 'Metadata for the NFT (JSON string)',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);
                const tokenName = this.getNodeParameter('tokenName', i);
                const tokenSymbol = this.getNodeParameter('tokenSymbol', i);
                const metadata = this.getNodeParameter('metadata', i);
                if (operation === 'mintNft') {
                    // For now, return a mock response
                    // In a real implementation, this would interact with Hedera
                    const result = {
                        success: true,
                        tokenId: '0.0.1234567',
                        serialNumber: 1,
                        tokenName,
                        tokenSymbol,
                        metadata,
                        message: 'NFT minted successfully (mock response)',
                    };
                    returnData.push(result);
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.message });
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.HederaNode = HederaNode;
//# sourceMappingURL=HederaNode.js.map