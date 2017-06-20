/* Needed gulp config */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

/* Scripts task */
gulp.task('scripts', function () {
    return  gulp.src(['public/js/main/*.js', 'public/js/modules/**/*.js'])
            .pipe(concat('allscripts.js'))
            .pipe(gulp.dest('public/dist/'))
            .pipe(browserSync.stream());
});

/* Sass task */
gulp.task('sass', function () {
    return  gulp.src('public/sass/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('public/dist/'))
            .pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('js-watch', ['scripts'], browserSync.reload);

gulp.task('serve', ['sass', 'scripts'], function () {

    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch("public/sass/*.scss", ['sass-watch']);
    gulp.watch("public/js/modules/**/*.js", ['js-watch']);
    gulp.watch("public/**/*.html").on("change", browserSync.reload);
});



gulp.task('default', ['serve']);