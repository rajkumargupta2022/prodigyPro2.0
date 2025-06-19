import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AdminUserProvider } from './context/AdminContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminUserProvider>
      <App />
      </AdminUserProvider>
  </StrictMode>,
)
