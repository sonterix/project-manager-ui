import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_CLIENTS } from 'queries/client'
import { REMOVE_CLIENT } from 'mutatuins/client'
import { AddUser, Edit, Trash } from 'icons'
import { ConfirmModal, Error, Loading } from 'components'

const Clients = () => {
  const { loading, data, error } = useQuery(GET_CLIENTS)
  const [removeClient] = useMutation(REMOVE_CLIENT)

  const [removingClientId, setRemovingClientId] = useState('')

  const handleOpenModal = id => () => {
    setRemovingClientId(id)
  }

  const handleCloseModal = () => {
    setRemovingClientId('')
  }

  const handleRemoveClient = () => {
    removeClient({
      variables: { id: removingClientId },
      update: (caches, { data: { deleteClient } }) => {
        const { clients } = caches.readQuery({ query: GET_CLIENTS })
        caches.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter(({ _id }) => _id !== deleteClient._id)
          }
        })
      }
    })
    setRemovingClientId('')
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <ConfirmModal
        isActive={!!removingClientId}
        title='Are you sure?'
        onConfirm={handleRemoveClient}
        onCancel={handleCloseModal}
      />

      <section>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-3xl font-bold'>Clients</h1>

          <button type='button' className='p-2 bg-emerald-600 hover:bg-emerald-700 rounded-md transition'>
            <AddUser className='w-5 h-5' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='table-auto w-full text-md text-left'>
            <thead className='uppercase'>
              <tr>
                {['ID', 'Name', 'Email', 'Phone', '', ''].map((row, index) => (
                  <th key={index} className='p-3 bg-gray-900'>
                    {row}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={loading ? 'animate-pulse' : ''}>
              {loading
                ? [...Array(5)].map((_, index) => (
                    <tr key={index} className='border-t border-gray-700'>
                      {[...Array(6)].map((_, idx) => (
                        <td key={idx} className='px-3 py-2 bg-gray-800'>
                          &nbsp;
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.clients.map(({ _id, name, email, phone }) => (
                    <tr key={_id} className='border-t border-gray-700'>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{_id}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{name}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{email}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{phone || '-'}</td>
                      <td className='px-3 py-2 bg-gray-800'>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-sky-600 hover:bg-sky-700 rounded-sm transition'
                        >
                          <Edit className='w-4 h4' />
                        </button>
                      </td>
                      <td className='px-3 py-2 bg-gray-800'>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-rose-600 hover:bg-rose-700 rounded-sm transition'
                          onClick={handleOpenModal(_id)}
                        >
                          <Trash className='w-4 h4' />
                        </button>
                      </td>
                    </tr>
                  )) || null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Clients
