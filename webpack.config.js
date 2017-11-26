const {resolve} = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {version} = require('./package.json')

module.exports = (env) => {
	const isProd = env === 'production'

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
		}),

		new HtmlWebpackPlugin({
			template: resolve('src/client/index.html')
		})
	]

	if (isProd) {
		plugins.push(new ExtractTextPlugin('[name].bundle.[contenthash:4].css'))
	} else {
		plugins.push(new webpack.NamedModulesPlugin())
	}

	return {
		entry: [
			'regenerator-runtime/runtime',
			resolve('src/client')
		],
		output: {
			filename: isProd
				? '[name].bundle.[chunkhash:4].js'
				: '[name].bundle.js',
			path: resolve('public'),
			publicPath: '/'
		},
		stats: {modules: false},
		devtool: 'cheap-module-source-map',
		devServer: {
			stats: {modules: false},
			historyApiFallback: true,
			contentBase: resolve('public'),
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
				react: 'inferno-compat',
				'react-dom': 'inferno-compat'
			},
			modules: [
				resolve('src/client'),
				resolve('node_modules')
			]
		},
		plugins,
		module: {
			rules: [{
				test: /\.js$/,
				use: 'babel-loader'
			}, {
				test: /\.css$/,
				use: isProd
					? ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
					: ['style-loader', 'css-loader']
			}]
		}
	}

}
