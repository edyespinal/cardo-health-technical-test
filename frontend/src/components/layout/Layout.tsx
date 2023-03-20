import { Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import { Navbar } from './Navbar'

const Layout = () => {
  return (
    <Container fluid p={0} className="h-screen">
      <Navbar />
      <Container size="lg" className="h-full">
        <Outlet />
      </Container>
      <div className="fixed bottom-2 w-screen text-center">
        <p className="text-neutral-400">made by edy espinal</p>
      </div>
    </Container>
  )
}

export { Layout }
