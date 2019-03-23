const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
    entry: ['webpack/hot/poll?100', './server.js'],
    // This forces webpack not to compile TypeScript for one time, but to stay running, watch for file changes in project directory and re-compile if needed
    watch: false,
    // Is needed to have in compiled output imports Node.JS can understand. Quick search gives you more info
    target: 'node',
    // Prevents warnings from TypeScript compiler
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },

    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.js/,

                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    },
            },}
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'app.min.js',
    },
};
