const ConfirmModal = ({ isActive, title, onConfirm, onCancel }) => {
  return isActive ? (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-30'>
        <div className='relative bg-gray-900 rounded-lg p-6 shadow-xl z-50'>
          {title ? <h2 className='text-2xl font-bold mb-5'>{title}</h2> : null}

          <div className='flex justify-end items-center space-x-3'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md'
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type='button'
              className='px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-md'
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>

        <div className='fixed inset-0 bg-black opacity-60 z-40' onClick={onCancel} />
      </div>
    </>
  ) : null
}

export default ConfirmModal
