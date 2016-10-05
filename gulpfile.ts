'use strict';

const args = require('yargs').argv;
const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');

const runSequence = require('run-sequence');

const tsc = require('gulp-typescript');
const embedTemplates = require('gulp-angular-embed-templates');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');

const htmlreplace = require('gulp-html-replace');

let env = args.env || 'dev';

gulp.task('clean', (callback) => {
  return del(['dist'], callback);
});

gulp.task('compile-ts', ['tslint'], () => {
  let tsResult = gulp.src(['app/**/*.ts', '!app/config/environments/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write('.', {sourceRoot: '/app'}))
    .pipe(gulp.dest('app'));
});

gulp.task('compile-ts:prod', () => {
  let tsResult = gulp.src('app/**/*.ts', '!app/config/environments/*.ts')
    .pipe(embedTemplates({sourceType: 'ts'}))
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(gulp.dest('app'));
});

gulp.task('compile-sass', () => {
  return gulp.src('app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('app'));
});

gulp.task('tslint', () => {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('resources', () => {
  return gulp.src([
    'index.html',
    'favicon.ico',
    'apple-touch-icon.ico',
    'app/**/*.css',
  ]).pipe(flatten())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-translations', () => {
  return gulp.src(['i18n/*.json'])
    .pipe(gulp.dest('dist/i18n'));
});

gulp.task('copy-config', () => {
  return gulp.src(`app/config/environments/${env}.ts`)
    .pipe(rename('config.ts'))
    .pipe(gulp.dest('app/config'));
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

gulp.task('bundle-app', (callback) => {
  const Builder = require('systemjs-builder');
  const builder = new Builder();

  builder.loadConfig('./systemjs.config.js').then(() => {
    builder.buildStatic('./app/**/*.js', 'dist/app.bundle.js', { minify: true, sourceMaps: false })
      .then(function() {
        callback();
      })
      .catch(function(err) {
        console.log('error ' + err);
      });
  });
});

gulp.task('html-replace', () => {
  return gulp.src('index.html')
    .pipe(htmlreplace({
      polyfills: 'polyfills.min.js',
      app: 'app.bundle.js'
    }, {
      keepBlockTags: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['copy-config', 'compile-ts', 'compile-sass'], () => {
  gulp.watch('app/**/*.ts', ['compile-ts']).on('change', e => {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch('app/**/*.scss', ['compile-sass']).on('change', e => {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    'copy-config',
    'compile-ts:prod',
    'compile-sass',
    'bundle-polyfills',
    'bundle-app',
    'resources',
    'copy-translations',
    'html-replace',
    callback);
});
