import gulp from 'gulp';
import rename from 'gulp-rename';
import install from 'gulp-install';

const copy = (dest) => () => {
  gulp.src('./src/assets/**/*').pipe(gulp.dest(dest));
};

gulp.task('copy:build:web', copy('./build/web'));

gulp.task('copy:node_modules', () => {
  return gulp
    .src('src/main/resources/static/node_modules/**/*.*', { base: '../' })
    .pipe(rename(p => {
      const splitter = process.platform === 'darwin'
        ? '/'
        : '\\';

      const parts = p.dirname.split(splitter);
      p.dirname = parts.slice(5, parts.length).join(splitter); // eslint-disable-line
      return p;
    }))
    .pipe(gulp.dest('./fed/dev'));
});


gulp.task('copy:static', () => {
  return gulp
    .src('src/main/resources/static/assets/**/*.*', { base: 'src/main/resources/static' })
    .pipe(gulp.dest('./fed/dev'));
});

gulp.task('install:static', () => {
  gulp.src(['package.json', 'src/main/resources/static/package.json'])
    .pipe(install());
});
