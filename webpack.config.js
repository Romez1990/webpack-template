const path           = require('path');
const Clean          = require('clean-webpack-plugin');
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
        'index': path.join(paths.src, 'index', 'script.js'),
        'blog':  path.join(paths.src, 'blog', 'script.js'),
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
        extensions: [ '.pug', '.styl', '.js', '.json' ],
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
        new Clean(),
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
            filename:      'css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization:  {
        minimizer: [
            new UglifyJsPlugin(),
        ],
    },
    module:        {
        rules: [
            {
                test:    /\.pug$/,
                loader:  'pug',
                options: {
                    pretty: dev,
                },
            },
            {
                test: /\.js$/,
                use:  [
                    {
                        loader:  'babel',
                        options: {
                            presets: [ '@babel/preset-env' ],
                            // plugins: [ '@babel/plugin-transform-runtime' ],
                        },
                    },
                ],
            },
            {
                test: /\.styl$/,
                use:  [
                    MiniCssExtract.loader,
                    { loader: 'css', options: { importLoaders: 2, sourceMap: dev, url: false } },
                    'postcss',
                    'stylus',
                ],
            },
        ],
    },
};
