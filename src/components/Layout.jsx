import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { Header, Router } from 'components'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

const Layout = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <main className='min-h-screen bg-gray-700 text-white'>
          <Header />

          <div className='container mx-auto px-4 py-6'>
            <Router />
          </div>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default Layout
