import { useForm } from '@mantine/form'
import { useState } from 'react'

import { Book } from '../../../../backend/src/book/book.schema'
import { NewBookPage } from '../../components/pages/books/NewBookPage'
import { useSession } from '../../hooks/useSession'
import { trpc } from '../../utils/trpc'

type CreateBook = Omit<Book, 'id'>

const NewBook = () => {
  const { user } = useSession()
  const [loading, setLoading] = useState(false)

  const form = useForm<CreateBook>({
    initialValues: {
      title: '',
      author: '',
      year: undefined,
      cover: undefined,
    },
  })

  const { mutateAsync: createBook } = trpc['create-book'].useMutation()
  const { mutateAsync: updateUser } = trpc['add-user-book'].useMutation()

  const handleSubmit = async (values: CreateBook) => {
    const { title, author, year, cover } = values
    const newBook = await createBook({
      title,
      author,
      year,
      cover,
    })

    if (newBook) {
      const updated = await updateUser({
        email: user.email,
        bookId: newBook.id,
      })

      if (updated) {
        window.location.href = '/'

        return
      }
    }

    setLoading(false)
  }

  return (
    <NewBookPage form={form} handleSubmit={handleSubmit} loading={loading} />
  )
}

export { NewBook }
