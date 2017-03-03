// loads various gulp modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
//var autoprefixer = require('gulp-autoprefixer');
//var rename = require('gulp-rename');

gulp.task('build-css', function(){
    gulp.src([
            './css/uncompressed/normalize.css',
            './css/uncompressed/styles.css',
            './css/uncompressed/index.css',
            './css/shake.min.css',
            './css/uncompressed/paminta.css',
        ])
        .pipe(minifyCSS())
        .pipe(concat('combined-styles.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch',function(){
    gulp.watch('./css/uncompressed/*.css',['build-css']);
});

gulp.task('default',['build-css']);