'use strict'

let gulp = require('gulp'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin')

gulp.task('usemin', () =>
{
  return gulp.src('app/index.html')
    .pipe(usemin({
      html: [htmlmin({collapseWhitespace: true, removeComments: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build:views', () =>
{
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest('dist/views'))
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
