import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { GET_PROJECT } from 'queries/project'
import { EditProjectModal, Error, RemoveProjectModal } from 'components'
import { useState } from 'react'

const Project = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, data, error } = useQuery(GET_PROJECT, { variables: { id } })
  const [isEditModal, setEditModal] = useState(false)
  const [isRemoveModal, setRemoveModal] = useState(false)

  const handleSetEditModal = projectData => () => {
    setEditModal(projectData)
  }

  const handleSetRemoveModal = id => () => {
    setRemoveModal(id)
  }

  if (error) {
    return <Error />
  }

  if (!loading && !data?.project) {
    navigate('/projects')
    return null
  }

  const { _id, name, description, status, client } = data?.project || {}

  return (
    <>
      <EditProjectModal
        isActive={isEditModal}
        initData={{ _id, name, description, status, clientId: client?._id }}
        onClose={handleSetEditModal(false)}
      />
      <RemoveProjectModal isActive={isRemoveModal} projectId={_id} onClose={handleSetRemoveModal(false)} />

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
            <div className='mt-6 mb-6'>
              <h3 className='text-lg text-white font-semibold'>Status</h3>
              <p className='text-teal-500'>{status}</p>
            </div>
            <div className='flex justify-center items-center space-x-4'>
              <button
                type='button'
                className='px-4 py-2 w-full text-white bg-sky-600 hover:bg-sky-700 rounded-md'
                onClick={handleSetEditModal(true)}
              >
                Edit
              </button>
              <button
                type='button'
                className='px-4 py-2 w-full text-white bg-rose-600 hover:bg-rose-700 rounded-md'
                onClick={handleSetRemoveModal(true)}
              >
                Remove
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Project
