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

const inject = require('gulp-inject');
/**
 * Remove build directory.
 */
gulp.task('clean', (callback) => {
  return del(['build'], callback);
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

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task('compile', ['tslint'], () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(uglify())
    // .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
    .pipe(gulp.dest('build'));
});

gulp.task('compile-sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('build'));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('resources', () => {
  return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss'])
    .pipe(gulp.dest('build'));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task('libs', () => {
  return gulp.src([
    'core-js/client/shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'reflect-metadata/Reflect.js',
    'rxjs/**/*.js',
    'zone.js/dist/**',
    '@angular/**/bundles/**'
  ], {cwd: 'node_modules/**'}) /* Glob required here. */
    // .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/lib'));
});

// gulp.task('inject', () => {
//   return gulp.src('src/index.html')
//     .pipe(inject(gulp.src(['build/vendor.js']), {ignorePath: 'build/'}))
//     .pipe(gulp.dest('build/'));
// });

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts'], ['compile']).on('change', function (e) {
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
 * Build the project.
 */
gulp.task('build', (callback) => {
  console.log('Building the project ...');
  runSequence(
    'compile',
    'compile-sass',
    'resources',
    'libs',
    callback);
});
