import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ReplacePlugin from 'replace-webpack-plugin';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import packageJSON from '../../package.json';
import fs from 'fs';
const gitRevisionPlugin = new GitRevisionPlugin();

const replacePlugins = () => {
  const output = [];
  const folderNames = ['./src/main/resources/templates/'];
  folderNames.forEach(folderName => {
    const files = fs.readdirSync(folderName);
    files.forEach(file => {
      if (file.includes('.template')) {
        output.push(new ReplacePlugin({
          skip: process.env.NODE_ENV !== 'production',
          entry: folderName + file,
          hash: '[hash]',
          output: folderName + file.replace('.template', ''),
          data: {
          }
        }));
      }
    });
  });
  return output;
};

const config = {

  entry: {
    cart: [path.join(__dirname, '../src/apps/demo/')]
    // overlay: [path.join(__dirname, '../src/apps/overlay/')],
    // minicart: [path.join(__dirname, '../src/apps/minicart/')],
    // quickadd: [path.join(__dirname, '../src/apps/quickadd/')]
  },

  output: {
    path: path.join(__dirname, '../../src/main/resources/static/app/'),
    filename: 'demo.bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/cart/app/'
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /^(?!.*\.spec\.js$).*\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src/')
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
      // VERSION: JSON.stringify(gitRevisionPlugin.version()),
      // PACKAGE_JSON_VERSION: JSON.stringify(packageJSON.version),
      // COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash())
    }),
    new ExtractTextPlugin('css/demo.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!fetch-ie8'
    }),
    ...replacePlugins()
  ],

  resolve: {
    alias: {
      app: path.join(__dirname, '../src/apps'),
      extension: path.join(__dirname, '../src/browser/extension'),
      'account.list': path.join(__dirname, '../src/apps/shared/noop'),
      jquery: path.join(__dirname, '../src/apps/shared/noop'),
      'thd-cart-throttle':
        path.join(__dirname, '../../node_modules/thd-cart-throttle/dist/thd-cart-throttle.amd'),
      'cookie-utils':
        path.join(__dirname, '../../node_modules/cookie-utils/dist/cookie-utils')
    },
    extensions: ['.js', '.jsx']
  },

};

config.devtool = 'source-map';

export default config;
