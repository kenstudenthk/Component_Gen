import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PowerHub from './PowerHub.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PowerHub />
  </StrictMode>,
)
