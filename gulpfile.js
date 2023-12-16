import gulp from 'gulp'
import { pug2html } from './gulp/pug2html.js'
import { scss2css } from './gulp/scss2css.js'
import { ts2js } from './gulp/ts2js.js'
import { minifyImages } from './gulp/minifyImages.js'
import { clean } from './gulp/clean.js'
import { fonts } from './gulp/fonts.js'
import { serve } from './gulp/serve.js'

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development'
        cb()
    }
}

const dev = gulp.parallel(pug2html, scss2css, ts2js, fonts, minifyImages)

const build = gulp.series(clean, dev)

export const development = gulp.series(setMode(), build, serve)
export const production = gulp.series(setMode(true), build)