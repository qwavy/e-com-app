import { userStore } from '@entities/user/model/user-store';
import { Paths } from '@shared/types/routerTypes';
import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRedirectProps {
  children: ReactElement;
}

export const AuthRedirect = observer(({ children }: AuthRedirectProps) => {
  if (userStore.user) {
    return <Navigate to={Paths.Home} replace />;
  }

  return <>{children}</>;
});
