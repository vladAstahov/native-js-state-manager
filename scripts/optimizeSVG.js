import fs from "fs"
import SVGO from "svgo"

/**
 * @description Функция для оптимизации svg изображения
 * @param {string} filePath - путь до svg-изображения
 * */
export async function optimizeSVG(filePath) {
    const svgContent = fs.readFileSync(filePath)

    const result = await SVGO.optimize(svgContent.toString(), {
        multipass: true,
        js2svg: {
            indent: 0,
            pretty: true,
            finalNewline: false,
        },
        plugins: [
            'preset-default',
            'prefixIds',
            {
                name: 'sortAttrs',
                params: {
                    xmlnsOrder: 'alphabetical',
                },
            },
        ]
    })
    const optimizedSvg = result.data.replace(/\n/g, '')
    fs.writeFileSync(filePath, optimizedSvg, { flag: 'w' })
}