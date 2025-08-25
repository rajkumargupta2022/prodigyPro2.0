import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AdminUserProvider } from './context/AdminContext.tsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
    <AdminUserProvider>
      <App />
      </AdminUserProvider>
      </BrowserRouter>
  </StrictMode>,
)
