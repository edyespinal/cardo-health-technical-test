import { createContext, ReactNode, useEffect, useState } from 'react'

import { Session } from '../definitions/session'

export const SessionContext = createContext({} as Session)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState({} as Session)

  useEffect(() => {
    function checkSession() {
      const foundSession = localStorage.getItem('session')

      if (!foundSession) {
        return
      }

      const { user } = JSON.parse(foundSession) as Session

      setSession({
        user,
      })
    }

    checkSession()
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
