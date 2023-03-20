import { Center, Loader, Text } from '@mantine/core'

type Props = {
  type?: 'loading' | 'error'
  message?: string
}

const EmptyState = ({ type = 'loading', message }: Props) => {
  return (
    <Center className="bg-neutral-100 rounded">
      <div className="p-12 text-center">
        {type === 'loading' ? (
          <Loader size="lg" />
        ) : (
          <>
            <h1 className="mb-4 text-brand">Sorry :(</h1>
            <Text>{message ?? 'Something went wrong'}</Text>
          </>
        )}
      </div>
    </Center>
  )
}

export { EmptyState }
