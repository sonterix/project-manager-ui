import { useMutation } from '@apollo/client'
import { REMOVE_PROJECT } from 'mutatuins/project'
import { GET_PROJECTS } from 'queries/project'

const RemoveProjectModal = ({ isActive, projectId, onClose }) => {
  const [removeProject] = useMutation(REMOVE_PROJECT)

  const handleRemoveProject = () => {
    removeProject({
      variables: { id: projectId },
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
              onClick={handleRemoveProject}
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

export default RemoveProjectModal
