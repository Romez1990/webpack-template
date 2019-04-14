const path           = require('path');
const HtmlPlugin     = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
        filename: '[name].js',
    },
    devtool:       dev ? 'inline-module-source-map' : false,
    mode:          dev ? 'development' : 'production',
    watch:         dev,
    watchOptions:  {
        aggregateTimeout: 100,
    },
    resolve:       {
        extensions: [ '.pug', '.css', '.styl', '.js', '.ts', '.tsx', '.json' ],
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
            template: path.join(paths.src, 'index', 'index.pug'),
        }),
        new HtmlPlugin({
            filename: 'blog.html',
            chunks:   [ 'blog' ],
            template: path.join(paths.src, 'blog', 'index.pug'),
        }),
        new MiniCssExtract({
            filename:      '[name].css',
            chunkFilename: '[id].css',
            sourceMap:     dev,
        }),
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
                loader:  'pug',
                options: {
                    pretty: dev,
                },
            },
            {
                test:    /\.styl$/,
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
        ],
    },
};
