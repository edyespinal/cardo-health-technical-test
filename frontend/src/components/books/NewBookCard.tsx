import { Center } from '@mantine/core'
import { Link } from 'react-router-dom'

import { PlusIcon } from '../icons/PlusIcon'

const NewBookCard = () => {
  return (
    <div className="w-52 border-4 border-violet-400 shadow-lg rounded-md hover:bg-violet-50">
      <Link to="/books/new">
        <Center className="h-full flex flex-col p-4">
          <div className="mb-4 w-1/2 bg-white rounded-full">
            <PlusIcon />
          </div>
          Add new book
        </Center>
      </Link>
    </div>
  )
}

export { NewBookCard }
