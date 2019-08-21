import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webConfig from '../webpack/webpack.env';
import path from 'path';
import del from 'del';

const build = (config, callback) => {
  const myConfig = Object.create(config);

  webpack(myConfig, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    callback();
  });
};

gulp.task('clean', () => {
  return del([
    path.join(__dirname, '../../src/main/resources/static/app/**/*'),
    path.join(__dirname, '../../src/main/resources/static/css/**/*')
  ]);
});

gulp.task('webpack:build', ['clean'], callback => {
  build(webConfig, () => {
    setTimeout(callback, 500);
  });
});