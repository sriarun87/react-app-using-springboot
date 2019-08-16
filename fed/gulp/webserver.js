import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackLocal from '../webpack/webpack.local';
const port = 3000;

gulp.task('webpack-dev-server', () => {
  const localDevConfig = Object.create(webpackLocal);
  const compiler = webpack(localDevConfig, (err) => {
    if (err) throw new gutil.PluginError('webpack', err);
  });
  new WebpackDevServer(compiler, {
    contentBase: './fed/dev',
    publicPath: localDevConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    disableHostCheck: true,
    // hot: true,
    inline: true,
    proxy: {
      '/demo': {
        target: 'http://127.0.0.1',
        pathRewrite: function pathRewrite(urlPath) {
          const parts = urlPath.split('?');
          const queryString = parts[1] || '';
          const url = parts[0];
          const extn = (parts[0]).indexOf('.') !== -1
            ? ''
            : '.html';
          const u = url.replace('/demo', '') + extn + '?' + queryString;
          return u;
        }
      }
    },
    historyApiFallback: true
  }).listen(port, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `listening at port ${port}`);
  });
  webpackHotMiddleware(compiler);
});