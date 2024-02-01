const HtmlWebpackPlugin = require("html-webpack-plugin");

const RULES = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
    }
];

module.exports = {
    entry: './src/index.tsx',
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: [".ts", ".tsx"],
    },
    module: {
        rules: RULES,
    },
    devServer: {
        port: 3000
    }
};