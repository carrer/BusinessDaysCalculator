var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('build', function() {

    gulp.src(['./src/BusinessDaysCalculator.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});