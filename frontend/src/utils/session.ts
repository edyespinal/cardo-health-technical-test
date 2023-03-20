import { Session } from '../definitions/session'

/**
 * Check if user is signed in
 * @returns User session information
 */
export function signedInUser() {
  const session = localStorage.getItem('session')

  if (!session) {
    return null
  }

  const { user } = JSON.parse(session) as Session

  if (!user) {
    return null
  }

  return user
}

/**
 * Create session with user information using localStorage
 * @param user Session user information
 * @returns void
 */
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

/**
 * Remove user session information
 */
export function logOut() {
  localStorage.removeItem('session')
}
