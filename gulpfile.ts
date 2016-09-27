'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
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

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
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

gulp.task('bundle-vendor', () => {
  return gulp.src([
    'rxjs/**/*.js',
    '@angular/**/bundles/**/*.umd.js'
  ], {cwd: 'node_modules/**'}) /* Glob required here. */
    // .pipe(concat('vendor.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('bundle-app', ['tslint'], () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    // .pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'));
});

/**
 * Copy all resources that are not TypeScript files into dist directory.
 */
gulp.task('resources', () => {
  return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss'])
    .pipe(gulp.dest('dist'));
});

gulp.task('html-replace', () => {
  return gulp.src('src/index.html')
    .pipe(htmlreplace({
      polyfills: 'polyfills.min.js',
      vendor: 'vendor.min.js',
      app: 'app.min.js'
    }, {
      keepBlockTags: true,
    }))
    .pipe(gulp.dest('src'));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts'], ['bundle-app']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/*.scss'], ['compile-sass']).on('change', function (e) {
    console.log('Sass file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/*.html'], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

/**
 * Dist the project.
 */
gulp.task('build', (callback) => {
  console.log('Building the project ...');
  runSequence(
    'clean',
    'bundle-polyfills',
    'bundle-vendor',
    'bundle-app',
    'compile-sass',
    'html-replace',
    'resources',
    callback);
});
