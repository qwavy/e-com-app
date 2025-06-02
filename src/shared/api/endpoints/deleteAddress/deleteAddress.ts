import { createApiClient } from '@shared/api/client/create-api-client';

interface Props {
  addressId: string;
  version: number;
  id: string;
}

export async function deleteAddress({ addressId, version, id }: Props) {
  const api = createApiClient();
  const res = await api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      },
    })
    .execute();
  return res;
}
