import { createContext, ReactNode, useEffect, useState } from 'react'

import { Session } from '../definitions/session'

const initialContext: Session = {
  user: undefined,
  loading: true,
}

export const SessionContext = createContext<Session>(initialContext)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState(initialContext)

  useEffect(() => {
    function checkSession() {
      const foundSession = localStorage.getItem('session')

      if (!foundSession) {
        return
      }

      const { user } = JSON.parse(foundSession) as Session

      if (!user) {
        return
      }

      setSession({
        user,
        loading: false,
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
