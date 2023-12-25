import gulp from "gulp";

export function public2dist() {
    return gulp.src('public/**/*.png')
        .pipe(gulp.dest('dist/public'))
}