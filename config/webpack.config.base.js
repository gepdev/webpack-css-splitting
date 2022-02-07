const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const glob = require("glob")

const cssFiles = glob.sync("./src/scss/theme-a/*.scss")
const cacheGroups = cssFiles.reduce((acc, value) => {
  const name = path.basename(value, ".scss")
  acc[name] = {
    name,
    type: "css/mini-extract",
    test: new RegExp(`${name}\\.s?css$`),
    chunks: 'initial',
    enforce: true
  }
  return acc
}, {})

module.exports = {
  entry() {
    return {
      index: [...cssFiles, "./src/index.js"]
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups
    }
  }
}
