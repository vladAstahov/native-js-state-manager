import fs from "fs";

export function clean(done) {
    fs.rmSync('./dist', { recursive: true, force: true })
    done()
}