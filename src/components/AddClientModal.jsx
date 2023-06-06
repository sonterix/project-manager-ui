import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { GET_CLIENTS } from 'queries/client'
import { ADD_CLIENT } from 'mutatuins/client'

const AddClientModal = ({ isActive, onClose }) => {
  const [addClient] = useMutation(ADD_CLIENT)

  const [form, setForm] = useState({})

  const handleUpdateField = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    const variables = {
      name: form?.name || null,
      email: form?.email || null,
      phone: form?.phone || null
    }

    addClient({
      variables,
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

    setForm({})
    onClose()
  }

  return isActive ? (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-30'>
        <div className='relative bg-gray-900 rounded-lg p-6 shadow-xl z-50'>
          <h2 className='text-2xl font-bold mb-5'>Create Client</h2>

          <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <div className='mb-3'>
              <label htmlFor='name' className='block mb-1 font-medium text-gray-200'>
                Name <span className='text-red-500'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                name='name'
                placeholder='John Dou'
                value={form?.name || ''}
                onChange={handleUpdateField}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='block mb-1 font-medium text-gray-200'>
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                id='email'
                type='email'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                name='email'
                placeholder='example@email.com'
                value={form?.email || ''}
                onChange={handleUpdateField}
                required
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='phone' className='block mb-1 font-medium text-gray-200'>
                Phone
              </label>
              <input
                id='phone'
                type='tel'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                name='phone'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeholder='555-555-5555'
                value={form?.phone || ''}
                onChange={handleUpdateField}
              />
            </div>

            <button type='submit' className='px-4 py-2 w-full text-white bg-teal-600 hover:bg-teal-700 rounded-md'>
              Create Client
            </button>
          </form>
        </div>

        <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={onClose} />
      </div>
    </>
  ) : null
}

export default AddClientModal
