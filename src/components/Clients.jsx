import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_CLIENTS } from 'queries/client'
import { REMOVE_CLIENT } from 'mutatuins/client'
import Error from 'components/Error'
import ConfirmModal from 'components/ConfirmModal'

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
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
              <path d='M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z' />
            </svg>
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='table-auto w-full text-md text-left'>
            <thead className='uppercase'>
              <tr>
                <th className='p-3 bg-gray-900'>ID</th>
                <th className='p-3 bg-gray-900'>Name</th>
                <th className='p-3 bg-gray-900'>Email</th>
                <th className='p-3 bg-gray-900'>Phone</th>
                <th className='p-3 bg-gray-900'>&nbsp;</th>
                <th className='p-3 bg-gray-900'>&nbsp;</th>
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
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-4 h-4'
                          >
                            <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                            <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                          </svg>
                        </button>
                      </td>
                      <td className='px-3 py-2 bg-gray-800'>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-rose-600 hover:bg-rose-700 rounded-sm transition'
                          onClick={handleOpenModal(_id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-4 h-4'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                              clipRule='evenodd'
                            />
                          </svg>
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
