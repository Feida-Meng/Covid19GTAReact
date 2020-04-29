const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: "cheap-module-source-map",
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/i,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
		]


	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}

};