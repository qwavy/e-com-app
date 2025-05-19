import { RegistrationForm } from '@features/registration-user';

import style from './registration.module.css';

const RegistrationPage = () => {
  return (
    <div className={style.registration}>
      <div className={style['registration-container']}>
        <h1>Sign Up</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
