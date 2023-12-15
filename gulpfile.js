import gulp from 'gulp'
import { pug2html } from './gulp/pug2html.js'
import { scss2css } from './gulp/scss2css.js'
import { ts2js } from './gulp/ts2js.js'
import { minifyImages } from './gulp/minifyImages.js'

export const pug = gulp.series(pug2html)
export const scss = gulp.series(scss2css)
export const ts = gulp.series(ts2js)
export const img = gulp.series(minifyImages)