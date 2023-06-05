const Error = ({ message }) => {
  return (
    <div className='px-4 py-4 mx-auto max-w-4xl text-red-500 bg-gray-800 border border-red-800 rounded-md'>
      <p className='text-xl font-bold'>Error:</p>
      <p>{message || 'Sorry, an error occurred. Please try again later.'}</p>
    </div>
  )
}

export default Error
