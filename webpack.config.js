const path           = require('path');
// const webpack        = require('webpack');
const HtmlPlugin     = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const paths = {
	src:  path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry:        {
		'index': path.join(paths.src, 'index', 'script.js'),
		'blog':  path.join(paths.src, 'blog', 'script.js')
	},
	output:       {
		path:     paths.dist,
		filename: '[name].js'
	},
	devtool:      isDev ? 'cheap-inline-module-source-map' : false,
	mode:         isDev ? 'development' : 'production',
	watch:        isDev,
	watchOptions: {
		aggregateTimeout: 100
	},
	devServer:    {
		compress: true,
		overlay:  {
			errors:   true,
			warnings: true
		},
		open:     false
	},
	plugins:      [
		/*
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		}),
		*/
		new HtmlPlugin({
			filename: 'index.html',
			chunks:   ['index'],
			template: path.join(paths.src, 'index', 'index.pug')
		}),
		new HtmlPlugin({
			filename: 'blog.html',
			chunks:   ['blog'],
			template: path.join(paths.src, 'blog', 'index.pug')
		}),
		new MiniCssExtract({
			filename:      '[name].css',
			chunkFilename: '[id].css'
		})
	],
	module:       {
		rules: [
			{
				test:    /\.pug$/,
				exclude: /(node_modules|bower_components)/,
				loader:  'pug-loader',
				options: {
					pretty: isDev
				}
			},
			{
				test:    /\.styl$/,
				exclude: /(node_modules|bower_components)/,
				use:     [MiniCssExtract.loader, 'css-loader', 'postcss-loader', 'stylus-loader']
			},
			{
				test:    /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader:  'babel-loader'
			}
		]
	}
};
