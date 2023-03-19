import { Session } from '../definitions/session'

export function isSignedIn() {
  const session = localStorage.getItem('session')

  if (!session) {
    return false
  }

  const { user } = JSON.parse(session) as Session

  return user
}

export function createUserSession(user: Session['user']) {
  const { email, firstName, lastName } = user

  localStorage.setItem(
    'session',
    JSON.stringify({
      user: { email, firstName, lastName },
      loading: false,
    })
  )
}

export function logOut() {
  localStorage.removeItem('session')
}
