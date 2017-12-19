// loads various gulp modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
//var autoprefixer = require('gulp-autoprefixer');
//var rename = require('gulp-rename');

var main_css = [
            './css/uncompressed/normalize.css',
            './css/uncompressed/styles.css',
            './css/uncompressed/index.css',
            './css/shake.min.css',
            './css/uncompressed/paminta.css',
        ];
var split_css = [
            './css/uncompressed/normalize.css',
            './css/uncompressed/styles-b.css',
            './css/uncompressed/split-b.css',
            './css/shake.min.css',
            './css/uncompressed/paminta.css',
        ];

gulp.task('build-css', function(){
    gulp.src(main_css)
        .pipe(minifyCSS())
        .pipe(concat('combined-styles.min.css'))
        .pipe(gulp.dest('./css'));
});
gulp.task('build-css-split', function(){
    gulp.src(split_css)
        .pipe(minifyCSS())
        .pipe(concat('combined-styles-b.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch',function(){
    gulp.watch(main_css,['build-css']);
    gulp.watch(split_css,['build-css-split']);
});

gulp.task('default',['build-css']);