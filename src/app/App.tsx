import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '../shared/layouts/default-layout';
import { Error, theme } from './providers/mantine';
import { authRoutes, mainRoutes } from './providers/router/routes';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider modals={{ Error }}>
        <Routes>
          <Route element={<DefaultLayout />}>
            {mainRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={React.createElement(element)} />
            ))}
          </Route>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={React.createElement(element)} />
          ))}
        </Routes>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
