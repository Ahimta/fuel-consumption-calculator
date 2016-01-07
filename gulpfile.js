'use strict'

let gulp = require('gulp'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify')

gulp.task('build:js', () =>
{
  return gulp.src('index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:html', () =>
{
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('server:connect', function ()
{
  connect.server({
    livereload: true,
    fallback: 'app/index.html',
    host: 'localhost',
    port: 8080,
    root: 'app/'
  })
})

gulp.task('server:reload', function ()
{
  return gulp.src('app/{index.html,views/*.html,scripts/*.js}')
    .pipe(changed('app/{index.html,views/*.html,scripts/*.js}'))
    .pipe(connect.reload())
})

// gulp.task('deploy', function ()
// {
//   let remoteUrl = 'https://github.com/Ahimta/fuel-consumption-calculator.git'
//   return gulp.src('./dist/**/*')
//     .pipe(ghPages())
// })

gulp.task('watch', ['server:connect'], function()
{
  gulp.watch(['app/{index.html,views/*.html,scripts/*.js}'], ['server:reload'])
})

gulp.task('build', ['build:js', 'build:html'])
