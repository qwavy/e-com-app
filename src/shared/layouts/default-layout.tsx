import { Outlet } from 'react-router-dom';

import { Header } from '../../widgets/header';

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
