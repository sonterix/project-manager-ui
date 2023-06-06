import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { GET_PROJECT } from 'queries/project'
import { Error } from 'components'

const Project = () => {
  const { id } = useParams()

  const { loading, data, error } = useQuery(GET_PROJECT, { variables: { id } })

  if (error) {
    return <Error />
  }

  const { name, description, status, client } = data?.project || {}

  return (
    <div
      className={`mx-auto bg-gray-800 shadow-md rounded-lg p-6 ${loading ? 'animate-pulse h-64' : ''}`}
      style={{ maxWidth: '500px' }}
    >
      {!loading ? (
        <>
          <h2 className='text-3xl text-teal-500 font-bold mb-2'>{name}</h2>
          <p className='text-gray-200'>{description}</p>
          <div className='mt-6'>
            <h3 className='text-lg text-white font-semibold'>Client Details</h3>
            <p className='text-gray-200'>
              <span className='text-teal-500'>ID:</span> {client._id}
            </p>
            <p className='text-gray-200'>
              <span className='text-teal-500'>Name:</span> {client.name}
            </p>
            <p className='text-gray-200'>
              <span className='text-teal-500'>Email:</span> {client.email}
            </p>
            <p className='text-gray-200'>
              <span className='text-teal-500'>Phone:</span> {client.phone}
            </p>
          </div>
          <div className='mt-6'>
            <h3 className='text-lg text-white font-semibold'>Status</h3>
            <p className='text-teal-500'>{status}</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Project
