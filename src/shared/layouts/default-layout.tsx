import { userStore } from '@entities/user/model/user-store';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { Header } from '../../widgets/header';
import styles from './default-layout.module.css';

export const DefaultLayout = observer(() => {
  const { user, isAuthenticated } = userStore;

  if (user === null && isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
});
