import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from 'components/Header'
import Clients from 'components/Clients'
import Projects from 'components/Projects'
import NotFound from 'components/NotFound'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

const Dashboard = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />

        <main className='min-h-screen bg-gray-700 text-white'>
          <div className='container mx-auto px-4 py-6'>
            <Routes>
              <Route path='/clients' element={<Clients />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default Dashboard
