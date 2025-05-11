import '@mantine/core/styles.css';

import { DefaultLayout } from '../shared/layouts/default-layout';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import { theme } from './provider/mantine';

import { Route, Routes } from 'react-router-dom';
import { authRoutes, mainRoutes } from './providers/router/routes';

function App() {
  return (
    <MantineProvider theme={theme}>
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
    </MantineProvider>
  );
}

export default App;
