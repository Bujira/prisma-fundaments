import chalk from 'chalk'
import express, { NextFunction, Request, request, Response, response } from 'express'
import "express-async-errors";
import { AppError } from './errors/AppError'
import { routes } from './routes'

const app = express()

const log = console.log
const cyan = chalk.cyanBright

app.use(express.json())
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3000, () => log(cyan('Server is running on port 3000')))
