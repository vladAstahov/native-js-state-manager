import favicons from "favicons";
import fs from "fs";

const FAVICON_PATH = './dist/public/favicon.png'
const DEST_PATH = './dist/public/favicon'
const HTML_FILE = './dist/index.html'

const CONFIG = {
    icons: {
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
    },
}

export async function generateFavicon(done) {
    const indexHtmlContent = fs.readFileSync(HTML_FILE)
    const { images, html } = await favicons(FAVICON_PATH, CONFIG)

    await fs.mkdir(DEST_PATH, () => {
        for (let i = 0; i < images.length; i++) {
            const favicon = images[i]
            fs.writeFileSync(`${DEST_PATH}/${favicon.name}`, favicon.contents)
        }
    })

    const htmlString = html.reduce(
        (prev, curr) =>
            prev +
            curr.replace(`href="/`, `href="/public/favicon/`),
        ''
    )

    const withFavicons = indexHtmlContent.toString().replace(/<!-- favicon-->/g, htmlString)
    fs.writeFileSync(HTML_FILE, withFavicons)

    fs.rmSync(FAVICON_PATH)
    done()
}