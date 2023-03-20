import { redirect } from 'react-router-dom'

import { signedInUser } from '../session'

/**
 * PageLoader - check if user is authenticated
 * @returns User session information
 */
export const isSignedInLoader = () => {
  const user = signedInUser()

  if (!user) {
    throw redirect('/auth/signup')
  }

  return user
}
