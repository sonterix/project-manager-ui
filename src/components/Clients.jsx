import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_CLIENTS } from 'queries/client'
import { ADD_CLIENT, REMOVE_CLIENT } from 'mutatuins/client'
import { AddUser, Edit, Trash } from 'icons'
import { AddClientModal, ConfirmModal, Error } from 'components'

const Clients = () => {
  const { loading, data, error } = useQuery(GET_CLIENTS)
  const [addClient] = useMutation(ADD_CLIENT)
  const [removeClient] = useMutation(REMOVE_CLIENT)

  const [isCreateModal, setCreateModal] = useState(false)
  // Client id as a value
  const [removeModal, setRemoveModal] = useState('')

  const handleSetCreateModal = state => () => {
    setCreateModal(state)
  }

  const handleSetRemoveModal = id => () => {
    setRemoveModal(id)
  }

  const handleAddClient = ({ name, email, phone }) => {
    addClient({
      variables: { name, email, phone },
      update: (cache, { data: { addClient } }) => {
        const { clients } = cache.readQuery({ query: GET_CLIENTS })
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: [...clients, addClient]
          }
        })
      }
    })

    setCreateModal(false)
  }

  const handleRemoveClient = () => {
    removeClient({
      variables: { id: removeModal },
      update: (cache, { data: { deleteClient } }) => {
        const { clients } = cache.readQuery({ query: GET_CLIENTS })
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter(({ _id }) => _id !== deleteClient._id)
          }
        })
      }
    })

    setRemoveModal('')
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <AddClientModal isActive={isCreateModal} onAdd={handleAddClient} onClose={handleSetCreateModal(false)} />

      <ConfirmModal
        isActive={!!removeModal}
        title='Are you sure?'
        onConfirm={handleRemoveClient}
        onClose={handleSetRemoveModal('')}
      />

      <section>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-3xl font-bold'>Clients</h1>

          <button
            type='button'
            className='p-2 bg-emerald-600 hover:bg-emerald-700 rounded-md transition'
            onClick={handleSetCreateModal(true)}
          >
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
                          onClick={handleSetRemoveModal(_id)}
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
