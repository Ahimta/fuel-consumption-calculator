'use strict'

let gulp = require('gulp'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
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

gulp.task('server:connect', function() {
  connect.server({
    livereload: true,
    fallback: 'index.html',
    host: 'localhost',
    port: 8080
  })
})

gulp.task('server:reload', function() {
  return gulp.src('index.{html,js}')
    .pipe(changed('index.{html,js}'))
    .pipe(connect.reload())
})

gulp.task('watch', ['server:connect'], function() {
  gulp.watch(['index.{html,js}'], ['server:reload']);
});

gulp.task('build', ['build:js', 'build:html'])
