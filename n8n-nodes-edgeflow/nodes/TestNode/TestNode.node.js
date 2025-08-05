"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestNode = void 0;
class TestNode {
    constructor() {
        this.description = {
            displayName: 'Test',
            name: 'test',
            icon: 'file:test.svg',
            group: ['transform'],
            version: 1,
            description: 'A simple test node',
            defaults: {
                name: 'Test',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const message = this.getNodeParameter('message', i);
                const result = {
                    success: true,
                    message,
                    timestamp: new Date().toISOString(),
                };
                returnData.push(result);
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
exports.TestNode = TestNode;
//# sourceMappingURL=TestNode.js.map