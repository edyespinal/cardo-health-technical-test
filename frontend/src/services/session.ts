import { Session } from '../definitions/session'

export function isSignedIn() {
  const session = localStorage.getItem('session')

  if (!session) {
    return false
  }

  const { user } = JSON.parse(session) as Session

  return user
}
