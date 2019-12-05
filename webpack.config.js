const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',

	optimization: {
		minimize: false,
	},

	entry: {
		'index': './src/index',
	},

	output: {
		path: path.resolve('dist'),
		libraryTarget: 'commonjs',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.svg$/,
				use: [
					'vue-loader',
					{
						loader: 'htmlvue-loader',
						options: { vPre: true },
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{ removeTitle: true },
								{
									removeAttrs: {
										attrs: 'svg:(xmlns|width|height)',
									},
								},
							],
						},
					},
				],
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
	],
};
