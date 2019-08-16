import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./fed/gulp');

gulp.task('build:web', [
  'eslint',
  'webpack:build:web',
]);