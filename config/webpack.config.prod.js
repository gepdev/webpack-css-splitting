const defaultConfig = require("./webpack.config.base")
const { merge } = require("webpack-merge")

module.exports = merge(defaultConfig, {
  mode: 'production'
})
