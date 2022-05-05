const webpack = require('webpack')
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "./frontend/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist",
        filename: "bundle.js"
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/preset-react"] }
            },
            {
                test: /\.(sass|less|css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: ["file-loader"]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "frontend")
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: {
            '/api' : {
                target: 'http://localhost:3000/',
                secure: false,
            },
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlPlugin()]
};