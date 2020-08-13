const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 5000,
        hot: true,
        proxy: {
            '/': 'http://localhost:5001',
        },
    },
});
