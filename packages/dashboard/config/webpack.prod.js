const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const commonConfig = require('./webpack.common')

// this will contain a string that says exactly
// where the production app wil be hosted

const prodConfig = {
	mode: 'production',
	// all the different files will use this as a template
	// on how to name them
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/dashboard/latest/'
	},
	plugins: [
		// those plugins will now have a production domain
		new ModuleFederationPlugin({
			name: 'dashboard',
			filename: 'remoteEntry.js',
			exposes: {
				'./DashboardApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		})
	]
}

module.exports = merge(commonConfig, prodConfig)
