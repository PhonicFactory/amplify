const path = require('path');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const env = process.env;
const ASSET_ROOT = path.resolve(__dirname, env.ASSET_ROOT);
const { API_HOST } = env;


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
                `${ASSET_ROOT}/**.html`,
                `${ASSET_ROOT}/manifest.json`,
                `${ASSET_ROOT}/images/**.*`,
                // `${ASSET_ROOT}/fonts/*/**.*`,
                `${ASSET_ROOT}/js/**.js`,
                // `${ASSET_ROOT}/css/**.css`
            ],
            stripPrefix: `${ASSET_ROOT}/`,
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
                {
                    urlPattern: new RegExp(`${API_HOST}/calls/$`),
                    handler: 'networkFirst',
                    options: {
                        cache: {
                            name: 'calls-cache',
                            maxEntries: 40
                        }
                    }
                },
                {
                    urlPattern: new RegExp(`${API_HOST}/calls/[a-z0-9-]+/$`),
                    handler: 'cacheFirst',
                    options: {
                        cache: {
                            name: 'call-cache',
                            maxEntries: 40
                        }
                    }
                }
            ]
        })
    ]
});
