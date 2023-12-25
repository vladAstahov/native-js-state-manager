import fs from "fs";
import gulp from "gulp";
import replace from "gulp-replace-task";

export function cssInHtml(isDev) {
    let patterns

    if (isDev) {
        patterns = [
            {
                match: /<!-- style.development-->/g,
                replace: `<link rel="preload" href="css/style.css" as="style" /><link rel="stylesheet" href="css/style.css" />`
            }
        ]
    } else {
        const criticalScss = fs.readFileSync("dist/css/style.critical.css")

        patterns = [
            {
                match: /<!-- style.critical-->/g,
                replace: `<style>${criticalScss}</style>`
            },
            {
                match: /..\/sprite.svg#/g,
                replace: 'sprite.svg#'
            },
            {
                match: /<!-- style.main-->/g,
                replace: `<link rel="preload" href="css/style.main.css" as="style" /><link rel="stylesheet" href="css/style.main.css" />`
            },
        ]
    }

    return gulp.src("dist/index.html")
        .pipe(replace({
            patterns,
        }))
        .pipe(gulp.dest('dist'))
}

export function jsInHtml() {
    const criticalJs = fs.readFileSync("dist/js/critical.js")

    return gulp.src("dist/index.html")
        .pipe(replace({
            patterns: [
                {
                    match: /<!-- critical.js-->/g,
                    replace: `<script>${criticalJs}</script>`
                },
            ]
        }))
        .pipe(gulp.dest('dist'))
}