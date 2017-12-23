const path = require('path');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const assetRoot = path.resolve(__dirname, process.env.ASSET_ROOT);

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new UglifyJsPlugin(),
        new SWPrecacheWebpackPlugin({
            cacheId: 'vue-pwa-starter',
            // dontCacheBustUrlsMatching: /\.\w{8}\./,
            // filename: 'service-worker.js',
            // minify: true,
            // navigateFallback: PUBLIC_PATH + 'index.html',
            // staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            verbose: true,
            staticFileGlobs: [
                `${assetRoot}/**.html`,
                `${assetRoot}/manifest.json`,
                `${assetRoot}/images/**.*`,
                // `${assetRoot}/fonts/*/**.*`,
                `${assetRoot}/js/**.js`,
                // `${assetRoot}/css/**.css`
            ],
            stripPrefix: `${assetRoot}/`,
            importScripts: ['/sw-import.js'],
            runtimeCaching: [
                {
                    urlPattern: /fonts\.gstatic\.com\/(.*)/,
                    handler: 'cacheFirst',
                    options: {
                        cache: {
                            name: 'google-font-file-cache',
                            maxEntries: 10
                        }
                    }
                },
                {
                    urlPattern: /fonts\.googleapis\.com\/(.*)/,
                    handler: 'fastest',
                    options: {
                        cache: {
                            name: 'google-font-style-cache',
                            maxEntries: 10
                        }
                    }
                },
                // TODO: CACHE API RESPONSES
                // {
                //     urlPattern: /http(s)?:\/\/o\.aolcdn\.com\/images\/dims/
                //     handler: 'cacheFirst',
                //     options: {
                //         cache: {
                //             name: 'et-api-cache',
                //             maxEntries: 40
                //         }
                //     }
                // },
            ]
        })
    ]
});
