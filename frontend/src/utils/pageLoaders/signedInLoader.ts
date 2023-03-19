import { redirect } from 'react-router-dom'

import { isSignedIn } from '../../services/session'
import { trpc } from '../trpc'

export const isSignedInLoader = () => {
  const user = isSignedIn()

  if (!user) {
    throw redirect('/auth/signup')
  }

  return user
}

export const getBook = async (id: string) => {
  const { data: book } = trpc.getBook.useQuery(id)

  return book
}
