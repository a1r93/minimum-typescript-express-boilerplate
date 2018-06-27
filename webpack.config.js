const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  entry: "./src/app.ts",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  node: {
    __dirname: false
  },
  target: "node",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" },
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
