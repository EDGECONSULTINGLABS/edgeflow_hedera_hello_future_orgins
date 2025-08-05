import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

class TestNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Test Node',
		name: 'testNode',
		icon: 'file:test.svg',
		group: ['transform'],
		version: 1,
		description: 'A simple test node',
		defaults: {
			name: 'Test Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: 'Hello World',
				description: 'Message to output',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			const message = this.getNodeParameter('message', i) as string;
			returnData.push({ message });
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

module.exports = { TestNode }; 