const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    mode: 'development',
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
});
