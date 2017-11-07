const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: config.build.assetsRoot,
        filename: 'js/bundle.js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
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
        new CopyWebpackPlugin([
            {
                from: './static'
            }
        ])
    ],
    devServer: {
        contentBase: config.build.assetsRoot
        // compress: true,
        // port: 9000
    }
};
