import gulp from "gulp";
import svgSprite from "gulp-svg-sprite";

export function sprites() {
    return gulp.src('src/assets/sprites/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('dist'))
}