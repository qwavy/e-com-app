import { Action } from '@shared/api/client/create-api-client';
import { createApiClient } from '@shared/api/client/create-api-client';

interface Props {
  shippingAddressId: string;
  billingAddressId: string;
  version: number;
  id: string;
  action1: Action;
  action2: Action;
}

export function setAddressId({ shippingAddressId, billingAddressId, version, id, action1, action2 }: Props) {
  const api = createApiClient();
  const newVersion = version + 1;
  return api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: newVersion,
        actions: [
          {
            action: action1,
            addressId: shippingAddressId,
          },
          {
            action: action2,
            addressId: billingAddressId,
          },
        ],
      },
    })
    .execute();
}
