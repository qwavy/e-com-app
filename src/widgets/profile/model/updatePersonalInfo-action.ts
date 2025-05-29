import { userStore } from '@entities/user/model/user-store';
// eslint-disable-next-line max-len
import { updatePersonalInfoCustomer } from '@shared/api/endpoints/updatePersonalInfoCustomer/updatePersonalInfoCustomer';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { UpdatePersonalInfoCustomerProps } from '@shared/types/customerTypes';

export const updatePersonalInfoAction = async ({ data, id, version }: UpdatePersonalInfoCustomerProps) => {
  try {
    const response = await updatePersonalInfoCustomer({ data, id, version });

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
