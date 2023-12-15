import gulp from 'gulp'
import ts from 'gulp-typescript'
import plumber from "gulp-plumber"
import sourcemaps from "gulp-sourcemaps"
import babel from 'gulp-babel'

export function ts2js() {
    return gulp.src('./src/app/scripts/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES6',
            removeComments: true,
            moduleResolution: 'node'
        }))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/scripts'))
}