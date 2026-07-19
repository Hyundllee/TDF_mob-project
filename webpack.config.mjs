import path from 'node:path'
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const root = path.dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    clean: true,
    publicPath: '/',
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name].[contenthash:8][ext]' },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    static: false,
    historyApiFallback: true,
    hot: true,
    port: 4173,
  },
  performance: { hints: false },
}
