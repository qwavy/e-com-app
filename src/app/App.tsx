import { DefaultLayout } from '../shared/layouts/default-layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, mainRoutes } from './providers/router/routes';

function App() {
  return (
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
  );
}

export default App;
