'use strict'

let gulp = require('gulp'),
  changed = require('gulp-changed'),
  connect = require('gulp-connect'),
  del = require('del'),
  ghPages = require('gulp-gh-pages'),
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  merge = require('merge-stream'),
  jade = require('gulp-jade'),
  swPrecache = require('sw-precache')

let path = require('path')
let runSequence = require('run-sequence')

const packageJson = require('./package.json')

gulp.task('jade', () => {
  return gulp.src('app/jade_views/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./app/views/'))
})

gulp.task('usemin', () => {
  return gulp.src('app/index.html')
    .pipe(usemin({
      html: [htmlmin({ collapseWhitespace: true, removeComments: true })],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy', () => {
  let html = gulp.src('app/views/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist/views'))

  let images = gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images/'))

  let manifest = gulp.src('app/manifest.json')
    .pipe(gulp.dest('dist/'))

  let vendor = gulp.src('app/vendor/bootstrap/**/*')
    .pipe(gulp.dest('dist/vendor/bootstrap/'))

  return merge(html, images, manifest, vendor)
})

gulp.task('server:connect', () => {
  return connect.server({
    livereload: true,
    fallback: 'app/index.html',
    host: 'localhost',
    port: 8080,
    root: 'app/'
  })
})

gulp.task('server:reload', () => {
  return gulp.src('app/{index.html,scripts/*.js}')
    .pipe(changed('app/{index.html,scripts/*.js}'))
    .pipe(connect.reload())
})

gulp.task('deploy', function () {
  const remoteUrl = 'git@github.com:Ahimta/fuel-consumption-calculator.git'
  return gulp.src('./dist/**/*')
    .pipe(ghPages({ remoteUrl }))
})

gulp.task('reload', (callback) => {
  return runSequence('jade', 'server:reload', callback)
})

gulp.task('watch', ['server:connect'], () => {
  return gulp.watch(['app/{index.html,jade_views/*.jade,scripts/*.js}'], ['reload'])
})

gulp.task('clean', () => {
  return del('dist/')
})

gulp.task('dist', (callback) => {
  return runSequence('clean', 'jade', ['copy', 'usemin'], 'sw-precache', callback)
})

gulp.task('sw-precache', callback => {
  writeServiceWorkerFile('dist', true, callback)
})

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  const config = {
    cacheId: packageJson.name,
    handleFetch,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /vendor\/bootstrap\/fonts\//,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      `${rootDir}/index.html`,
      `${rootDir}/*.js`,
      `${rootDir}/images/*.png`,
      `${rootDir}/vendor/bootstrap/css/bootstrap.min.css`,
      `${rootDir}/vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2`,
      `${rootDir}/vendor/bootstrap/js/bootstrap.min.js`,
      `${rootDir}/views/*.html`,
    ],
    stripPrefix: `${rootDir}/`,
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  }

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback)
}
