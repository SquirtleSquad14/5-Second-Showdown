const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/client/index.tsx",

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ["ts-loader"] },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    hot: true,
    proxy: {
      // "/api/**": {
      //   target: "http://localhost:3000",
      // },
      "/**": {
        target: "http://localhost:3000",
      }
    },
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/client/index.html",
    }),
  ],

  resolve: {
    extensions: ["*", ".jsx", ".js", ".tsx", ".ts"],
  },
};
