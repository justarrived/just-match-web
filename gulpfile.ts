'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

const htmlreplace = require('gulp-html-replace');

gulp.task('clean', (callback) => {
  return del(['dist'], callback);
});

gulp.task('bundle-polyfills', () => {
  return gulp.src([
    'core-js/client/shim.min.js',
    'zone.js/dist/zone.js',
    'reflect-metadata/Reflect.js',
    'systemjs/dist/system.src.js'
  ], {cwd: 'node_modules/**'})
    .pipe(concat('polyfills.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-libs', () => {
  return gulp.src([
    'rxjs/**/*.js',
    '@angular/**/bundles/**/*.umd.js'
  ], {cwd: 'node_modules/**'}) /* Glob required here. */
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('compile-ts', ['tslint'], () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-app', (callback) => {
  const Builder = require('systemjs-builder');
  const builder = new Builder('dist');

  builder.loadConfig('./src/systemjs.config.js').then(() => {
    builder.buildStatic('app/**/*.js', 'dist/app.bundle.js', { minify: true })
      .then(function() {
        callback();
      })
      .catch(function(err) {
        console.log('error ' + err);
      });
  });
});

gulp.task('clean:js', (callback) => {
  return del([
    'dist/app/**/*.js',
    'dist/lib',
    '!dist/*.js'
  ], callback);
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

gulp.task('html-replace', () => {
  return gulp.src('src/index.html')
    .pipe(htmlreplace({
      polyfills: 'polyfills.min.js',
      app: 'app.bundle.js'
    }, {
      keepBlockTags: true,
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('resources', () => {
  return gulp.src(['src/**/*', '!src/systemjs.config.js', '!**/*.ts', '!**/*.scss'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts'], ['compile-ts']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/*.scss'], ['compile-sass']).on('change', function (e) {
    console.log('Sass file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/*.html'], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    'bundle-polyfills',
    'copy-libs',
    'compile-ts',
    'compile-sass',
    'bundle-app',
    'clean:js',
    'html-replace',
    'resources',
    callback);
});
