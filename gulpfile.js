var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
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