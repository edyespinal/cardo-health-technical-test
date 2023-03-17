import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from './components/layout/Layout'
import { SessionProvider } from './context/session'
import { SignUp } from './pages/auth/SignUp'
import { MyBooks } from './pages/books/MyBooks'
import { Index } from './pages/Index'
import { isSignedIn } from './services/session'
import { trpc } from './utils/trpc'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/v1/api',
        }),
      ],
    })
  )

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={<Index />}
            loader={() => {
              const user = isSignedIn()

              if (!user) {
                throw redirect('/auth/signup')
              }

              return user
            }}
          />
        </Route>
        <Route path="auth">
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="books">
          <Route path="" element={<MyBooks />} />
        </Route>
      </>
    )
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
