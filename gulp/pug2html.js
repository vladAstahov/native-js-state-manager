import gulp from "gulp";
import pug from "gulp-pug";
import pugBem from "gulp-pugbem";
import rename from "gulp-rename";

export function pug2html(sync) {
    return gulp
        .src('src/*.page.pug')
        .pipe(pug({
            plugins: [pugBem]
        }))
        .pipe(rename({ extname: '.html', basename: 'index' }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream()) // Обновление HTML без перезагрузки страницы
}