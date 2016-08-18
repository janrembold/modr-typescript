var gulp = require('gulp');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');

gulp.task('default', ['typescript']);

gulp.task('typescript', function () {
    return gulp.src('src/js/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            // out: 'index.es5.js',
            // declaration: true,
            module: 'umd',
            target: 'ES5'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function() {
    connect.server();
});