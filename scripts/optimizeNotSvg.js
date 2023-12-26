import sharp from "sharp";
import fs, {promises as fsPromises} from "fs";
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

/**
 * @description Функция для оптимизации не SVG-изображения
 * @param {string} dir - папка файла
 * @param {string} file - имя изображения
 * */
export async function optimizeNotSvg(dir, file) {
    const filename = (`${dir}/${file}`).replace(/^.*[\\\/]/, '')
    const matches = filename.match(/\[(.*?)\]/)

    if (matches) {
        /**
         * @type {number[]}
         * */
        let widths = []
        if (matches) {
            widths = matches[1].split('|').reduce((prev, curr) => [...prev, Number(curr)], [])
        }

        Promise.all(widths.map(async (width, device) => {
            let webpFile
            let classicFile

            if (widths.length > 1) {
                webpFile = `${dir}/${toDeviceSizeName(`${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`, device)}`
                classicFile = `${dir}/${toDeviceSizeName(removeBrackets(file), device)}`
            } else {
                webpFile = `${dir}/${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`
                classicFile = `${dir}/${removeBrackets(file)}`
            }

            await sharp(`${dir}/${file}`)
                .resize({width})
                .webp({quality: 80})
                .toFile(webpFile)

            const buffer = await sharp(`${dir}/${file}`)
                .resize({width})
                .toBuffer()
            await fsPromises.access(`${dir}/${file}`, fs.constants.F_OK)
            await fsPromises.copyFile(`${dir}/${file}`, classicFile)
            await fs.writeFileSync(classicFile, buffer)

            await imagemin([classicFile], {
                destination: `${dir}/`,
                plugins: [
                    imageminMozjpeg(),
                    imageminPngquant({
                        quality: [0.6, 0.8]
                    })
                ]
            })
        })).then(() => {
            fs.rmSync(`${dir}/${file}`)
        })
    } else {
        const webpFile = `${dir}/${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`
        const classicFile = `${dir}/${removeBrackets(file)}`

        await sharp(`${dir}/${file}`)
            .webp({ quality: 80 })
            .toFile(webpFile)

        const buffer = await sharp(`${dir}/${file}`)
            .toBuffer()
        await fsPromises.access(`${dir}/${file}`, fs.constants.F_OK)
        await fsPromises.copyFile(`${dir}/${file}`, classicFile)
        await fs.writeFileSync(classicFile, buffer)

        await imagemin([classicFile], {
            destination: `${dir}/`,
            plugins: [
                imageminMozjpeg(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        })
    }
}

const removeBrackets = function (string) {
    const brackets = string.match(/\[(.*?)\]/)
    if (brackets) {
        return string.replace(brackets[0], '')
    }
    return string
}

/**
 * @param {string} name - file name
 * @param {0 | 1 | 2} size - device index. Desktop, tablet, mobile
 * */
const toDeviceSizeName = function (name, size) {
    const devices = {
        [0]: 'desktop',
        [1]: 'tablet',
        [2]: 'mobile'
    }
    const execDotIndex = name.lastIndexOf('.')
    const fileName = name.slice(0, execDotIndex)
    const exec = name.slice(execDotIndex, name.length)

    return `${fileName}-${devices[size]}${exec}`
}