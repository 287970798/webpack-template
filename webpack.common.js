const path = require('path');
const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {'polyfill': 'babel-polyfill', 'app': './src/index.js', 'other': './src/other.js'},
    optimization: {
        splitChunks: {chunks: 'all', name: 'common'}
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new CleanPlugin(['dist']),
        new HtmlPlugin({
            inject: true,
            title: 'webpack template',
            template: './src/template/index.html',
            scripts: ['http://a.cn/a.js'],
            links: ['http://b.cn/b.css'],
            mobile: true,
            baseHref: 'http://uniteedu.cn',
            HeadHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style>',
            BodyHtmlSnippet: '<div class="app-spinner">spinner</div>'

        }),
        new ExtractTextPlugin('style.css'),
        new webpack.ProvidePlugin({})
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};
