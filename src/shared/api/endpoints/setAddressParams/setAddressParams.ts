import { createApiClient } from '@shared/api/client/create-api-client';

import { Action } from '../addAddress/addAdress';

interface Props {
  addressId: string;
  version: number;
  id: string;
  action: Action;
}

export function setAddressParams({ addressId, version, id, action }: Props) {
  const api = createApiClient();
  return api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action,
            addressId: addressId,
          },
        ],
      },
    })
    .execute();
}
