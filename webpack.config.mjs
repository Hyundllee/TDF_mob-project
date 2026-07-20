import path from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const root = path.dirname(fileURLToPath(import.meta.url))
const tdfAssetRoot = path.resolve(root, 'src/assets/images/fund/tdf')

class EmitTdfAssetsPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('EmitTdfAssetsPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'EmitTdfAssetsPlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          for (const entry of readdirSync(tdfAssetRoot, { withFileTypes: true })) {
            if (!entry.isFile() || entry.name.endsWith('.ts')) continue

            const sourcePath = path.join(tdfAssetRoot, entry.name)
            const outputPath = `assets/images/fund/tdf/${entry.name}`
            compilation.emitAsset(
              outputPath,
              new compiler.webpack.sources.RawSource(readFileSync(sourcePath)),
            )
          }
        },
      )
    })
  }
}

export default {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
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
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new EmitTdfAssetsPlugin(),
  ],
  devServer: {
    static: false,
    historyApiFallback: true,
    hot: true,
    port: 4173,
  },
  performance: { hints: false },
}
