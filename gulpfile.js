var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var minnifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var docs = {
    css: 'docs/color.less',
    js: 'docs/color.js'
}
var dist = {
    css: 'dist/',
    js: 'dist/'
}

gulp.task('css', function() {
    return gulp.src(docs.css)
        .pipe(less())
        .pipe(minnifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.css));
});


gulp.task('js', function() {
    return gulp.src(docs.js)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.js));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            // proxy:""
        },
        files: ['color/*', 'dist/*', 'docs/*']
    });
});



gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(docs.css, ['css']);
    gulp.watch(docs.js, ['js']);
});

gulp.task('default', function() {
    gulp.start('watch');
});