import gulp from 'gulp'
import plumber from "gulp-plumber"
import pug from 'gulp-pug'
import htmlBemValidator from "gulp-html-bem-validator"

export function pug2html(cb) {
    return gulp.src('./src/app/index.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(htmlBemValidator())
        .pipe(gulp.dest('build'))
}