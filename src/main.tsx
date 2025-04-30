import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
