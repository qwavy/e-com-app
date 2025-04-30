import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.createElement('div')
container.classList.add('container')
document.body.appendChild(container)


createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
