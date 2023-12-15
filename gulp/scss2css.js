import gulp from 'gulp'
import plumber from "gulp-plumber"
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import cleanCSS from 'gulp-clean-css'
import sourceMaps from 'gulp-sourcemaps'
import shorthand from 'gulp-shorthand'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)

export function scss2css(cb) {
    return gulp.src('src/app/assets/styles/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, details => {
            console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/css'))
}