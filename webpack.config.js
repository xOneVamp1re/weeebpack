const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development'

  return {
    mode: env.mode ?? 'development',

    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
      assetModuleFilename: path.join('[path][name].[contenthash][ext]')
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      }),

      new webpack.ProgressPlugin(),

      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src/js'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },

        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { config: { path: 'src/js/postcss.config.js' } }
            }
          ]
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            { loader: 'postcss-loader' },
            'sass-loader'
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource'
        },

        {
          test: /\.svg$/,
          type: 'asset/resource'
        },

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        },

        {
          test: /\.html$/i,
          loader: 'html-loader'
        }
      ]
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      compress: true,
      open: true,
      port: 9000
    }
  }
}
