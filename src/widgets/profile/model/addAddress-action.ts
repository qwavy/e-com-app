import { userStore } from '@entities/user/model/user-store';
import { addAddress } from '@shared/api/endpoints/addAddress/addAdress';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { AddressProps, CustomClientResponse } from '@shared/types/customerTypes';

export const addAddressAction = async ({ data, id, version, isBilling }: AddressProps) => {
  try {
    const response = (await addAddress({ data, id, version, isBilling })) as CustomClientResponse;
    if (response) {
      if (response.statusCode === SUCCESSFUL_RESPONSE_CODE) {
        const customer = response.body;
        userStore.setUser(customer);
        return { error: '', customer };
      } else {
        const error = response.error;
        return { error: error.message };
      }
    }
    return { error: 'Unexpected error' };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unexpected error';
    return { error };
  }
};
