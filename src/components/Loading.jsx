const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='relative'>
        <div className='absolute top-0 left-0 w-16 h-16 rounded-full border-t-4 border-teal-400 animate-spin'></div>
      </div>
    </div>
  )
}

export default Loading
