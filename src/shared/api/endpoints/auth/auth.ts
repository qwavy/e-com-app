import { api } from '@shared/api/api';

export const loginEndpoint = (email: string, password: string) => {
  return api
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
};
