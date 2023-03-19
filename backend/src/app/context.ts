/* eslint-disable no-unused-vars */
import { inferAsyncReturnType } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({})

export type Conxtext = inferAsyncReturnType<typeof createContext>
