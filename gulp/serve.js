import gulp from 'gulp'
import { pug2html } from './pug2html'
import { scss2css } from './scss2css'
import { ts2js } from './ts2js'
import { minifyImages } from './minifyImages'
const server = require('browser-sync').create()

function readyReload(cb) {
    server.reload()
    cb()
}

module.exports = function serve(cb) {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('src/app/assets/images/**/*.{gif,png,jpg,svg,webp}', gulp.series(minifyImages, readyReload))
    gulp.watch(['src/app/assets/styles/**/*.scss', 'src/shared/**/*.scss'], gulp.series(scss2css, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
    gulp.watch(['src/app/scripts/*.ts', 'src/shared/**/*.ts'], gulp.series(ts2js, readyReload))
    gulp.watch(['src/app/index.pug', 'src/shared/**/*.ts'], gulp.series(pug2html, readyReload))

    return cb()
}