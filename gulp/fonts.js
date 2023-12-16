import gulp from "gulp";

export function fonts() {
    return gulp.src('src/app/assets/fonts')
        .pipe(gulp.dest('public/fonts'))
}