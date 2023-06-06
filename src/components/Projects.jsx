import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_PROJECTS } from 'queries/project'
import { ADD_PROJECT, REMOVE_PROJECT } from 'mutatuins/project'
import { Add, Edit, Trash } from 'icons'
import { AddProjectModal, ConfirmModal, Error } from 'components'

const Projects = () => {
  const { loading, data, error } = useQuery(GET_PROJECTS)
  const [addProject] = useMutation(ADD_PROJECT)
  const [removeProject] = useMutation(REMOVE_PROJECT)

  const [isCreateModal, setCreateModal] = useState(false)
  // Client id as a value
  const [removeModal, setRemoveModal] = useState('')

  const handleSetCreateModal = state => () => {
    setCreateModal(state)
  }

  const handleSetRemoveModal = id => () => {
    setRemoveModal(id)
  }

  const handleAddProject = ({ clientId, name, description, status }) => {
    addProject({
      variables: { clientId, name, description, status },
      update: (cache, { data: { addProject } }) => {
        const { projects } = cache.readQuery({ query: GET_PROJECTS })
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: [...projects, addProject]
          }
        })
      }
    })

    setCreateModal(false)
  }

  const handleRemoveProject = () => {
    removeProject({
      variables: { id: removeModal },
      update: (cache, { data: { deleteProject } }) => {
        const { projects } = cache.readQuery({ query: GET_PROJECTS })
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: projects.filter(({ _id }) => _id !== deleteProject._id)
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
      <AddProjectModal isActive={isCreateModal} onAdd={handleAddProject} onClose={handleSetCreateModal(false)} />

      <ConfirmModal
        isActive={!!removeModal}
        title='Are you sure?'
        onConfirm={handleRemoveProject}
        onClose={handleSetRemoveModal('')}
      />

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
                    <tr key={index} className='border-t border-gray-700'>
                      {[...Array(7)].map((_, idx) => (
                        <td key={idx} className='px-3 py-2 bg-gray-800'>
                          &nbsp;
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.projects.map(({ _id, name, status, description, client }) => (
                    <tr key={_id} className='border-t border-gray-700'>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{_id}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{client.name}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{name}</td>
                      <td className='px-3 py-2 bg-gray-800 whitespace-nowrap'>{status}</td>
                      <td className='px-3 py-2 bg-gray-800'>{description || '-'}</td>
                      <td className='px-3 py-2 bg-gray-800'>
                        <button
                          type='button'
                          className='flex justify-center items-center w-6 h-6 bg-sky-600 hover:bg-sky-700 rounded-sm transition'
                        >
                          <Edit className='w-4 h4' />
                        </button>
                      </td>
                      <td className='px-3 py-2 bg-gray-800' onClick={handleSetRemoveModal(_id)}>
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
