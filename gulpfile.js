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

gulp.task('scripts', ['clean'], function() {
  return gulp.src('app/{,*/}*.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(gulpUglify())
    .pipe(gulpConcat('bookmarklet.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('jam-into-html', ['scripts', 'clean'], function () {
	var source = fs.readFileSync('dist/bookmarklet.js', "utf8");
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
