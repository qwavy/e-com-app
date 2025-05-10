import '@mantine/core/styles.css';

import { Login } from '../pages/login';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'dark',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Login />
    </MantineProvider>
  );
}

export default App;
