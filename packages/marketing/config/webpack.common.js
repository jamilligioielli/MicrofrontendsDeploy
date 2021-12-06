module.exports = {
    module: {
        // this will process a loader
        // this tells webpack some different files that it has to start
        rules: [
            {
                // import a file that has .m or js extension
                test: /\.m?js$/,
                // dont't try to run it at any file of the node modules diretory
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}