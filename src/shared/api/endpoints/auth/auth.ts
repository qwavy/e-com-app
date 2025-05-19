import { api } from '@shared/api/api';

export const loginEndpoint = async (email: string, password: string) => {
  try {
    const response = await api
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return { success: true, data: response, statusCode: response.statusCode };
  } catch (error) {
    return { success: false, error: error };
  }
};
