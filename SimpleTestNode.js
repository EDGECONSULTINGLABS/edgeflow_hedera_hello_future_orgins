class SimpleTestNode {
	description = {
		displayName: 'Simple Test',
		name: 'simpleTest',
		icon: 'file:test.svg',
		group: ['transform'],
		version: 1,
		description: 'A simple test node',
		defaults: {
			name: 'Simple Test',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: 'Hello from Simple Test',
				description: 'Message to output',
			},
		],
	};

	async execute() {
		const items = this.getInputData();
		const returnData = [];

		for (let i = 0; i < items.length; i++) {
			const message = this.getNodeParameter('message', i);
			returnData.push({ message });
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

module.exports = { SimpleTestNode }; 