const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const path = require('path');

const microfrontendName = 'mf-dashboard';
const outputPath = process.env.MF_OUTPUT_PATH || path.resolve(__dirname, 'dist/mf-dashboard');
const publicHost = process.env.MF_PUBLIC_HOST || 'http://localhost:4201';

module.exports = withModuleFederationPlugin({
  name: microfrontendName,
  
  exposes: {
    './DashboardModule': './src/app/dashboard.module.ts',
    './DashboardComponent': './src/app/dashboard.component.ts',
  },

  remotes: {
    'shell': 'shell@http://localhost:4200/mf-manifest.json',
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/material': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    'rxjs': { singleton: true, strictVersion: true, requiredVersion: '7.8.0' },
    'single-spa': { singleton: true, strictVersion: true, requiredVersion: '6.0.0' },
    'zone.js': { singleton: true, strictVersion: true, requiredVersion: '0.14.2' },
  },

  filename: 'remoteEntry.js',
  exposesFederationAdapterAndPublicAPIs: true,
});

module.exports = {
  ...module.exports,
  output: {
    publicPath: `${publicHost}/`,
    path: outputPath,
  },
  devServer: {
    port: 4201,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@shell': path.resolve(__dirname, '../shell/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 20,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};