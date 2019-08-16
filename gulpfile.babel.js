import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./fed/gulp');

gulp.task('default', [
  'replace-webpack-code',
  'webpack-dev-server',
  'post-css',
  'copy:node_modules',
  'copy:static',
  'views:dev',
  'views:watch',
  'eslint:watch'
]);

gulp.task('requirejs', [
  'build:allJS'
]);

gulp.task('build:web', [
  'eslint',
  'webpack:build:web',
  // 'build:allJS',
  'webpack:build:web:debug',
  // 'requirejs',
  // 'post-css:build:web',
  // 'post-css:min:web',
  // 'css:min:web',
  'copy:build:web',
  // 'build:npm-list:hfapp',
  // 'build:npm-list:app'
]);

gulp.task('build:css', [
  'post-css:build:web',
  'post-css:min:web',
  'css:min:web',
  'copy:build:web'
]);
