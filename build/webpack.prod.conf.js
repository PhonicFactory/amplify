const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf')
const assetsRoot = config.build.assetsRoot;

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'vue-pwa-starter',
            // dontCacheBustUrlsMatching: /\.\w{8}\./,
            // filename: 'service-worker.js',
            // minify: true,
            // navigateFallback: PUBLIC_PATH + 'index.html',
            // staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            verbose: true,
            staticFileGlobs: [
                `${assetsRoot}/**.html`,
                `${assetsRoot}/manifest.json`,
                // `${assetsRoot}/images/**.*`,
                // `${assetsRoot}/fonts/*/**.*`,
                `${assetsRoot}/js/**.js`,
                // `${assetsRoot}/css/**.css`
            ],
            stripPrefix: `${assetsRoot}/`,
        }),
    ]
});
