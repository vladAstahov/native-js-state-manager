import {buildImages} from "../scripts/webpConverter.js";

export async function optimizeImages(done) {
    await buildImages(done)
}