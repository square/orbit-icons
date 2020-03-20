const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',

	resolve: {
		alias: {
			'feather-icons': 'feather-icons/dist/icons/',
			'simple-icons': 'simple-icons/icons/',
		},
	},

	entry: {
		'index': './src/index',
	},

	output: {
		path: path.resolve('dist'),
		libraryTarget: 'umd',
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
					{
						loader: 'svg-trace-loader',
						options: {
							dimensions: {
								width: 16,
								height: 16,
							},
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
