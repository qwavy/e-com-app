import { userStore } from '@entities/user/model/user-store';
import { updateAddressCustomer } from '@shared/api/endpoints/updateAddressCustomer/updateAddressCustomer';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';

export const updateAddressAction = async ({ data, userId, addressId, version }) => {
  try {
    const response = await updateAddressCustomer({ data, userId, addressId, version });

    if (response.statusCode === SUCCESSFUL_RESPONSE_CODE) {
      const customer = response.body;
      userStore.setUser(customer);
      return { error: '', customer };
    } else {
      const error = response.error;
      return { error: error.message };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unexpected error';
    return { error };
  }
};
