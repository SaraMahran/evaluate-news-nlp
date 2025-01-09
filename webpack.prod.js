const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "js", "index.js"),

  mode: "production",
  devtool: "source-map",
  stats: "verbose",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
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
      dry: false,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "views", "index.html"),
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^\/api\/.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-responses",
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
      ],
    }),
  ],

  resolve: {
    extensions: [".js", ".json", ".wasm"],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
};
