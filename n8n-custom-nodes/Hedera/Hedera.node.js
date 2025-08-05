"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hedera = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const sdk_1 = require("@hashgraph/sdk");
const hedera_nft_sdk_1 = require("@hashgraph/hedera-nft-sdk");
class Hedera {
    constructor() {
        this.description = {
            displayName: 'Hedera',
            name: 'hedera',
            icon: 'file:hedera.svg',
            group: ['transform'],
            version: 1.1,
            description: 'Interact with the Hedera Hashgraph network including NFT operations',
            defaults: { name: 'Hedera' },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'hederaApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    noDataExpression: true,
                    type: 'options',
                    options: [
                        { name: 'Account', value: 'account' },
                        { name: 'Transaction', value: 'transaction' },
                        { name: 'NFT', value: 'nft' },
                    ],
                    default: 'nft',
                    description: 'Resource type to operate on',
                },
                {
                    displayName: 'Operation',
                    name: 'accountOperation',
                    type: 'options',
                    displayOptions: {
                        show: { resource: ['account'] },
                    },
                    options: [
                        { name: 'Create Account', value: 'create', description: 'Create a new Hedera account' },
                        { name: 'Transfer HBAR', value: 'transfer', description: 'Transfer HBAR to another account' },
                    ],
                    default: 'create',
                },
                {
                    displayName: 'NFT Operation',
                    name: 'nftOperation',
                    type: 'options',
                    displayOptions: {
                        show: { resource: ['nft'] },
                    },
                    options: [
                        { name: 'Import Inventory', value: 'createCollection', description: 'Import a new inventory group' },
                        { name: 'Mint NFT', value: 'mintNft', description: 'Mint a new NFT with metadata' },
                        { name: 'Validate Metadata', value: 'validateMetadata', description: 'Validate NFT metadata against standards' },
                    ],
                    default: 'mintNft',
                },
                {
                    displayName: 'Inventory Group',
                    name: 'collectionName',
                    type: 'string',
                    default: 'My Inventory Group',
                    description: 'Name of the inventory group',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['createCollection'] } },
                },
                {
                    displayName: 'Inventory Details',
                    name: 'collectionSymbol',
                    type: 'string',
                    default: 'INV',
                    description: 'Details/symbol for the inventory group',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['createCollection'] } },
                },
                {
                    displayName: 'Token ID',
                    name: 'tokenId',
                    type: 'string',
                    default: '',
                    description: 'Token ID of the collection to mint to (e.g., 0.0.12345)',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'NFT Name',
                    name: 'nftName',
                    type: 'string',
                    default: '',
                    description: 'Name of the NFT',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'NFT Description',
                    name: 'nftDescription',
                    type: 'string',
                    default: '',
                    description: 'Description of the NFT',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'NFT Image URL',
                    name: 'nftImageUrl',
                    type: 'string',
                    default: '',
                    description: 'URL of the NFT image',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'NFT Type',
                    name: 'nftType',
                    type: 'string',
                    default: 'image/png',
                    description: 'MIME type of the NFT',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'Attributes',
                    name: 'attributes',
                    type: 'json',
                    default: '[]',
                    description: 'NFT attributes as JSON array',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['mintNft'] } },
                },
                {
                    displayName: 'Metadata to Validate',
                    name: 'metadataToValidate',
                    type: 'json',
                    default: '{}',
                    description: 'NFT metadata to validate',
                    displayOptions: { show: { resource: ['nft'], nftOperation: ['validateMetadata'] } },
                },
                {
                    displayName: 'Recipient Account ID',
                    name: 'recipientId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['account'],
                            accountOperation: ['transfer'],
                        },
                    },
                    default: '',
                    description: 'Hedera Account ID to send HBAR to',
                    required: true,
                },
                {
                    displayName: 'Amount (HBAR)',
                    name: 'amount',
                    type: 'number',
                    displayOptions: {
                        show: {
                            resource: ['account'],
                            accountOperation: ['transfer'],
                        },
                    },
                    typeOptions: {
                        minValue: 0,
                        numberPrecision: 8,
                    },
                    default: 0,
                    description: 'Amount of HBAR to transfer',
                    required: true,
                },
                {
                    displayName: 'Initial Balance (HBAR)',
                    name: 'initialBalance',
                    type: 'number',
                    displayOptions: {
                        show: {
                            resource: ['account'],
                            accountOperation: ['create'],
                        },
                    },
                    default: 0,
                    description: 'Initial HBAR funding for the new account',
                },
                {
                    displayName: 'Operation',
                    name: 'transactionOperation',
                    type: 'options',
                    displayOptions: {
                        show: { resource: ['transaction'] },
                    },
                    options: [
                        { name: 'Sign Transaction', value: 'sign', description: 'Sign a transaction payload' },
                        { name: 'Submit Transaction', value: 'submit', description: 'Submit a signed transaction to the network' },
                        { name: 'Sign and Submit Transaction', value: 'signAndSubmit', description: 'Sign and submit a transaction in one step' },
                    ],
                    default: 'sign',
                },
                {
                    displayName: 'Transaction Format',
                    name: 'transactionFormat',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['transaction'],
                            transactionOperation: ['sign', 'submit', 'signAndSubmit'],
                        },
                    },
                    options: [
                        { name: 'Base64 String', value: 'base64', description: 'Transaction as base64 encoded string' },
                        { name: 'Buffer Object', value: 'buffer', description: 'Transaction as Buffer object with data array' },
                    ],
                    default: 'base64',
                    description: 'Format of the transaction data',
                },
                {
                    displayName: 'Transaction (Base64)',
                    name: 'transaction',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['transaction'],
                            transactionOperation: ['sign', 'submit', 'signAndSubmit'],
                            transactionFormat: ['base64'],
                        },
                    },
                    default: '',
                    description: 'The transaction in base64-encoded form',
                    required: true,
                },
                {
                    displayName: 'Transaction Buffer',
                    name: 'transactionBuffer',
                    type: 'json',
                    displayOptions: {
                        show: {
                            resource: ['transaction'],
                            transactionOperation: ['sign', 'submit', 'signAndSubmit'],
                            transactionFormat: ['buffer'],
                        },
                    },
                    default: '',
                    description: 'The transaction as Buffer object (e.g., from transBytes or transBase64 field)',
                    required: true,
                },
            ],
        };
    }
    async execute() {
        var _a, _b, _c;
        const items = this.getInputData();
        const returnData = [];
        const creds = (await this.getCredentials('hederaApi'));
        if (!(creds === null || creds === void 0 ? void 0 : creds.accountId) || !creds.privateKey) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Hedera credentials are not set up correctly.');
        }
        const { accountId, privateKey: privKeyStr, network } = creds;
        let client;
        let operatorKey;
        try {
            const privateKeyStr = privKeyStr;
            if (privateKeyStr.startsWith('0x')) {
                operatorKey = sdk_1.PrivateKey.fromString(privateKeyStr.substring(2));
            }
            else {
                operatorKey = sdk_1.PrivateKey.fromString(privateKeyStr);
            }
            client = network === 'mainnet'
                ? sdk_1.Client.forMainnet()
                : network === 'testnet'
                    ? sdk_1.Client.forTestnet()
                    : sdk_1.Client.forPreviewnet();
            const operatorId = sdk_1.AccountId.fromString(accountId);
            client.setOperator(operatorId, operatorKey);
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to initialize Hedera client: ${error.message}`);
        }
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                let result = {};
                if (resource === 'nft') {
                    const nftOperation = this.getNodeParameter('nftOperation', i);
                    switch (nftOperation) {
                        case 'createCollection':
                            const collectionName = this.getNodeParameter('collectionName', i);
                            const collectionSymbol = this.getNodeParameter('collectionSymbol', i);
                            const createTx = new sdk_1.TokenCreateTransaction()
                                .setTokenName(collectionName)
                                .setTokenSymbol(collectionSymbol)
                                .setTokenType(sdk_1.TokenType.NonFungibleUnique)
                                .setSupplyType(sdk_1.TokenSupplyType.Infinite)
                                .setInitialSupply(0)
                                .setTreasuryAccountId(accountId)
                                .setAdminKey(operatorKey)
                                .setSupplyKey(operatorKey);
                            const txResponse = await createTx.execute(client);
                            const receipt = await txResponse.getReceipt(client);
                            result = {
                                success: true,
                                tokenId: (_a = receipt.tokenId) === null || _a === void 0 ? void 0 : _a.toString(),
                                transactionId: txResponse.transactionId.toString(),
                                message: 'Inventory group imported successfully',
                            };
                            break;
                        case 'mintNft':
                            const tokenId = this.getNodeParameter('tokenId', i);
                            const nftName = this.getNodeParameter('nftName', i);
                            const nftDescription = this.getNodeParameter('nftDescription', i);
                            const nftImageUrl = this.getNodeParameter('nftImageUrl', i);
                            const attributes = this.getNodeParameter('attributes', i);
                            const minimalMetadata = {
                                name: nftName,
                                description: nftDescription,
                                image: nftImageUrl,
                                attributes: JSON.parse(attributes)
                            };
                            const metadataString = JSON.stringify(minimalMetadata);
                            console.log(`Metadata size: ${Buffer.byteLength(metadataString, 'utf8')} bytes`);
                            console.log(`Metadata: ${metadataString}`);
                            const mintTx = new sdk_1.TokenMintTransaction()
                                .setTokenId(tokenId)
                                .addMetadata(Buffer.from(metadataString));
                            const mintResponse = await mintTx.execute(client);
                            const mintReceipt = await mintResponse.getReceipt(client);
                            result = {
                                success: true,
                                tokenId: tokenId,
                                serialNumbers: mintReceipt.serials.map(s => s.toNumber()),
                                metadata: minimalMetadata,
                                metadataSize: Buffer.byteLength(metadataString, 'utf8'),
                                transactionId: mintResponse.transactionId.toString(),
                                message: 'NFT minted successfully',
                            };
                            break;
                        case 'validateMetadata':
                            const metadataToValidate = this.getNodeParameter('metadataToValidate', i);
                            const validationResult = hedera_nft_sdk_1.TokenMetadataValidator.validateSingleMetadataObject(JSON.parse(metadataToValidate));
                            result = {
                                success: validationResult.isValid,
                                isValid: validationResult.isValid,
                                errors: validationResult.errors,
                                message: validationResult.isValid ? 'Metadata is valid' : 'Metadata validation failed',
                            };
                            break;
                    }
                }
                else if (resource === 'account') {
                    const operation = this.getNodeParameter('accountOperation', i);
                    if (operation === 'create') {
                        const initialBalance = this.getNodeParameter('initialBalance', i);
                        const newPrivateKey = sdk_1.PrivateKey.generateED25519();
                        const newPublicKey = newPrivateKey.publicKey;
                        const txId = await new sdk_1.AccountCreateTransaction()
                            .setKey(newPublicKey)
                            .setInitialBalance(new sdk_1.Hbar(initialBalance))
                            .execute(client);
                        const receipt = await txId.getReceipt(client);
                        if (!receipt.accountId) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Account creation failed: ${receipt.status.toString()}`);
                        }
                        result = {
                            newAccountId: receipt.accountId.toString(),
                            newAccountPublicKey: newPublicKey.toString(),
                            newAccountPrivateKey: newPrivateKey.toString(),
                        };
                    }
                    else if (operation === 'transfer') {
                        const recipientId = this.getNodeParameter('recipientId', i);
                        const amount = this.getNodeParameter('amount', i);
                        const hbarAmount = new sdk_1.Hbar(amount);
                        const txResponse = await new sdk_1.TransferTransaction()
                            .addHbarTransfer(accountId, hbarAmount.negated())
                            .addHbarTransfer(recipientId, hbarAmount)
                            .execute(client);
                        const receipt = await txResponse.getReceipt(client);
                        result = {
                            status: receipt.status.toString(),
                            transactionId: txResponse.transactionId.toString() || '',
                        };
                    }
                    else {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported account operation: ${operation}`);
                    }
                }
                else if (resource === 'transaction') {
                    const operation = this.getNodeParameter('transactionOperation', i);
                    const transactionFormat = this.getNodeParameter('transactionFormat', i);
                    const getTransactionBytes = () => {
                        var _a, _b;
                        if (transactionFormat === 'base64') {
                            const txBase64 = this.getNodeParameter('transaction', i);
                            return Buffer.from(txBase64, 'base64');
                        }
                        else {
                            const bufferObj = this.getNodeParameter('transactionBuffer', i);
                            let data;
                            if (bufferObj === null || bufferObj === void 0 ? void 0 : bufferObj.data) {
                                data = bufferObj.data;
                            }
                            else if ((_a = bufferObj === null || bufferObj === void 0 ? void 0 : bufferObj.transBytes) === null || _a === void 0 ? void 0 : _a.data) {
                                data = bufferObj.transBytes.data;
                            }
                            else if ((_b = bufferObj === null || bufferObj === void 0 ? void 0 : bufferObj.transBase64) === null || _b === void 0 ? void 0 : _b.data) {
                                data = bufferObj.transBase64.data;
                            }
                            else if (Array.isArray(bufferObj)) {
                                data = bufferObj;
                            }
                            else {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Invalid buffer object format. Expected object with data array or direct array.');
                            }
                            return Buffer.from(data);
                        }
                    };
                    if (operation === 'sign') {
                        const txBuffer = getTransactionBytes();
                        const transaction = sdk_1.Transaction.fromBytes(txBuffer);
                        const signedTx = await transaction.sign(operatorKey);
                        result = {
                            signedTransaction: Buffer.from(signedTx.toBytes()).toString('base64'),
                        };
                    }
                    else if (operation === 'submit') {
                        const txBuffer = getTransactionBytes();
                        const transaction = sdk_1.Transaction.fromBytes(txBuffer);
                        const txResponse = await transaction.execute(client);
                        const receipt = await txResponse.getReceipt(client);
                        result = {
                            transactionId: txResponse.transactionId.toString(),
                            nodeId: ((_b = txResponse.nodeId) === null || _b === void 0 ? void 0 : _b.toString()) || '',
                            transactionHash: Buffer.from(txResponse.transactionHash).toString('hex'),
                            status: receipt.status.toString(),
                        };
                    }
                    else if (operation === 'signAndSubmit') {
                        const txBuffer = getTransactionBytes();
                        const transaction = sdk_1.Transaction.fromBytes(txBuffer);
                        const signedTx = await transaction.sign(operatorKey);
                        const txResponse = await signedTx.execute(client);
                        const receipt = await txResponse.getReceipt(client);
                        result = {
                            transactionId: txResponse.transactionId.toString(),
                            nodeId: ((_c = txResponse.nodeId) === null || _c === void 0 ? void 0 : _c.toString()) || '',
                            transactionHash: Buffer.from(txResponse.transactionHash).toString('hex'),
                            status: receipt.status.toString(),
                            signedTransaction: Buffer.from(signedTx.toBytes()).toString('base64'),
                        };
                    }
                    else {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported transaction operation: ${operation}`);
                    }
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`);
                }
                returnData.push({ json: result });
            }
            catch (err) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: err.message } });
                    continue;
                }
                throw new n8n_workflow_1.NodeApiError(this.getNode(), err);
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.Hedera = Hedera;
//# sourceMappingURL=Hedera.node.js.map