import gulp from 'gulp';
import eslint from 'gulp-eslint';

const SOURCE_FILES = 'fed/src/**/*.js';
const TEST_FILES = 'fed/test/**/*.js';
const COVERAGE_EXCLUSION = '!fed/test/coverage/**/*.js';
// const ALL_FILES = 'fed/**/*.js';

gulp.task('eslint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([
    SOURCE_FILES,
    TEST_FILES,
    COVERAGE_EXCLUSION
  ],
    // ALL_FILES,
    { base: './' }
  )
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.

    // AUTOFORMATTER
    // .pipe(eslint({
    //   fix: true,
    //   configFile: '.eslintrc'
    // }))
    // .pipe(eslint.format())
    // .pipe(gulp.dest('.'))

    // NON-AUTOFORMATTER
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.formatEach())

    // Alternatively use eslint.formatEach() (see Docs).
    // .pipe(eslint.formatEach())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('eslint:watch', () => {
  gulp.watch([SOURCE_FILES], ['eslint']);
});