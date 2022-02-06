const defaultConfig = require("./webpack.config.base")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(defaultConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader',
          {
            loader: "posthtml-loader",
            options: {
              plugins: [
                require('posthtml-extend')({
                  encoding: 'utf8', // Parent template encoding
                  root: './src/html/', // Path to parent template directory
                  strict: false, // Required for nested extends to works
                }),
                require('posthtml-include')({
                  encoding: 'utf8',
                  root: './src/html/', // Path to parent template directory
                })
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/html/index.html`,
      filename: `/index.html`,
    })
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    hot: true,
    open: true
  },
})
