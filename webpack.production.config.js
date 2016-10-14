var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'app/index.jsx'),
        vendors:['react','react-dom']  //第三方库和框架
    },
    output: {
        path: './app/dist/',
        publicPath:'dist/',  //居然影响了html中的图片路径
        filename: 'js/[name].buddle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("css-loader!less-loader") },
            { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=1024&name=img/[name].[ext]' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors','js/vendors.js'),
        new ExtractTextPlugin("css/[name].buddle.css"),
        new webpack.ProvidePlugin({ $: "jquery" }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
