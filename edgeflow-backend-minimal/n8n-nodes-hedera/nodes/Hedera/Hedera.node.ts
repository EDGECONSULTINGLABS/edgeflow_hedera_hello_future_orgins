import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';
import {
	Client,
	PrivateKey,
	AccountId,
	TopicCreateTransaction,
	TopicMessageSubmitTransaction,
} from '@hashgraph/sdk';
import axios from 'axios';

/**
 * Hedera Node for n8n
 * Version: 2.0
 * Description: Interacts with the Hedera Network, focusing on the
 * Hedera Consensus Service (HCS) to create topics and submit messages.
 */
export class Hedera implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hedera',
		name: 'hedera',
		icon: 'file:hedera.svg',
		group: ['transform'],
		version: 2.0, // Major version change to reflect pivot to HCS
		description: 'Use the Hedera Consensus Service (HCS)',
		defaults: {
			name: 'Hedera',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'hederaApi',
				required: true,
			},
		],
		properties: [
			// Operation selection
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Topic',
						value: 'createTopic',
						description: 'Create a new topic on the Hedera Consensus Service',
						action: 'Create a new HCS topic',
					},
					{
						name: 'Submit Message',
						value: 'submitMessage',
						description: 'Submit a message to an existing HCS topic',
						action: 'Submit a message to an HCS topic',
					},
					{
						name: 'Get Account Info (Mirror Node)',
						value: 'getAccountInfo',
						description: 'Get account info from a public mirror node',
						action: 'Get account info',
					},
				],
				default: 'createTopic',
			},

			// --- Properties for 'Create Topic' ---
			{
				displayName: 'Topic Memo',
				name: 'topicMemo',
				type: 'string',
				default: '',
				description: 'A short, publicly-visible memo for the topic. Can be used for an item name or SKU.',
				displayOptions: { show: { operation: ['createTopic'] } },
			},

			// --- Properties for 'Submit Message' ---
			{
				displayName: 'Topic ID',
				name: 'topicId',
				type: 'string',
				default: '',
				required: true,
				description: 'The ID of the topic to submit the message to (e.g., 0.0.12345)',
				displayOptions: { show: { operation: ['submitMessage'] } },
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The message to submit. Often a JSON object with event details.',
				displayOptions: { show: { operation: ['submitMessage'] } },
			},

			// --- Properties for 'Get Account Info' ---
			{
				displayName: 'Account ID to Query',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'The account ID to look up on the mirror node.',
				displayOptions: { show: { operation: ['getAccountInfo'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const credentials = await this.getCredentials('hederaApi');

				const operatorId = AccountId.fromString(credentials.accountId as string);
				const operatorKey = PrivateKey.fromString(credentials.privateKey as string);
				const network = credentials.network as string;

				const client = network === 'mainnet' ? Client.forMainnet() : Client.forTestnet();
				client.setOperator(operatorId, operatorKey);

				switch (operation) {
					case 'createTopic':
						const topicMemo = this.getNodeParameter('topicMemo', i, '') as string;

						const createTopicTx = new TopicCreateTransaction().setTopicMemo(topicMemo);

						const txResponse = await createTopicTx.execute(client);
						const receipt = await txResponse.getReceipt(client);

						returnData.push({
							success: true,
							topicId: receipt.topicId?.toString(),
							topicMemo: topicMemo,
							transactionId: txResponse.transactionId.toString(),
							message: 'Topic created successfully.',
						});
						break;

					case 'submitMessage':
						const topicId = this.getNodeParameter('topicId', i, '') as string;
						const message = this.getNodeParameter('message', i, '') as string;

						if (!topicId) throw new Error('Topic ID is required to submit a message.');
						if (!message) throw new Error('Message content cannot be empty.');

						const submitMsgTx = await new TopicMessageSubmitTransaction({
							topicId: topicId,
							message: message,
						}).execute(client);

						const submitReceipt = await submitMsgTx.getReceipt(client);

						returnData.push({
							success: true,
							topicId: topicId,
							transactionId: submitMsgTx.transactionId.toString(),
							sequenceNumber: submitReceipt.topicSequenceNumber?.toString(),
							message: 'Message submitted successfully.',
						});
						break;

					case 'getAccountInfo':
						const accountIdToQuery = this.getNodeParameter('accountId', i, '') as string;
						if (!accountIdToQuery) throw new Error('Account ID to Query is required.');

						const mirrorNodeUrl = `https://${
							network === 'mainnet' ? 'mainnet-public' : 'testnet'
						}.mirrornode.hedera.com/api/v1/accounts/${accountIdToQuery}`;

						try {
							const response = await axios.get(mirrorNodeUrl);
							returnData.push(response.data as IDataObject);
						} catch (axiosError) {
							returnData.push({ 
								error: 'Failed to fetch account info',
								details: (axiosError as any).message 
							});
						}
						break;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorData: IDataObject = { error: (error as Error).message };
					returnData.push({ json: errorData });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
