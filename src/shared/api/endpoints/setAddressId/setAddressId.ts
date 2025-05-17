import { Action } from '../createCustomer/createCustomer';
import { api } from '@shared/api/api';

interface Props {
  shippingAddressId: string;
  billingAddressId: string;
  version: number;
  id: string;
  action1: Action;
  action2: Action;
}

export function setAddressId({ shippingAddressId, billingAddressId, version, id, action1, action2 }: Props) {
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
