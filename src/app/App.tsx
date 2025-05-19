import { userStore } from '@entities/user/model/user-store';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '../shared/layouts/default-layout';
import { theme } from './providers/mantine';
import { authRoutes, mainRoutes } from './providers/router/routes';

const App = observer(() => {
  if (!userStore.isInitialized) {
    return <div>Loading user...</div>;
  }
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Routes>
        <Route element={<DefaultLayout />}>
          {mainRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </MantineProvider>
  );
});

export default App;
