const path = require("path")

module.exports = {
    entry: "./app/client/index.jsx",

    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.(js|jsx)$/, use: "babel-loader"},
            {test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ['ts-loader']},
        ],
    },
    
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/client/index.html"
        }),
    ],

    resolve: {
        extensions: ["*", ".jsx", ".js", ".tsx", ".ts"],
    },
}