const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/index.js'],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader', 'eslint-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(woff|woff(2))$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                        },
                    },
                ],
            },
        ],
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
};
