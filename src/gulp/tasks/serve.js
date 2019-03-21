'use strict';

var gulp = require('gulp');
var history = require('connect-history-api-fallback');
//var browserSync = require('browser-sync');
//var reload = browserSync.reload;
gulp.task( 'default', [ 'serve' ] )
gulp.task('serve', ['sass', 'lint', 'js'], function() {
	
	/* browserSync({
		proxy: 'http://if.local/'
	}); */
	
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js', 'lint']);
	//gulp.watch(['*.html', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);

});