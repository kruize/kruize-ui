// const path = require('path');
// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
// const { stylePaths } = require("./stylePaths");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
// const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// module.exports = merge(common('production'), {
//   mode: 'production',
//   devtool: 'source-map',
//   optimization: {
//     minimizer: [
//       new TerserJSPlugin({}),
//       new CssMinimizerPlugin({
//         minimizerOptions: {
//           preset: ['default', { mergeLonghand: false }]
//         }
//       })
//     ],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//       chunkFilename: '[name].bundle.css'
//     })
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         include: [
//           ...stylePaths
//         ],
//         use: [MiniCssExtractPlugin.loader, 'css-loader']
//       }
//     ]
//   }
// });

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { stylePaths } = require("./stylePaths");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');

module.exports = merge(common('production'), {
  mode: 'production',
  // devtool: 'inline-source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { mergeLonghand: false }]
        }
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].bundle.css'
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(packageJson.version)
    })
  ],
  module: {
    // rules: [
    //   {
    //     test: /\.css$/,
    //     include: [
    //       ...stylePaths
    //     ],
    //     use: [MiniCssExtractPlugin.loader, 'css-loader']
    //   }
    // ]

    rules: [
      {
        test: /\.css$/,
        include: [
          ...stylePaths
        ],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          // {
          //   loader: 'markdown-loader',
          // },
        ],
      }

    ]
  }
});
