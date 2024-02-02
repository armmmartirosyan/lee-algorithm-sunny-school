const HtmlWebpackPlugin = require("html-webpack-plugin");

const RULES = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    },
];

const PLUGINS = [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/assets/favicons/favicon-32x32.png"
    })
];

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: RULES,
    },
    plugins: PLUGINS,
    devServer: {
        port: 3000,
        open: true,
        hot: true
    }
};