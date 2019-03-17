const gulp = require("gulp");
const less = require('gulp-less');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const del = require("del");
//const begin = require('./index');

gulp.task('styles', function() {
	return gulp.src('less/**/*.less')
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(rename({
	  		basename: 'main',
	  		suffix: '.min'
		}))
		.pipe(gulp.dest('public/stylesheets/'));
})

gulp.task('cleanJS', function(){
	del('public/js/*.js');
})

gulp.task('js', function(){
	return gulp.src('fr_js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('public/js/'))
});

gulp.task('watch', function() {
	gulp.watch('less/*.less', gulp.series('styles'));
	gulp.watch('fr_js/**/*.js',gulp.series('js'));
});

// gulp.task('default', ['styles','js']);
gulp.task('default', gulp.parallel('styles', 'js', 'watch'));
