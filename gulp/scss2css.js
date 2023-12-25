import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import shorthand from "gulp-shorthand";
import cleanCSS from "gulp-clean-css";

export function scss2css(isDev, sync) {
    if (isDev) {
        return gulp
            .src('src/assets/scss/style.scss')
            .pipe(sourcemaps.init()) // Инициализация source map в dev-режиме
            .pipe(gulpSass(sass).sync())
            .pipe(sourcemaps.write()) // Запись source map в dev-режиме
            .pipe(gulp.dest('dist/css'))
            .pipe(sync.stream()) // Обновление стилей без перезагрузки страницы
    }

    return gulp
        .src(['src/assets/scss/style.main.scss', 'src/assets/scss/style.critical.scss'])
        .pipe(gulpSass(sass).sync())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, details => {
            console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        }))
        .pipe(gulp.dest('dist/css'))
}