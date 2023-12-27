import gulp from "gulp";
import gulpIf from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import webpack from 'webpack-stream'

export function minifyJs(isDev, sync) {
    return gulp
        .src('./src/assets/js/index.js')
        .pipe(gulpIf(isDev, sourcemaps.init())) // Инициализация source map в dev-режиме
        .pipe(webpack({
            entry: {
                app: './src/assets/js/index.js'
            },
        }))
        .pipe(babel())
        .pipe(gulpIf(!isDev, uglify())) // Минификация в prod-режиме
        .pipe(gulpIf(isDev, sourcemaps.write())) // Запись source map в dev-режиме
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.stream()) // Обновление JavaScript без перезагрузки страницы
}