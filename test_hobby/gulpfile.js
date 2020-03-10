var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
 var twig = require('gulp-twig');

var config = {
    path: {
        scss: './src/scss/**/*.scss',
        html: './dist/twig_template.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './dist'
    }
};

gulp.task('scss', function() {
    return gulp.src(config.path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream())
});
gulp.task('templates', function() {
    return gulp.src('./public/*.html') // run the Twig template parser on all .html files in the "src" directory
        .pipe(twig())
        .pipe(gulp.dest('./dist')); // output the rendered HTML files to the "dist" directory
});
 
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.path.scss, ['scss']);
    gulp.watch(config.path.html).on('change', browserSync.reload);

});

gulp.task('default', ['scss', 'serve', 'templates']);
