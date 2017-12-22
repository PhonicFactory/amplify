const path = require('path');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
const assetRoot = path.resolve(__dirname, process.env.ASSET_ROOT);

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new SWPrecacheWebpackPlugin({
            verbose: true,
            staticFileGlobs: [],
            importScripts: ['/sw-import.js']
        })
    ],
    devServer: {
        contentBase: assetRoot,
        // compress: true,
        port: process.env.PORT,
        historyApiFallback: true
    }
});
