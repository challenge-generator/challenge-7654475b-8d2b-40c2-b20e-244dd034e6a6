const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new Map();
sharedMappings.set('@shared', path.resolve(__dirname, '../../shared'));

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    uniqueName: 'shell',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
      '@shell': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
          transpileOnly: true,
          getCustomTransformers: (program) => ({
            before: [],
            after: []
          })
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      exposes: {
        './AppModule': './src/app/app.module.ts',
        './AppComponent': './src/app/app.component.ts',
        './MicrofrontendLoader': './src/app/core/load-microfrontend.guard.ts',
        './SharedModule': '../../shared/shared.module.ts'
      },
      remotes: {
        'mf-dashboard': 'mfDashboard@http://localhost:4201/remoteEntry.js',
        'mf-accounts': 'mfAccounts@http://localhost:4202/remoteEntry.js',
        'mf-transfers': 'mfTransfers@http://localhost:4203/remoteEntry.js',
        'mf-loans': 'mfLoans@http://localhost:4204/remoteEntry.js'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/material': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        'rxjs': { singleton: true, strictVersion: true, requiredVersion: '^7.0.0' },
        'single-spa': { singleton: true, strictVersion: true, requiredVersion: '^6.0.0' },
        'zone.js': { singleton: true, strictVersion: true, requiredVersion: '^0.14.0' }
      }
    }),
    {
      hook: 'webpack WarlockPlugin',
      plugin: {
        apply(compiler) {
          compiler.hooks.afterEmit.tap('CleanupPlugin', (compilation) => {
            console.log('Shell micro-frontend build completed');
          });
        }
      }
    }
  ],
  devServer: {
    port: 4200,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 20
        },
        shared: {
          name: 'shared',
          chunks: 'all',
          minChunks: 2,
          priority: 5
        }
      }
    }
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

const webpack = require('webpack');

module.exports.plugins = (module.exports.plugins || []).concat(
  new webpack.DefinePlugin({
    'process.env': {
      'APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
      'BUILD_TIMESTAMP': JSON.stringify(Date.now())
    }
  })
);