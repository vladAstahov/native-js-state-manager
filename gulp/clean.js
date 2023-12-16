import { deleteAsync } from 'del'

export function clean(cb) {
    return deleteAsync('build').then(() => {
        cb()
    })
}