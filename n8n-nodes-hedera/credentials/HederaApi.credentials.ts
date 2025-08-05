import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HederaApi implements ICredentialType {
	name = 'hederaApi';
	displayName = 'Hedera API';
	documentationUrl = 'https://docs.hedera.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'Account ID',
			name: 'accountId',
			type: 'string',
			default: '',
			placeholder: '0.0.123456',
			description: 'Your Hedera account ID',
			required: true,
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Hedera private key (with or without 0x prefix)',
			required: true,
		},
		{
			displayName: 'Network',
			name: 'network',
			type: 'options',
			options: [
				{
					name: 'Testnet',
					value: 'testnet',
				},
				{
					name: 'Mainnet',
					value: 'mainnet',
				},
			],
			default: 'testnet',
			description: 'Hedera network to connect to',
		},
	];
} 