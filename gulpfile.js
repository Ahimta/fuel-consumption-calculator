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
    usemin = require('gulp-usemin')

let runSequence = require('run-sequence')

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
        'views/cost.html',
        'views/distance.html',
        'views/tank-volume.html',
        'favicons/favicon.ico',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
        'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
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
  gulp.src('app/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist/views'))
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

gulp.task('watch', ['server:connect'], () =>
{
  gulp.watch(['app/{index.html,views/*.html,scripts/*.js}'], ['server:reload'])
})

gulp.task('dist', (callback) =>
{
  runSequence(['copy', 'usemin'], ['favicons', 'manifest'], callback)
})
