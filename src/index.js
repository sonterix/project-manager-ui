import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import Dashboard from './components/Dashboard'
import './index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
)
