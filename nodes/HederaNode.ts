import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

class HederaNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hedera',
		name: 'hedera',
		icon: 'file:hedera.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with Hedera network for NFT operations',
		defaults: {
			name: 'Hedera',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const tokenName = this.getNodeParameter('tokenName', i) as string;
				const tokenSymbol = this.getNodeParameter('tokenSymbol', i) as string;
				const metadata = this.getNodeParameter('metadata', i) as string;

				if (operation === 'mintNft') {
					// For now, return a mock response
					// In a real implementation, this would interact with Hedera
					const result: IDataObject = {
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
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: (error as Error).message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
} 