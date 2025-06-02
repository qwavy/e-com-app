import { createApiClient } from '@shared/api/client/create-api-client';
import { AddressProps } from '@shared/types/customerTypes';

import { setAddressParams } from '../setAddressParams/setAddressParams';

export enum Action {
  setDefaultShippingAddress = 'setDefaultShippingAddress',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  addBillingAddressId = 'addBillingAddressId',
  addShippingAddressId = 'addShippingAddressId',
}

export async function addAddress({ data, version = 1, id = '', isBilling }: AddressProps) {
  const api = createApiClient();

  const { streetName, postalCode, city, country } = data;
  const countryData = country ? country : 'AF';

  let customer;
  const res = await api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName,
              postalCode,
              city,
              country: countryData,
            },
          },
        ],
      },
    })
    .execute();
  const addressId = res.body.addresses[res.body.addresses.length - 1].id ?? '';
  let newVersion = version;
  // 2 галки
  if (data.defaultAddress && data.billingAddress) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addShippingAddressId,
    });

    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addBillingAddressId,
    });

    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.setDefaultShippingAddress,
    });
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.setDefaultBillingAddress,
    });
  }
  // 1 деф 0 билл - шип
  if (data.defaultAddress && !data.billingAddress && !isBilling) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addShippingAddressId,
    });

    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.setDefaultShippingAddress,
    });
  }
  // 1 деф 0 билл - бил
  if (data.defaultAddress && !data.billingAddress && isBilling) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addBillingAddressId,
    });

    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.setDefaultBillingAddress,
    });
  }
  // 0 деф 1 бил
  if (!data.defaultAddress && data.billingAddress) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addBillingAddressId,
    });
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addShippingAddressId,
    });
  }

  // 0 деф 0 бил - шип
  if (!data.defaultAddress && !data.billingAddress && !isBilling) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addShippingAddressId,
    });
  }
  // 0 деф 0 бил - бил
  if (!data.defaultAddress && !data.billingAddress && isBilling) {
    newVersion++;
    customer = await setAddressParams({
      addressId,
      version: newVersion,
      id,
      action: Action.addBillingAddressId,
    });
  }

  return customer;
}
