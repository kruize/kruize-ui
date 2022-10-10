

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
// Monaco Editor uses CSS imports internally,
// so we need a separate css-loader for app and monaco-editor packages

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.ttf'],
    mainFields: ['main', 'module', 'browser'],
  },
  entry: './src/index.js',
  target: 'electron-renderer',
  devtool: 'source-map',
  // module: {

  // },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ["style-loader", "css-loader"]
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000'
    }],
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //       plugins: ['@babel/plugin-transform-runtime']
      //     }
      //   }
      // },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/i,
        use: ['file-loader', 'style-loader', 'css-loader']
      },

      {
        test: /\css$/i, include: MONACO_DIR, use: ['file-loader', 'style-loader', 'css-loader'],
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  plugins: [new HtmlWebpackPlugin(), new MonacoWebpackPlugin()],
  sourceType: "unambiguous"
};


// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const path = require('path');

// module.exports = {
// 	entry: './index.js',
// 	output: {
// 		path: path.resolve(__dirname, 'dist'),
// 		filename: 'app.js'
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: ['style-loader', 'css-loader']
// 			},
// 			{
// 				test: /\.ttf$/,
// 				type: 'asset/resource'
// 			}
// 		]
// 	},
// 	plugins: [new MonacoWebpackPlugin()]
// };
