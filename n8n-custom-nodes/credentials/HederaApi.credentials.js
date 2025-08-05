"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaApi = void 0;
class HederaApi {
    constructor() {
        this.name = 'hederaApi';
        this.displayName = 'Hedera API Account API';
        this.documentationUrl = 'https://docs.hedera.com/hedera/core-concepts/accounts';
        this.properties = [
            {
                displayName: 'Account ID',
                name: 'accountId',
                type: 'string',
                default: '',
                required: true,
                description: 'Your Hedera Account ID (e.g. 0.0.x)',
                placeholder: '0.0.123456',
            },
            {
                displayName: 'Private Key',
                name: 'privateKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Hedera account private key (ED25519 or SECP256K1)',
            },
            {
                displayName: 'Network',
                name: 'network',
                type: 'options',
                options: [
                    {
                        name: 'Mainnet',
                        value: 'mainnet',
                    },
                    {
                        name: 'Testnet',
                        value: 'testnet',
                    },
                    {
                        name: 'Previewnet',
                        value: 'previewnet',
                    },
                ],
                default: 'testnet',
                required: true,
                description: 'Hedera network to connect to',
            },
        ];
    }
}
exports.HederaApi = HederaApi;
//# sourceMappingURL=HederaApi.credentials.js.map