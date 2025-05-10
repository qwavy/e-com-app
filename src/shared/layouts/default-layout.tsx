import { Header } from '../../widgets/header';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
