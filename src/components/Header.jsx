import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='sticky top-0 flex justify-between px-4 text-white bg-gray-800'>
      <nav className='container flex justify-between items-center mx-auto'>
        <a href='#' className='flex junstify-left items-center space-x-3 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-8 h-8 text-teal-400'
          >
            <path
              fillRule='evenodd'
              d='M8.478 1.6a.75.75 0 01.273 1.025 3.72 3.72 0 00-.425 1.122c.058.057.118.114.18.168A4.491 4.491 0 0112 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 00-.426-1.126.75.75 0 111.298-.75 5.22 5.22 0 01.671 2.045.75.75 0 01-.187.582c-.241.27-.505.52-.787.749a4.495 4.495 0 01.216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.741a23.122 23.122 0 003.832-.802 23.241 23.241 0 00-.345-2.634.75.75 0 011.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 01-.516.749c-1.527.5-3.119.855-4.76 1.05-.074.38-.22.735-.423 1.05a24.61 24.61 0 015.943 1.358.75.75 0 01.492.75 24.665 24.665 0 01-1.189 6.25.75.75 0 01-1.425-.47 23.141 23.141 0 001.077-5.307c-.5-.168-1.009-.32-1.524-.454.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.134-1.022.286-1.522.454a23.14 23.14 0 001.077 5.308.75.75 0 01-1.425.468 24.663 24.663 0 01-1.19-6.25.75.75 0 01.493-.749 24.593 24.593 0 014.964-1.24h.01c.321-.046.644-.085.969-.118a2.982 2.982 0 01-.424-1.05 24.614 24.614 0 01-4.76-1.05.75.75 0 01-.516-.75c.057-1.161.194-2.302.405-3.417a.75.75 0 011.474.28c-.164.862-.28 1.74-.345 2.634 1.237.37 2.517.641 3.832.802.085-.265.207-.514.359-.74a18.732 18.732 0 01-.547-.082c-.664-.108-1.311-.611-1.417-1.403a4.535 4.535 0 01.217-2.103 6.788 6.788 0 01-.788-.751.75.75 0 01-.187-.583 5.22 5.22 0 01.67-2.04.75.75 0 011.026-.273z'
              clipRule='evenodd'
            />
          </svg>
          <p className='text-teal-300 font-mono text-xl font-semibold'>P.Manager</p>
        </a>

        <div className='hidden md:flex space-x-8 text-md font-semibold'>
          <NavLink
            to='/clients'
            className={({ isActive }) =>
              `py-4 ${isActive ? 'text-teal-300 hover:text-teal-300' : 'text-gray-300  hover:text-white'}`
            }
          >
            Clients
          </NavLink>
          <NavLink
            to='/projects'
            className={({ isActive }) =>
              `py-4 ${isActive ? 'text-teal-300 hover:text-teal-300' : 'text-gray-300  hover:text-white'}`
            }
          >
            Projects
          </NavLink>
        </div>

        <div className='py-4 md:hidden'>
          <button type='button' className='text-gray-300 hover:text-white focus:outline-none'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
