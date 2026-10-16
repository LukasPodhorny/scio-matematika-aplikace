import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChybovaHranice } from './components/ChybovaHranice.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChybovaHranice>
      <App />
    </ChybovaHranice>
  </StrictMode>,
)
