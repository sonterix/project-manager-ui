import { useMutation } from '@apollo/client'

import { GET_CLIENTS } from 'queries/client'
import { GET_PROJECTS } from 'queries/project'
import { REMOVE_CLIENT } from 'mutatuins/client'

const RemoveClient = ({ isActive, clientId, onClose }) => {
  const [removeClient] = useMutation(REMOVE_CLIENT)

  const handleRemoveClient = () => {
    removeClient({
      variables: { id: clientId },
      update: (cache, { data: { deleteClient } }) => {
        const { clients } = cache.readQuery({ query: GET_CLIENTS })
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter(({ _id }) => _id !== deleteClient._id)
          }
        })

        const { projects } = cache.readQuery({ query: GET_PROJECTS })
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: projects.filter(({ client }) => client._id !== deleteClient._id)
          }
        })
      }
    })

    onClose()
  }

  return isActive ? (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-30'>
        <div className='relative bg-gray-900 rounded-lg p-6 shadow-xl z-50'>
          <h2 className='text-2xl font-bold mb-5'>Are you sure?</h2>

          <div className='flex justify-end items-center space-x-3'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='button'
              className='px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-md'
              onClick={handleRemoveClient}
            >
              Confirm
            </button>
          </div>
        </div>

        <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={onClose} />
      </div>
    </>
  ) : null
}

export default RemoveClient
