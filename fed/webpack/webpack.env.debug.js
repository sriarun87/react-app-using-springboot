import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import packageJSON from '../../package.json';

const gitRevisionPlugin = new GitRevisionPlugin();

const config = {

  entry: {
    cart: [path.join(__dirname, '../src/apps/cart/')]
    // overlay: [path.join(__dirname, '../src/apps/overlay/')],
    // minicart: [path.join(__dirname, '../src/apps/minicart/')],/*
    // quickadd: [path.join(__dirname, '../src/apps/quickadd/')]*/
  },

  output: {
    path: path.join(__dirname, '../../src/main/resources/static/app/'),
    filename: 'demo.debug.js',
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
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!fetch-ie8'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
      // VERSION: JSON.stringify(gitRevisionPlugin.version()),
      // PACKAGE_JSON_VERSION: JSON.stringify(packageJSON.version),
      // COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash())
    }),
  ],

  resolve: {
    alias: {
      app: path.join(__dirname, '../src/apps'),
      extension: path.join(__dirname, '../src/browser/extension'),
      jquery: path.join(__dirname, '../src/apps/shared/noop')
    },
    extensions: ['.js', '.jsx']
  },

};

config.devtool = 'source-map';

export default config;
