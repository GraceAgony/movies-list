var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./client/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                presets:['react']
                },
                exclude: [/node_modules/, /public/, /server/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                options: {
                    presets:['es2015','react']
                },
                exclude: [/node_modules/, /public/]
            },

            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=25000'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};