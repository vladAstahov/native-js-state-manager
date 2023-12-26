import fs, { promises as fsPromises } from 'fs'
import ncp from 'ncp'

import { optimizeNotSvg } from './optimizeNotSvg.js'
import { optimizeSVG } from './optimizeSVG.js'

const src = './src/assets/images/'
const dest = './dist/images/'

const walkSync = async function (dir) {
    const files = await fsPromises.readdir(dir)

    await Promise.all(files.map(async file => {
        const ext = (`${dir}/${file}`)
            .substring(
                (`${dir}/${file}`)
                    .lastIndexOf('.') + 1, (`${dir}/${file}`)
                    .length
            )

        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            await walkSync(`${dir}/${file}`)
        }
        else if (ext === 'png' || ext === 'jpg') {
            await optimizeNotSvg(dir, file)
        }
        else if (ext === 'svg') {
            await optimizeSVG(`${dir}/${file}`)
        }
    }))
}

export const buildImages = async function (done) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest)
    }

    fsPromises.rmdir(dest, { recursive: true })
        .then(() => fsPromises.mkdir(dest))
        .then(() => {
            console.log('images folder created')
            ncp(src, dest, () => {
                walkSync(dest.substring(0, dest.length - 1)).then()
            })
        }).then(done)
}
