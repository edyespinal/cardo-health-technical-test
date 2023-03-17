import { Container, Text, Title } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'

import { User } from '../../../backend/src/user/types'

const Index = () => {
  const user = useLoaderData() as Omit<User, 'password'>

  return (
    <Container size="lg">
      <Title order={2}>Hi, {user?.firstName} 👋🏼</Title>
      <Text>Welcome to CardoBooks</Text>
    </Container>
  )
}

export { Index }
