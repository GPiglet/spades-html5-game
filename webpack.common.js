const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');

module.exports = (env) => {
  const isDev = !!env.dev;

  return {
    entry: {
      main: path.join(dirSrc, '/scripts/index'),
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isDev,
                // url: false,
              }
            },
            'postcss-loader'
          ]
        },

        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
        },

      ]
    },
    plugins: [
      new webpack.DefinePlugin({ isDev }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/templates/index.html'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({ filename: "src/styles/main.css" }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
    resolve: {
      modules: [dirNode, dirSrc],
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ]
    },
  }
}