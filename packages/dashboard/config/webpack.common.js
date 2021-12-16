const { VueLoaderPlugin} = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['js', '.vue'],
    },
    module: {
        // this will process a loader
        // this tells webpack some different files that it has to start
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [{loader: 'file-loader'}]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                // import a file that has .m or js extension
                test: /\.m?js$/,
                // dont't try to run it at any file of the node modules diretory
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    },
                },
            },
        ],
    },
    plugins:[new VueLoaderPlugin()],   
}