import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Layout } from './components'
import './index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <StrictMode>
    <Layout />
  </StrictMode>
)
