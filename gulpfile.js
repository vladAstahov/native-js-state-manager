import gulp from 'gulp'
import browserSync from 'browser-sync'
import { scss2css } from "./gulp/scss2css.js";
import { pug2html } from "./gulp/pug2html.js";
import { optimizeImages } from "./gulp/optimizeImages.js";
import { minifyJs } from "./gulp/minifyJs.js";
import { cssInHtml } from "./gulp/cssInHtml.js";
import { sprites } from "./gulp/sprites.js";
import { fonts } from "./gulp/fonts.js";
import { clean } from "./gulp/clean.js";
import { public2dist } from "./gulp/public2dist.js";
import { generateFavicon } from './gulp/generateFavicon.js'
import gulpIf from "gulp-if";

const isDev = process.env.NODE_ENV === 'dev' // Проверяем текущий режим сборки
const sync = browserSync.create()

const pugTask = cb => pug2html(sync, cb)
const scssTask = cb => scss2css(isDev, sync, cb)
const jsTask = cb => minifyJs(isDev, sync, cb)
const cssTask = cb => cssInHtml(isDev, cb)

// Задача для слежения за изменениями в файлах SCSS, Pug и JavaScript
gulp.task('watch', () => {
    sync.init({
        server: {
            baseDir: './dist',
        },
    })

    gulp.watch('src/**/*.scss', gulp.series(scssTask)).on('change', sync.reload)
    gulp.watch('src/**/*.pug', gulp.series(pugTask, cssTask)).on('change', sync.reload)
    gulp.watch('src/**/*.js', gulp.series(jsTask)).on('change', sync.reload)
    gulp.watch('src/images/**/*.{gif,png,jpg,svg,webp}', gulp.series(optimizeImages)).on('change', sync.reload)
})

// Задача по умолчанию
gulp.task(
    'default',
    gulp.series(pugTask, scssTask, cssTask, jsTask, optimizeImages, sprites, fonts)
)

gulp.task('dev', gulp.series('default', 'watch'))
gulp.task('prod', gulp.series(clean, 'default', public2dist, generateFavicon))
gulp.task('images', gulp.series(optimizeImages))
gulp.task('favicon', gulp.series(generateFavicon))
gulp.task('js', gulp.series(jsTask))
