import { userStore } from '@entities/user/model/user-store';
import { observer } from 'mobx-react-lite';

import { ChangePasswordForm } from './PasswordField';
import { PersonalInformationForm } from './PersonalInformationForm';

export const Profile = observer(() => {
  const { user } = userStore;

  /*
  user?.addresses.map((item) => {
    console.log(item.streetName);
  });
*/
  /*const value = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
  };
*/
  // const password = user?.password ?? '';

  //console.log(id, '********', version);

  return (
    <>
      <h2>Identity change</h2>
      <PersonalInformationForm customer={user} />
      <h2>Password change</h2>
      <ChangePasswordForm />
    </>
  );
});
