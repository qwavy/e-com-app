import '@mantine/core/styles.css';

import { Login } from '../pages/login';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Login />
    </MantineProvider>
  );
}

export default App;
