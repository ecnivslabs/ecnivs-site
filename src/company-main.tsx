import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CompanyPage } from './pages/CompanyPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CompanyPage />
  </StrictMode>,
)
