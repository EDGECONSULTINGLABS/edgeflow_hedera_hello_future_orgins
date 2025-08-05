import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

export class TestNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Test',
		name: 'test',
		icon: 'file:test.svg',
		group: ['transform'],
		version: 1,
		description: 'A simple test node',
		defaults: {
			name: 'Test',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: 'Hello from Test Node',
				description: 'Message to output',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const message = this.getNodeParameter('message', i) as string;
				const result = {
					success: true,
					message,
					timestamp: new Date().toISOString(),
				};
				returnData.push(result);
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