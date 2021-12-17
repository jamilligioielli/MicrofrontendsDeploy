const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

// this will contain a string that says exactly 
// where the production app wil be hosted
const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
	mode: 'production',
	// all the different files will use this as a template
	// on how to name them
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/container/latest/'
	},
	plugins: [
		// those plugins will now have a production domain
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
				auth: `auth@${domain}/auth/latest/remoteEntry.js`,
				dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`
			},
			shared: packageJson.dependencies
		})
	]
}

module.exports = merge(commonConfig, prodConfig)