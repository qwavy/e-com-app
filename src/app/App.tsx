import '@mantine/core/styles.css';

import { Login } from '../pages/login';
import { MantineProvider } from '@mantine/core';
import { theme } from './provider/mantine';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Login />
    </MantineProvider>
  );
}

export default App;
