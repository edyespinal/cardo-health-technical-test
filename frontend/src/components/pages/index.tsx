import { trpc } from '../../utils/trpc'

function IndexPage() {
  const { isLoading, data } = trpc.getAllBooks.useQuery({})

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul>
        {data.map((book) => {
          return <li>{book.title}</li>
        })}
      </ul>
    </div>
  )
}

export { IndexPage }
