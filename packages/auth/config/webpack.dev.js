// this function will merge it with common.js
const { merge } = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')


const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8082/'
	},
	devServer: {
		port: 8082,
		historyApiFallback: {
			index: '/index.html'
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/bootstrap'
			},
			// this will return a js object with all the dependencies
			// it works bettwer in this case, because we will need react
			// but if you want to be very specific, u can add an array like ['shared modules']
			// this will also reduce the js mb loaded in the browser and it will update the shared modules
			// automatically from json, so you dont need to add it manually
			shared: packageJson.dependencies
		}),
		new HTMLWebpackPlugin({
			template: './public/index.html'
		})
	]
}

// devconfig will overrride any options of commonconfig
module.exports =  merge(commonConfig, devConfig)