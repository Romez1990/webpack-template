const path            = require('path');
// const webpack         = require('webpack');
const HtmlPlugin      = require('html-webpack-plugin');
const MiniCssExtract  = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const paths = {
	src:  path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry:        {
		index: path.join(paths.src, 'index', 'script.js'),
		blog:  path.join(paths.src, 'blog', 'script.js')
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
			template: path.join(paths.src, 'template.pug')
		}),
		new HtmlPlugin({
			filename: 'blog.html',
			chunks:   ['blog'],
			template: path.join(paths.src, 'template.pug')
		}),
		new MiniCssExtract({
			filename:      '[name].css',
			chunkFilename: '[id].css'
		}),
		new VueLoaderPlugin()
	],
	module:       {
		rules: [
			{
				test:    /\.pug$/,
				exclude: /(node_modules|bower_components)/,
				// loader:  'pug-loader',
				oneOf:   [
					// this applies to `<template lang="pug">` in Vue components
					{
						resourceQuery: /^\?vue/,
						use:           ['pug-plain-loader']
					},
					// this applies to pug imports inside JavaScript
					{
						// use: ['raw-loader', 'pug-plain-loader']
						use: [
							{
								loader:  'pug-loader',
								options: {
									pretty: isDev
								}
							}
						]
					}
				]
			},
			{
				test:    /\.styl(us)?$/,
				exclude: /(node_modules|bower_components)/,
				use:     [
					{
						loader: MiniCssExtract.loader/*,
						options: {
							sourceMap: isDev
						}*/
					},
					{
						loader:  'css-loader',
						options: {
							sourceMap: isDev
						}
					},
					{
						loader: 'stylus-loader'/*,
						options: {
							sourceMap: isDev
						}*/
					}
				]
			},
			{
				test:    /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use:     {
					loader:  'babel-loader',//?optional[]=runtime&stage=0',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			},
			{
				test:   /\.vue$/,
				loader: 'vue-loader'
			}
		]
	}
};
