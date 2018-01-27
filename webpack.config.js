const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    app: __dirname + '/src/app.js',
    page2: __dirname + '/src/page2.js'
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }
        )
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader?name=[hash:12].[ext]&outputPath=img/',
          'img-loader'
          // {
          //   loader: 'image-webpack-loader', // currently a broken package
          //   options: {
          //     bypassOnDebug: true,
          //   },
          // }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    // open: true // started to annoy me. Use dev:launch
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname + '/src/template.index.html'),
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
      excludeChunks: ['page2']
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: path.resolve(__dirname + '/src/template.page2.html'),
      hash: true, minify: {
        collapseWhitespace: true,
      },
      chunks: ['page2']
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    })
  ]
}