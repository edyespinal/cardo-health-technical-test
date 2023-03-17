import { User } from '../../../backend/src/user/types'
import { Session } from '../definitions/session'

export function isSignedIn() {
  const session = localStorage.getItem('session')

  if (!session) {
    return false
  }

  const { user } = JSON.parse(session) as Session

  return user
}

export function createUserSession(user: Omit<User, 'password'>) {
  const { email, firstName, lastName, books = [] } = user

  localStorage.setItem(
    'session',
    JSON.stringify({
      user: { email, firstName, lastName, books },
      loading: false,
    })
  )
}

export function logOut() {
  localStorage.removeItem('session')
}
