import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AdminUserProvider } from './context/AdminContext.tsx'
import { BrowserRouter } from "react-router-dom";
import { EmergencyPortfolioProvider } from './context/EmergencyPortfolio.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <EmergencyPortfolioProvider>
      <AdminUserProvider>
        <App />
      </AdminUserProvider>
     </ EmergencyPortfolioProvider>
    </BrowserRouter>
  </StrictMode>,
)
