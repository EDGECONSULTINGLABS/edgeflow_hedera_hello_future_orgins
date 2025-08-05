const path = require('path');

module.exports = {
  entry: {
    HederaNode: './nodes/HederaNode.ts',
    TestNode: './nodes/TestNode.ts',
  },
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/nodes'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    'n8n-workflow': 'commonjs n8n-workflow',
    'n8n-core': 'commonjs n8n-core',
  },
}; 