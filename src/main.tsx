import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SinglePortfolioProvider } from './context/SinglePortfolioContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SinglePortfolioProvider>
      <App />
    </SinglePortfolioProvider>
  </StrictMode>,
)
