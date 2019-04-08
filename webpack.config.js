const path            = require('path');
const HtmlPlugin      = require('html-webpack-plugin');
const MiniCssExtract  = require('mini-css-extract-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const paths = {
    src:  path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

module.exports = {
    entry:         {
        'index': path.join(paths.src, 'index', 'script.ts'),
        'blog':  path.join(paths.src, 'blog', 'script.ts'),
    },
    output:        {
        path:     paths.dist,
        filename: 'js/[name].js',
    },
    devtool:       dev ? 'inline-module-source-map' : false,
    mode:          dev ? 'development' : 'production',
    watch:         dev,
    watchOptions:  {
        aggregateTimeout: 100,
    },
    resolve:       {
        extensions: [ '.pug', '.styl', '.ts', '.tsx', '.json' ],
    },
    resolveLoader: {
        moduleExtensions: [ '-loader' ],
    },
    devServer:     {
        compress: true,
        overlay:  {
            errors:   true,
            warnings: true,
        },
        open:     false,
    },
    plugins:       [
        new HtmlPlugin({
            filename: 'index.html',
            chunks:   [ 'index' ],
            template: path.join(paths.src, 'template.pug'),
        }),
        new HtmlPlugin({
            filename: 'blog.html',
            chunks:   [ 'blog' ],
            template: path.join(paths.src, 'template.pug'),
        }),
        new MiniCssExtract({
            filename:      'css/[name].css',
            chunkFilename: '[id].css',
            sourceMap:     dev,
        }),
        new VueLoaderPlugin(),
    ],
    optimization:  {
        minimizer: [ new UglifyJsPlugin({
            sourceMap: true,
        }) ],
    },
    module:        {
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
                                    pretty: dev
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
                        loader:  MiniCssExtract.loader,
                        options: {
                            sourceMap: dev,
                        },
                    },
                    {
                        loader:  'css',
                        options: {
                            sourceMap: dev,
                        },
                    },
                    {
                        loader:  'stylus',
                        options: {
                            sourceMap: dev,
                        },
                    },
                ],
            },
            {
                test:    /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use:     [
                    {
                        loader:  'babel',//?optional[]=runtime&stage=0',
                        options: {
                            presets: [ '@babel/preset-env' ],
                            plugins: [ '@babel/plugin-transform-runtime' ],
                        },
                    },
                    {
                        loader: 'ts',
                    },
                ],
            },
            {
                test:   /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
};
