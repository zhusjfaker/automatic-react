'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const paths = require('./paths')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const resolve = require('resolve')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const publicPath = '/'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const isDev = process.env.NODE_ENV === 'development'
const devtool = isDev ? 'cheap-module-source-map' : false
const fs = require('fs')
const useTypeScript = fs.existsSync(paths.appTsConfig)

const mode = process.argv.findIndex(p => p === "--type") > -1 ? process.argv[process.argv.findIndex(p => p === "--type") + 1] : null;

const optimization = {
  runtimeChunk: mode === "page" ? true : false,
  splitChunks: {
    chunks: 'all',
    name: false,
    cacheGroups: {
      // vendors: {
      //   test: (module) => {
      //     return module.resource &&
      //       /\.js$/.test(module.resource) &&
      //       module.resource.match('node_modules')
      //   },
      //   name: 'vendor'
      // }
    }
  }
}

if (!isDev) {
  optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: shouldUseSourceMap
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: shouldUseSourceMap
          ? {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true
          }
          : false
      }
    })
  ]
}

const plugins = [
  new webpack.DefinePlugin({
    __isBrowser__: true
  }),
  useTypeScript &&
  new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules
    }),
    async: false,
    useTypescriptIncrementalApi: true,
    checkSyntacticErrors: true,
    tsconfig: paths.appTsConfig,
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!src/setupProxy.js',
      '!src/setupTests.*'
    ],
    watch: paths.appSrc,
    silent: true,
    formatter: typescriptFormatter
  }),
  new ModuleNotFoundPlugin(paths.appPath),
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  mode.toLowerCase() === "page" && new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html')
  })
].filter(Boolean)

if (process.env.npm_config_report === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

const config = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  devtool: devtool,
  entry: {
    index: mode.toLowerCase() === "page" ? "./src/index.tsx" : './src/component/index.tsx'
  },
  output: {
    path: mode.toLowerCase() === "page" ? paths.appDist : paths.appBuild,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: publicPath,
    hotUpdateChunkFilename: '[hash].hot-update.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: optimization,
  plugins: plugins.filter(Boolean),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
})

if (mode.toLowerCase() !== "page") {
  config.externals = {
    react: "react",
    reactDom: "react-dom",
    reactDevUtils: "react-dev-utils"
  }

  const name = require('../package.json').name.replace("@ali/", "").replace(/-/g, "");
  config.output.library = name;
  config.output.libraryTarget = "commonjs2";
  delete config.optimization;
}

module.exports = config;