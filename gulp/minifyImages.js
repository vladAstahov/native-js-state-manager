import gulp from 'gulp'
import imagemin, { gifsicle, svgo, optipng, mozjpeg } from 'gulp-imagemin'

export function minifyImages() {
    return gulp.src('src/app/assets/images/**/*.{gif,png,jpg,svg,webp}')
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({
                quality: 75,
                progressive: true
            }),
            optipng({ optimizationLevel: 5 }),
            svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('public/images'))
}
