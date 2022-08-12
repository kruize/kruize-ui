

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
// Monaco Editor uses CSS imports internally,
// so we need a separate css-loader for app and monaco-editor packages

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    mainFields: ['main', 'module', 'browser'],
  },
  entry: './src/index.js',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
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
			test: /\.css$/i,
			use: ['file-loader', 'style-loader', 'css-loader']
		  },
      {
        test: /\css$/i, include: MONACO_DIR, use: ['file-loader','style-loader', 'css-loader'],
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
