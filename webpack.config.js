var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devServer: {       
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './app'
    },
    entry: {
        index: path.resolve(__dirname, 'app/index.jsx')
    },
    output: {
        path: 'dist',  //在内存中生成文件的路径
        publicPath: 'http://localhost:8080/dist',  //内部图片路径
        filename: 'js/[name].buddle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader") },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader?name=/img/[name].[ext]' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new CommonsChunkPlugin('js/common.buddle.js'),
        new ExtractTextPlugin("css/[name].buddle.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
