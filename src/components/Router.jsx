import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Loading, NotFound } from 'components'

const Clients = lazy(() => import('components/Clients'))
const Projects = lazy(() => import('components/Projects'))

const Router = () => {
  return (
    <Routes>
      <Route
        path='/clients'
        element={
          <Suspense fallback={<Loading />}>
            <Clients />
          </Suspense>
        }
      />
      <Route
        path='/projects'
        element={
          <Suspense fallback={<Loading />}>
            <Projects />
          </Suspense>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
