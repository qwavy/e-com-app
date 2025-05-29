import { userStore } from '@entities/user/model/user-store';
import { PersonalInfo } from '@shared/types/customerTypes';
import { ShippingAddress } from '@shared/types/customerTypes';
import { observer } from 'mobx-react-lite';

import { UpdateAddressForm } from './AddressList';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { UpdatePersonalInformationForm } from './UpdatePersonalInformationForm';

export const Profile = observer(() => {
  const { user } = userStore;

  return (
    <>
      <h2>Personal information</h2>
      <UpdatePersonalInformationForm customer={user as PersonalInfo} />
      <h2>Password</h2>
      <UpdatePasswordForm />
      <h2>Address list</h2>
      <UpdateAddressForm data={user?.addresses as ShippingAddress[]} />
    </>
  );
});
