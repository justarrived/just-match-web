'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const del = require('del');
const tsc = require('gulp-typescript');
const embedTemplates = require('gulp-angular-embed-templates');
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

gulp.task('clean:js', (callback) => {
  return del([
    'dist/app/**/*.js',
    'dist/lib',
    '!dist/*.js'
  ], callback);
});

gulp.task('copy-libs', () => {
  return gulp.src([
    'core-js/client/shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'reflect-metadata/Reflect.js',
    'rxjs/**/*.js',
    'ng2-translate/**/*.js',
    'zone.js/dist/**',
    '@angular/**/bundles/**'
  ], {cwd: 'node_modules/**'})
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('compile-ts', ['tslint'], () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-ts:prod', () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(embedTemplates({sourceType: 'ts', basePath: 'src/'}))
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

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('resources', () => {
  return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss'])
    .pipe(gulp.dest('dist'));
});

gulp.task('resources:prod', () => {
  return gulp.src(['src/index.html', 'src/favicon.ico', 'src/apple-touch-icon.ico'])
    .pipe(gulp.dest('dist'));
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
  const builder = new Builder('dist');

  builder.loadConfig('./src/systemjs.config.js').then(() => {
    builder.buildStatic('app/**/*.js', 'dist/app.bundle.js', { minify: true, sourceMaps: false })
      .then(function() {
        callback();
      })
      .catch(function(err) {
        console.log('error ' + err);
      });
  });
});

gulp.task('html-replace', () => {
  return gulp.src('src/index.html')
    .pipe(htmlreplace({
      polyfills: 'polyfills.min.js',
      app: 'app.bundle.js'
    }, {
      keepBlockTags: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  watch('src/**/*.ts', () => {
    gulp.start('compile-ts');
  });
  watch('src/**/*.scss', () => {
    gulp.start('compile-sass');
  });
  watch(['src/**/*.html', 'src/i18n/*.json'], () => {
    gulp.start('resources');
  });
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    'copy-libs',
    'compile-ts',
    'compile-sass',
    'resources',
    callback);
});

gulp.task('build:prod', (callback) => {
  runSequence(
    'clean',
    'bundle-polyfills',
    'copy-libs',
    'compile-ts:prod',
    'compile-sass',
    'bundle-app',
    'clean:js',
    'resources:prod',
    'html-replace',
    callback);
});
