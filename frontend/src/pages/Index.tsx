import { Container, Text, Title } from '@mantine/core'

import { useSession } from '../hooks/useSession'

const Index = () => {
  const { user } = useSession()

  return (
    <Container size="lg">
      <Title order={2}>Hi, {user?.firstName} 👋🏼</Title>
      <Text>Welcome to CardoBooks</Text>
    </Container>
  )
}

export { Index }
