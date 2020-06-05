import express from 'express'
import serverRenderer from './renderer'

const PORT = 3000

const app = express()

app.use(express.static('build', {index: false}))

app.get('*', serverRenderer)

app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`))