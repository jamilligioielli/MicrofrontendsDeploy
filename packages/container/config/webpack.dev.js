// this function will merge it with common.js
const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')


const devConfig = {
	mode: 'development',
	devServer: {
		port: 8080,
		historyApiFallback: {
			index: 'index.html'
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:8081/remoteEntry.js'
			},
			shared: packageJson.dependencies,
		})
	]
}

// devconfig will overrride any options of commonconfig
module.exports =  merge(commonConfig, devConfig)