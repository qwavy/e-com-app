import { RegistrationFields } from '@features/registration-user/ui/registration-form';
import { api } from '@shared/api/api';

export const registerEndpoint = async (data: RegistrationFields) => {
  try {
    const response = await api.customers().post({ body: data }).execute();

    return { success: true, data: response, statusCode: response.statusCode };
  } catch (error) {
    return { success: false, error };
  }
};
