import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Application } from 'express'

import { createContext } from './app/context'
import { appRouter } from './app/router'

const app: Application = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
  })
)

app.use(
  '/v1/api',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.use('/', (_, res) => {
  res.send(`
    <h2>Cardo Health</h2>
    <p>Technical test backend</p>
    
    <a href="/v1/api/get-user-books?input=%22edy@espinal.com%22">
      <p>Get user books query</p>
    </a>
    <a href="/v1/api/get-user-books?input=%22invalidEmail%22">
      <p>Invalid email query</p>
    </a>
  `)
})

app.listen(process.env.PORT)
