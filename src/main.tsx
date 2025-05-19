import { userStore } from '@entities/user/model/user-store';
import { buildAnonymousClient } from '@shared/api/client/build-anonymous-client.ts';
import { restoreSession } from '@shared/api/client/restore-session.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App.tsx';
import './index.css';

async function main() {
  await userStore.restoreSession();
  const refreshToken = localStorage.getItem('ct_refresh_token');
  try {
    if (refreshToken && refreshToken.trim() !== '') {
      restoreSession();
    } else {
      throw new Error('No refresh token found');
    }
  } catch {
    await buildAnonymousClient();
  }

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
}

main();
