const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

// this will contain a string that says exactly
// where the production app wil be hosted

const prodConfig = {
	mode: 'production',
	// all the different files will use this as a template
	// on how to name them
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/auth/latest/'
	},
	plugins: [
		// those plugins will now have a production domain
		new ModuleFederationPlugin({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		})
	]
}

module.exports = merge(commonConfig, prodConfig)
