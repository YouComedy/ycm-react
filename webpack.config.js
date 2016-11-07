const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {version} = require('./package.json')

// NODE_ENV is not set for webpack config
// https://github.com/webpack/webpack/issues/2537#issuecomment-250950677
const isProd = process.argv.includes('-p')

const plugins = [
	new webpack.DefinePlugin({
		__VERSION__: JSON.stringify(version)
	}),
	new webpack.ProvidePlugin({
		i18n: 'i18next',
		Promise: 'bluebird',
		React: 'react'
	}),

	// Remove unnecessary moment.js locales
	// http://stackoverflow.com/a/25426019
	new webpack.ContextReplacementPlugin(/moment\/locale/, /ru/),

	// Create vendor.js bundle from node_modules imports
	// https://github.com/webpack/webpack/issues/2372#issuecomment-213149173
	new webpack.optimize.CommonsChunkPlugin({
		minChunks: ({resource}) => /node_modules/.test(resource),
		name: 'vendor'
	})
]

if (isProd) {
	plugins.push(new ExtractTextPlugin('[name].css'))
} else {
	plugins.push(new webpack.NamedModulesPlugin())
}

module.exports = {
	entry: path.resolve('src'),
	output: {
		filename: '[name].js',
		path: path.resolve('public')
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve('public'),
		proxy: {
			'/ycm': {
				target: 'http://youcomedy.me',
				changeOrigin: true,
				pathRewrite: {'^/ycm' : ''}
			}
		}
	},
	resolve: {
		alias: {
			react: 'preact-compat',
			'react-dom': 'preact-compat'
		},
		modules: [
			path.resolve('src'),
			path.resolve('node_modules')
		]
	},
	plugins,
	module: {
		loaders: [{
			test: /\.js$/,
			include: [
				path.resolve('src'),

				// preact-compat needs to be transpiled
				// https://github.com/developit/preact-compat/issues/155#issuecomment-242905949
				path.resolve('node_modules/preact-compat')
			],
			loader: 'babel',
			query: {
				stage: 0,
				cacheDirectory: true
			}
		}, {
			test: /\.css$/,
			loader: !isProd
				? 'style!css'
				: ExtractTextPlugin.extract({
					fallbackLoader: 'style',
					loader: 'css'
				})
		}]
	}
}