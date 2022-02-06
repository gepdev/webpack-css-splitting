const defaultConfig = require("./webpack.config.base")
const { merge } = require("webpack-merge")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = merge(defaultConfig, {
  mode: 'production',
  plugins: [
    new CssMinimizerPlugin()
  ]
})
