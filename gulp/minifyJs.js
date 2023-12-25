import gulp from "gulp";
import concat from "gulp-concat";
import gulpIf from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import uglify from "gulp-uglify";

export function minifyJs(isDev, sync) {
    const files = [
        'src/assets/js/initial.critical.js',
        'src/assets/js/scrollAnimation.js',
        'src/sections/Benefits/ui/SliderElement/*.js',
        'src/sections/Benefits/ui/SliderContent/*.js',
        'src/sections/Benefits/ui/Tab/*.js',
        'src/sections/Benefits/*.js',
        'src/sections/Footer/*.js',
        'src/sections/Promotion/*.js'
    ]

    return gulp
        .src(files)
        .pipe(concat('index.js'))
        .pipe(gulpIf(isDev, sourcemaps.init())) // Инициализация source map в dev-режиме
        .pipe(babel())
        .pipe(gulpIf(!isDev, uglify())) // Минификация в prod-режиме
        .pipe(gulpIf(isDev, sourcemaps.write())) // Запись source map в dev-режиме
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.stream()) // Обновление JavaScript без перезагрузки страницы
}

export function criticalJs() {
    return gulp
        .src([
            'src/assets/js/initial.critical.js',
        ])
        .pipe(concat('critical.js'))
        .pipe(babel())
        .pipe(uglify()) // Минификация в prod-режиме
        .pipe(gulp.dest('dist/js'))
}