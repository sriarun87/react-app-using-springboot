import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {

  entry: {
    cart: [path.join(__dirname, '../src/apps/demo/')]
  },

  output: {
    path: path.join(__dirname, '../../src/main/resources/static/app/'),
    filename: 'demo.bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/demo/app/'
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
    }),
    new ExtractTextPlugin('css/demo.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!fetch-ie8'
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

export default config;