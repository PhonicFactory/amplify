const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new SWPrecacheWebpackPlugin({
            verbose: true,
            staticFileGlobs: [],
            importScripts: ['/sw-import.js']
        })
    ]
});
