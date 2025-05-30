import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URL, PROJECT_KEY, scope } from '@shared/constants/constants';
import { RegistrationFields } from '@shared/types/customerTypes';

import { createClientBuilder } from '../base/client-builder';
import { tokenCache } from '../base/token-cache';
import { addAddress } from '../endpoints/addAddress/addAdress';
import { setAddressParams } from '../endpoints/setAddressParams/setAddressParams';

export enum Action {
  setDefaultShippingAddress = 'setDefaultShippingAddress',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  addBillingAddressId = 'addBillingAddressId',
  addShippingAddressId = 'addShippingAddressId',
}

export const createApiClient = () => {
  tokenCache.clear();

  const client = createClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withClientCredentialsFlow({
      host: OAUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      scopes: scope.split(' '),
      httpClient: fetch,
      tokenCache,
    })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};

export async function createCustomer(data: RegistrationFields) {
  const api = createApiClient();
  let customer;

  try {
    const response = await api.customers().post({ body: data }).execute();
    const version = response.body.customer.version;
    const id = response.body.customer.id;

    const shippingAddress = {
      streetName: data.streetName,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    };

    const billingAddress = {
      streetName: data.billingStreet ? data.billingStreet : data.streetName,
      postalCode: data.billingPostalCode ? data.billingPostalCode : data.postalCode,
      city: data.billingCity ? data.billingCity : data.city,
      country: data.billingCountry ? data.billingCountry : data.country,
    };

    let billingAddressId;
    let newVersion = version;

    const shippingAddressId = (await addAddress({ data: shippingAddress, version, id })).body.addresses[0].id;
    if (!data.billingAddress) {
      newVersion++;

      billingAddressId = (await addAddress({ data: billingAddress, version: newVersion, id })).body.addresses[1].id;
    } else {
      billingAddressId = shippingAddressId;
    }

    if ((data.defaultAddress && data.billingAddress) || (data.defaultAddress && !data.billingAddress)) {
      if (shippingAddressId && billingAddressId) {
        newVersion++;
        customer = await setAddressParams({
          addressId: shippingAddressId,
          version: newVersion,
          id,
          action: Action.setDefaultShippingAddress,
        });

        newVersion = newVersion + 2;
        customer = await setAddressParams({
          addressId: billingAddressId,
          version: newVersion,
          id,
          action: Action.setDefaultBillingAddress,
        });
      }
    }

    if ((!data.defaultAddress && data.billingAddress) || (!data.defaultAddress && !data.billingAddress)) {
      if (shippingAddressId && billingAddressId) {
        newVersion++;
        customer = await setAddressParams({
          addressId: shippingAddressId,
          version: newVersion,
          id,
          action: Action.addShippingAddressId,
        });

        newVersion++;
        customer = await setAddressParams({
          addressId: billingAddressId,
          version: newVersion,
          id,
          action: Action.addBillingAddressId,
        });
      }
    }

    return { success: true, data: customer, statusCode: customer?.statusCode };
  } catch (error) {
    return { success: false, error };
  }
}
