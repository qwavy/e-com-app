import { userStore } from '@entities/user/model/user-store';
import { changePassword } from '@shared/api/endpoints/changePassword/changePassword';
import { ChangePasswordProps } from '@shared/api/endpoints/changePassword/changePassword';
import { SUCCESSFUL_RESPONSE_CODE } from '@shared/constants/constants';
import { CustomClientResponse } from '@shared/types/customerTypes';

export const changePasswordAction = async ({ newPassword, currentPassword, id, version }: ChangePasswordProps) => {
  try {
    const response = (await changePassword({ newPassword, currentPassword, id, version })) as CustomClientResponse;

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
