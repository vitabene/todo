var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return sass('styles/*.scss', { sourcemap: true })
    .on('error', sass.logError)
		.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('build/styles'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'watch', 'move']);

gulp.task('watch', function(){
	gulp.watch('styles/*.scss', ['sass']);
	gulp.watch('app/**/*.js').on('change', browserSync.reload);
});

gulp.task('move', function() {
	gulp.src('views/*')
	  .pipe(gulp.dest('build'));
	gulp.src('assets/*')
	  .pipe(gulp.dest('build/assets'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:3000"
    });
});
