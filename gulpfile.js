'use strict'

let gulp = require('gulp'),
    favicons = require('gulp-favicons'),
    manifest = require('gulp-manifest'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    merge = require('merge-stream'),
    jade = require('gulp-jade')

let runSequence = require('run-sequence')

gulp.task('jade', () =>
{
  gulp.src('app/jade_views/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./app/views/'))
})

gulp.task('favicons', () =>
{
    gulp.src('app/images/favicon.png')
      .pipe(favicons({
        appName: 'Fuel Consumption Calculator',
        appDescription: 'Fuel consumption calculator, currently only for Saudia Arabia',
        developerName: 'Abdullah Alansari',
        developerURL: 'https://github.com/Ahimta',
        path: 'favicons/',
        url: 'https://ahimta.github.io/fuel-consumption-calculator',
        display: 'standalone',
        orientation: 'portrait',
        version: '0.0.1-alpha',
        logging: false,
        online: false,
        html: 'dist/index.html',
        replace: true
      }))
      .pipe(gulp.dest('dist/favicons'))
})

gulp.task('manifest', () =>
{
  gulp.src(['dist/index.html', 'dist/scripts.html', 'dist/views/*.html'])
    .pipe(manifest({
      preferOnline: false,
      filename: 'app.manifest',
      exclude: 'app.manifest',
      cache: [
        'index.html',
        'scripts.js',
        'views/comparison.html',
        'views/cost-and-distance.html',
        'views/tank.html',
        'views/water-comparison.html',
        'views/water-cost-and-volume.html',
        'views/electricity-consumption-and-cost.html',
        'favicons/favicon.ico',
        'vendor/bootstrap/css/bootstrap.min.css',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.min.js',
        'vendor/bootstrap/js/bootstrap.min.js',
        'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
        'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2'
      ],
      hash: true
     }))
    .pipe(gulp.dest('dist/'))
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

  let bootstrap = gulp.src('app/vendor/bootstrap/**/*')
    .pipe(gulp.dest('dist/vendor/bootstrap/'))

  merge(html, bootstrap)
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
  gulp.src('app/{index.html,views/*.html,scripts/*.js}')
    .pipe(changed('app/{index.html,views/*.html,scripts/*.js}'))
    .pipe(connect.reload())
})

// gulp.task('deploy', function ()
// {
//   let remoteUrl = 'https://github.com/Ahimta/fuel-consumption-calculator.git'
//   return gulp.src('./dist/**/*')
//     .pipe(ghPages())
// })

gulp.task('reload', (callback) =>
{
  runSequence('jade', 'server:reload', callback)
})

gulp.task('watch', ['server:connect'], () =>
{
  gulp.watch(['app/{index.html,views/*.html,jade_views/*.jade,scripts/*.js}'], ['reload'])
})

gulp.task('dist', (callback) =>
{
  runSequence('jade', ['copy', 'usemin'], ['favicons', 'manifest'], callback)
})
