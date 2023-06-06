import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_PROJECTS } from 'queries/project'
import { Add, Edit, Trash } from 'icons'
import { AddProjectModal, RemoveProjectModal, Error } from 'components'

const Projects = () => {
  const navigate = useNavigate()

  const { loading, data, error } = useQuery(GET_PROJECTS)

  const [isCreateModal, setCreateModal] = useState(false)
  // Client id as a value
  const [removeModal, setRemoveModal] = useState('')

  const handleSetCreateModal = state => () => {
    setCreateModal(state)
  }

  const handleSetRemoveModal = id => event => {
    event?.stopPropagation()
    setRemoveModal(id)
  }

  const handleOpenProject = id => () => {
    navigate(`/projects/${id}`)
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <AddProjectModal isActive={isCreateModal} onClose={handleSetCreateModal(false)} />
      <RemoveProjectModal isActive={!!removeModal} projectId={removeModal} onClose={handleSetRemoveModal('')} />

      <section>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold'>Projects</h1>

          <button
            type='button'
            className='p-2 bg-emerald-600 hover:bg-emerald-700 rounded-md transition'
            onClick={handleSetCreateModal(true)}
          >
            <Add className='w-5 h-5' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='table-auto w-full text-md text-left'>
            <thead className='uppercase'>
              <tr>
                {['ID', 'Client', 'Name', 'Status', 'Description', '', ''].map((row, index) => (
                  <th key={index} className='p-3 bg-gray-900'>
                    {row}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={loading ? 'animate-pulse' : ''}>
              {loading
                ? [...Array(5)].map((_, index) => (
                    <tr key={index} className='border-t bg-gray-800 border-gray-700'>
                      {[...Array(7)].map((_, idx) => (
                        <td key={idx} className='px-3 py-2'>
                          &nbsp;
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.projects.map(({ _id, name, status, description, client }) => (
                    <tr
                      key={_id}
                      className='border-t border-gray-700 bg-gray-800 hover:bg-teal-600 cursor-pointer'
                      onClick={handleOpenProject(_id)}
                    >
                      <td className='px-3 py-2 whitespace-nowrap'>{client.name}</td>
                      <td className='px-3 py-2 whitespace-nowrap'>{name}</td>
                      <td className='px-3 py-2 whitespace-nowrap'>{_id}</td>
                      <td className='px-3 py-2 whitespace-nowrap'>{status}</td>
                      <td className='px-3 py-2'>{description || '-'}</td>
                      <td className='px-3 py-2'>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-sky-600 hover:bg-sky-700 rounded-sm transition'
                        >
                          <Edit className='w-4 h4' />
                        </button>
                      </td>
                      <td className='px-3 py-2' onClick={handleSetRemoveModal(_id)}>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-rose-600 hover:bg-rose-700 rounded-sm transition'
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

export default Projects
