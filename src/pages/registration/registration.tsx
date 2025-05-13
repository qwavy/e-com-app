import { RegistrationForm } from '@features/session/registration';
import style from './registration.module.css';

const RegistrationPage = () => {
  return (
    <div className={style.registration}>
      <div className={style['registration-container']}>
        <h1>Sign In</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
