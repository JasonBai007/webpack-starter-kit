var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {  
  entry:{
    index: __dirname +'/app/src/js/index.js'
  },
  output: {
    path: __dirname + '/app/dist',
    publicPath: '/',
    filename: 'js/[name].bundle.min.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader") },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'),exclude:/node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new uglifyJsPlugin({ compress: { warnings: false } }),
    new ExtractTextPlugin("css/[name].min.css"),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};
