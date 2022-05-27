import chalk from 'chalk'
import express, { request, response } from 'express'

const app = express()
const log = console.log
const cyan = chalk.cyanBright

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Success!' })
})

app.listen(3000, () => log(cyan('Server is running on port 3000')))
