import { useForm } from '@mantine/form'
import { useParams } from 'react-router-dom'

import { Book } from '../../../../backend/src/book/book.schema'
import { BookDetailsPage } from '../../components/pages/books/BookDetailsPage'
import { trpc } from '../../utils/trpc'

const BookDetails = () => {
  const params = useParams()
  const form = useForm<Book>()
  const { mutateAsync: updateBook } = trpc['update-book'].useMutation()
  const { mutateAsync: deleteBook } = trpc['delete-book'].useMutation()

  trpc['get-book'].useQuery(params.id as string, {
    onSuccess(book) {
      form.setValues(book)
    },
  })

  const handleSubmit = async (values: Book) => {
    const updatedBook = await updateBook(values)

    if (updatedBook) {
      window.location.href = '/'
    }
  }

  const handleDelete = async () => {
    const isDeleted = await deleteBook(form.values.id)

    if (isDeleted) {
      window.location.href = '/'
    }
  }

  return (
    <BookDetailsPage
      form={form}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  )
}

export { BookDetails }
