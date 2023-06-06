import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { GET_CLIENTS } from 'queries/client'

const AddClientModal = ({ isActive, onAdd, onClose }) => {
  const { data } = useQuery(GET_CLIENTS)

  const [form, setForm] = useState({})

  const handleUpdateField = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    onAdd({
      clientId: form?.clientId || null,
      name: form?.name || null,
      description: form?.description || null,
      status: form?.status || null
    })

    setForm({})
  }

  return isActive ? (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-30'>
        <div className='relative bg-gray-900 rounded-lg p-6 shadow-xl z-50'>
          <h2 className='text-2xl font-bold mb-5'>Create Project</h2>

          <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <div className='mb-3'>
              <label htmlFor='clientId' className='block mb-1 font-medium text-gray-200'>
                Client <span className='text-red-500'>*</span>
              </label>
              <select
                id='clientId'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                name='clientId'
                defaultValue=''
                onChange={handleUpdateField}
              >
                <option value='' disabled>
                  Select a client
                </option>

                {data?.clients.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                )) || (
                  <option value='loading' disabled>
                    Loading...
                  </option>
                )}
              </select>
            </div>

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
              <label htmlFor='status' className='block mb-1 font-medium text-gray-200'>
                Status <span className='text-red-500'>*</span>
              </label>
              <select
                id='status'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                name='status'
                defaultValue=''
                onChange={handleUpdateField}
              >
                <option value='' disabled>
                  Select status
                </option>
                <option value='NEW'>Not Started</option>
                <option value='PROGRESS'>In Progress</option>
                <option value='DONE'>Done</option>
              </select>
            </div>

            <div className='mb-6'>
              <label htmlFor='description' className='block mb-1 font-medium text-gray-200'>
                Description
              </label>
              <textarea
                id='description'
                className='w-80 px-4 py-2 text-gray-900 border border-gray-900 focus:outline-none focus:border-teal-500 rounded-md'
                rows={4}
                name='description'
                placeholder='This project about...'
                value={form?.description || ''}
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
