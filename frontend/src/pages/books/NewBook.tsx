import { Button, Container, Image, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

import { Book } from '../../../../backend/src/book/types'
import { UploadIcon } from '../../components/icons/Upload'
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

  const createBook = trpc.createBook.useMutation()
  const updateUser = trpc.updateUserBooks.useMutation()

  const handleSubmit = async (values: CreateBook) => {
    if (!user) {
      return
    }

    const { title, author, year, cover } = values
    const newBook = await createBook.mutateAsync({
      title,
      author,
      year,
      cover,
    })

    if (newBook) {
      const updated = await updateUser.mutateAsync({
        email: user.email as string,
        book: newBook,
      })

      if (updated) {
        window.location.href = '/'

        return
      }
    }

    setLoading(false)
  }

  return (
    <Container className="mt-24">
      <h1 className="mb-8">New Book</h1>

      <div className="flex gap-12">
        <div className="md:w-2/3 w-full">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="mb-4">
              <TextInput
                label="Title"
                required
                withAsterisk
                {...form.getInputProps('title')}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Author"
                required
                withAsterisk
                {...form.getInputProps('author')}
              />
            </div>
            <div className="mb-4">
              <NumberInput
                label="Year of publication"
                {...form.getInputProps('year')}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Book cover"
                icon={<UploadIcon />}
                {...form.getInputProps('cover')}
              />
            </div>
            <div className="mt-12">
              <Button type="submit" loading={loading}>
                Create
              </Button>
            </div>
          </form>
        </div>

        <div className="md:w-1/3 md:block hidden">
          <p className="mb-2 text-sm">Cover preview</p>
          <Image
            src={form.values.cover ?? import.meta.env.VITE_PLACEHOLDER_IMAGE}
          />
        </div>
      </div>
    </Container>
  )
}

export { NewBook }
