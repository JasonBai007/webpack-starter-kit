var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devServer: {       
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase:'./app'
    },
    entry: {
        index: path.resolve(__dirname, 'app/src/js/index.js'),
        part: path.resolve(__dirname, 'app/src/js/part.js')        
    },
    output: {
        publicPath: 'dist',
        filename: 'js/[name].min.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new CommonsChunkPlugin('js/common.min.js'),
        new uglifyJsPlugin({ compress: { warnings: false } }),
        new ExtractTextPlugin("css/[name].min.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
