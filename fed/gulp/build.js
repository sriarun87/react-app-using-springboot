import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webConfig from '../webpack/webpack.env';
import webConfigDebug from '../webpack/webpack.env.debug';
import path from 'path';
import jsonFile from 'jsonfile';
import del from 'del';

const build = (config, callback) => {
  const myConfig = Object.create(config);

  webpack(myConfig, (err/*, stats*/) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    // gutil.log('[webpack:build]', stats.toString({ colors: true }));
    // jsonFile.writeFile(path.join(__dirname, '../../src/main/resources/static/app/stats.json'), stats.toJson());
    callback();
  });
};

gulp.task('clean', () => {
  return del([
    path.join(__dirname, '../../src/main/resources/static/app/**/*'),
    path.join(__dirname, '../../src/main/resources/static/css/**/*')
  ]);
});

gulp.task('webpack:build:web', ['clean'], callback => {
  build(webConfig, () => {
    setTimeout(callback, 500);
  });
});

// gulp.task('webpack:build:web:debug', ['clean', 'webpack:build:web'], callback => {
//   build(webConfigDebug, () => {
//     setTimeout(callback, 500);
//   });
// });