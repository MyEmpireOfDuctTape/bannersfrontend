'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var rename = require("gulp-rename");
//var browserSync = require('browser-sync');

gulp.task('sass', function() {
    gulp.src('assets/scss/style.scss')
        .pipe(less().on('error', gutil.log))    
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('build/'))
        //.pipe(browserSync.stream());
});