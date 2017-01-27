'use strict'

let gulp = require('gulp'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    merge = require('merge-stream'),
    jade = require('gulp-jade'),
    swPrecache = require('sw-precache')

let runSequence = require('run-sequence')

gulp.task('jade', () =>
{
  gulp.src('app/jade_views/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./app/views/'))
})

gulp.task('usemin', () =>
{
  gulp.src('app/index.html')
    .pipe(usemin({
      html: [htmlmin({collapseWhitespace: true, removeComments: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy', () =>
{
  let html = gulp.src('app/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist/views'))

  let images = gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images/'))

  let vendor = gulp.src('app/vendor/**/*')
    .pipe(gulp.dest('dist/vendor/'))

  merge(html, images, vendor)
})

gulp.task('server:connect', () =>
{
  connect.server({
    livereload: true,
    fallback: 'app/index.html',
    host: 'localhost',
    port: 8080,
    root: 'app/'
  })
})

gulp.task('server:reload', () =>
{
  gulp.src('app/{index.html,scripts/*.js}')
    .pipe(changed('app/{index.html,scripts/*.js}'))
    .pipe(connect.reload())
})

gulp.task('deploy', function ()
{
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})

gulp.task('reload', (callback) =>
{
  runSequence('jade', 'server:reload', callback)
})

gulp.task('watch', ['server:connect'], () =>
{
  gulp.watch(['app/{index.html,jade_views/*.jade,scripts/*.js}'], ['reload'])
})

gulp.task('dist', (callback) =>
{
  runSequence('jade', ['copy', 'usemin'], ['sw-precache'], callback)
})

gulp.task('sw-precache', callback => {
  writeServiceWorkerFile('./dist', true, callback)
})

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  const config = {
    cacheId: packageJson.name,
    handleFetch,
    staticFileGlobs: [
      `${rootDir}/*.css`,
      `${rootDir}/*.html`,
      `${rootDir}/*.js`,
      `${rootDir}/images/*.png`,
      `${rootDir}/vendor/*.js`,
      `${rootDir}/vendor/bootstrap/css/bootstrap.min.css`,
      `${rootDir}/vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2`,
      `${rootDir}/vendor/bootstrap/js/bootstrap.min.js`
    ],
    stripPrefix: `${rootDir}/`,
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  }

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback)
}
