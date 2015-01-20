// Generated on 2015-01-20 using generator-bookmarklet 1.1.0
'use strict';

var buffer = require('buffer');
var del = require('del');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpUglify = require('gulp-uglify');
var jshintStylish = require('jshint-stylish');
var map = require('map-stream');
var fs = require('fs');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var escape = require('escape-html');

gulp.task('scripts', ['jam-into-js'], function() {
  return gulp.src('app/{,*/}*.js')
		.pipe(replace('{{styles}}',  fs.readFileSync('dist/styles.css', "utf8")))
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(gulpUglify())
    .pipe(gulpConcat('bookmarklet.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('jam-into-js', ['clean'], function() {
	return gulp.src('app/styles.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist'));
});

gulp.task('jam-into-html', ['scripts'], function () {
	var source = escape(fs.readFileSync('dist/bookmarklet.js', "utf8"));
	return gulp.src('app/index.html')
		.pipe(replace('{{source-here}}', source))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
	del('dist', cb);
});

gulp.task('default', ['clean', 'scripts', 'jam-into-html']);

gulp.task('watch', function() {
  gulp.watch('app/{,*/}*.js', ['scripts', 'jam-into-html']);
});
