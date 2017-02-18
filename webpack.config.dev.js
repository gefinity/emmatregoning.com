const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

module.exports = {
    entry: 'main',
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-strict-mode', 'transform-class-properties']
                }
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['src', 'assets', 'node_modules'],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html?minimize=true&interpolate&attrs[]=link:href,meta:content,img:src!index.template.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(true)
        }),
    ],
    devServer: {
        contentBase: ['dist', 'assets', '_externalAssets']
    }
};