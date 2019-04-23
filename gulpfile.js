const rimraf = require('rimraf');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('./tsconfig.json');
const __OUTPUT_DIR__ = tsProject.config.compilerOptions.outDir;
const __INPUT_DIR__ = tsProject.config.include;

gulp.task('clean', (cb) => {
  rimraf(__OUTPUT_DIR__, cb);
});

gulp.task('tsc', () => {
  return gulp.src(__INPUT_DIR__)
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest(__OUTPUT_DIR__));
});

gulp.task('compile', gulp.series('tsc'));

gulp.task('watch', () => {
  gulp.watch(__INPUT_DIR__, {
    ignoreInitial: false
  }, gulp.series('compile'));
});

gulp.task('default', gulp.parallel('clean', 'compile'));
