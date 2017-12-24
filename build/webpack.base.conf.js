require('dotenv').config()
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, process.env.ASSET_ROOT),
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        }),
        new Dotenv(),
        new CopyWebpackPlugin([
            {
                from: './static'
            }
        ])
    ]
};
