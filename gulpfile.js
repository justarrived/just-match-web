const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const sequence = require('gulp-sequence');

gulp.task('sass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./temp'));
});

gulp.task('copy:bkp', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(rename({ extname: '.scssbkp' }))
    .pipe(gulp.dest('./temp'));
});

gulp.task('rename:css:scss', () => {
  return gulp.src('./temp/**/*.css')
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest('./src'));
});

gulp.task('rename:bkp:scss', () => {
  return gulp.src('./temp/**/*.scssbkp')
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest('./src'));
});

gulp.task('clean', () => {
  return gulp.src(['./temp/**/*.scssbkp', './temp/**/*.css'], { read: false })
    .pipe(clean());
});

gulp.task('before:ngc', sequence('sass', 'copy:bkp', 'rename:css:scss'));
gulp.task('after:ngc', sequence('rename:bkp:scss', 'clean'));
