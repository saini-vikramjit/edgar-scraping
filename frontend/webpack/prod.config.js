const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
        },
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: 'template.html',
                hash: true,
            },
        ),
    ],
});
