const HtmlWebpackPlugin = require("html-webpack-plugin");

const RULES = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    }
];

const PLUGINS = [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/favicons/favicon-32x32.png"
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