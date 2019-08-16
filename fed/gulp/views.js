import gulp from 'gulp';
import jade from 'gulp-jade';

const paths = ['./fed/src/views/*.jade'];

const compile = (dest, path, env = 'prod') => () => {
  gulp.src(path)
    .pipe(jade({
      locals: { env }
    }))
    .pipe(gulp.dest(dest));
};

gulp.task('views:dev', compile('./fed/dev', paths, 'dev'));
gulp.task('views:build:web', compile('./fed/build/web', paths[0]));
gulp.task('views:watch', () => {
  gulp.watch(paths, ['views:dev']);
});