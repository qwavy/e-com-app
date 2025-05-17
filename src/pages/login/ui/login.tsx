import { LoginForm } from '@features/login-user';
import style from './login.module.css';

export const LoginPage = () => {
  return (
    <div className={style.login}>
      <div className={style['login-container']}>
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};
