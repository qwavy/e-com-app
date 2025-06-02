import { userStore } from '@entities/user/model/user-store';
import { Profile } from '@widgets/profile';
import { observer } from 'mobx-react-lite';

import style from './profile.module.css';

export const ProfilePage = observer(() => {
  const { user } = userStore;

  if (!user) {
    return <div className={style.loading}>Loading...</div>;
  }
  return (
    <>
      <h2 className={style.title}>
        Welcome, {user?.firstName} {user?.lastName}!
      </h2>
      <Profile />
    </>
  );
});
