import { buildAnonymousClient } from '@shared/api/client/build-anonymous-client.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App.tsx';
import './index.css';

buildAnonymousClient();

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
