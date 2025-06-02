import { createApiClient } from '@shared/api/client/create-api-client';

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  version: number;
  id: string;
}

export async function changePassword({ newPassword, currentPassword, id, version }: ChangePasswordProps) {
  const api = createApiClient();
  const res = await api
    .customers()
    .password()
    .post({
      body: {
        id,
        version,
        newPassword,
        currentPassword,
      },
    })
    .execute();
  return res;
}
