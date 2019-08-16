import path from 'path';
import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { APP_HOST } from '../src/constants/environment';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import packageJSON from '../../package.json';

const port = 80;
const webServerEntry = [
  `webpack-dev-server/client?http://${APP_HOST}:${port}`,
  'webpack/hot/only-dev-server'
];
const gitRevisionPlugin = new GitRevisionPlugin();

const config = {

  entry: {
    cart: [path.join(__dirname, '../src/apps/demo'), ...webServerEntry]
    // overlay: [path.join(__dirname, '../src/apps/overlay'), ...webServerEntry],
    // minicart: [path.join(__dirname, '../src/apps/minicart'), ...webServerEntry],
    // quickadd: [path.join(__dirname, '../src/apps/quickadd'), ...webServerEntry]
  },

  output: {
    filename: 'js/demo.bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    path: path.join(__dirname, '../dev'),
    publicPath: `http://${APP_HOST}:${port}/`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new LiveReloadPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!fetch-ie8'
    }),
    new ExtractTextPlugin('css/demo.css', { allChunks: true }),
    // new webpack.DefinePlugin({
    //   VERSION: JSON.stringify(gitRevisionPlugin.version()),
    //   PACKAGE_JSON_VERSION: JSON.stringify(packageJSON.version),
    //   COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
    // })
  ],

  resolve: {
    alias: {
      app: path.join(__dirname, '../src/apps'),
      extension: path.join(__dirname, '../src/browser/extension'),
      jquery: path.join(__dirname, '../src/apps/shared/noop')
    },
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          //{ loader: 'postcss-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /^(?!.*\.spec\.js$).*\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'add-module-exports',
            'transform-decorators-legacy',
            'transform-class-properties',
            [
              'react-transform',
              {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }]
              }
            ]
          ]
        }
      }
    ]
  },

};

config.devtool = 'source-map';
export default config;
