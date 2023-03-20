import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Application } from 'express'

import { createContext } from './app/context'
import { appRouter } from './app/router'

const app: Application = express()

app.use(cors({ origin: true }))

app.use(
  '/v1/api',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.listen(process.env.PORT)
