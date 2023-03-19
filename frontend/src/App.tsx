import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from './components/layout/Layout'
import { SessionProvider } from './context/session'
import { SignUp } from './pages/auth/SignUp'
import { BookDetails } from './pages/books/BookDetails'
import { NewBook } from './pages/books/NewBook'
import { Index } from './pages/Index'
import { isSignedInLoader } from './utils/pageLoaders/signedInLoader'
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
      <Route>
        <Route path="/" loader={isSignedInLoader} element={<Layout />}>
          <Route path="" element={<Index />} />
        </Route>
        <Route path="auth">
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="books" loader={isSignedInLoader} element={<Layout />}>
          <Route path="new" element={<NewBook />} />
          <Route path=":id" element={<BookDetails />} />
        </Route>
      </Route>
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
