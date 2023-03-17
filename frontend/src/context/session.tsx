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
        setSession({
          ...session,
          loading: false,
        })

        return
      }

      const parsedSession = JSON.parse(foundSession) as Session

      setSession({
        user: parsedSession.user,
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
