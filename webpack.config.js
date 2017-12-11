var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');

var config = {
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: PROD ? false : true
        }),
    ],
    entry: {
        'Viewer': __dirname + '/src/index.js',
    },
    output: {
        libraryTarget: 'umd',
        library: 'Viewer',
        path: __dirname + '/build',
        filename: PROD ? '[name].min.js' : '[name].js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|lib)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }
        ]
    }
};

if (PROD) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
