const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(
    __dirname,
    "starter-project",
    "src",
    "client",
    "index.js"
  ),

  mode: "development",
  devtool: "source-map",
  stats: "verbose",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "starter-project",
        "src",
        "client",
        "views",
        "index.html"
      ),
      filename: "index.html",
      inject: "body",
    }),
  ],

  devServer: {
    port: 3000,
    allowedHosts: "all",
    hot: true,
    open: true,
  },

  resolve: {
    extensions: [".js", ".json", ".wasm"],
  },
};
