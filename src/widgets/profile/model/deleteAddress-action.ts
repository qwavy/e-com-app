import { userStore } from '@entities/user/model/user-store';
import { deleteAddress } from '@shared/api/endpoints/deleteAddress/deleteAddress';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { CustomClientResponse } from '@shared/types/customerTypes';

interface Props {
  addressId: string;
  version: number;
  id: string;
}

export const deleteAddressAction = async ({ addressId, id, version }: Props) => {
  try {
    const response = (await deleteAddress({ addressId, id, version })) as CustomClientResponse;

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
