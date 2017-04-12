var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devServer: {       
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './src'
    },
    entry: {
        index: path.resolve(__dirname, 'src/index.jsx'),
        vendors:['react','react-dom']  //第三方库和框架
    },
    output: {
        path: '/src/dist/',
        publicPath:'dist/',  //居然影响了html中的图片路径
        filename: 'js/[name].buddle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({fallback:'style-loader', loader:'css-loader'}) },
            { test: /\.less$/, use: ExtractTextPlugin.extract("css-loader!less-loader") },
            { test: /\.js[x]?$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader?limit=1024&name=img/[name].[ext]' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, use: 'url-loader' }
        ]
    },
    resolve: {
        extensions: ['.js','.json','.jsx'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({'name':'vendors','filename':'js/vendors.js'}),
        new ExtractTextPlugin("css/[name].buddle.css"),
        new webpack.ProvidePlugin({ $: "jquery" }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
