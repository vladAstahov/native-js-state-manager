import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'express-compression'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(compression())
// Указываем, что статические файлы будут браться из директории 'dist'
app.use(express.static(path.join(__dirname, 'dist')))

// Если необходимо обработать все маршруты и отдать 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
