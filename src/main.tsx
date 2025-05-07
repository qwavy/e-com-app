import './index.css';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
