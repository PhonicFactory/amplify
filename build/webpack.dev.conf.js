const path = require('path');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
const env = process.env;
const ASSET_ROOT = path.resolve(__dirname, env.ASSET_ROOT);
const { PORT } = env;

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new SWPrecacheWebpackPlugin({
            verbose: true,
            staticFileGlobs: [],
            importScripts: ['/sw-import.js']
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: ASSET_ROOT,
        // compress: true,
        port: PORT,
        historyApiFallback: true
    }
});
