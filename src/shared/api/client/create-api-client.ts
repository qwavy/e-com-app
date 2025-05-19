import { RegistrationFields } from '@features/registration-user/ui/registration-form';
import { addAddress } from '../endpoints/addAddress/addAdress';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createClientBuilder } from '../base/client-builder';
import { setAddressId } from '../endpoints/setAddressId/setAddressId';
import { tokenCache } from '../base/token-cache';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_URI, PROJECT_KEY, scope } from '@shared/constants/constants';

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
      host: OAUTH_URI,
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
      streetName: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    };

    const billingAddress = {
      streetName: data.billingStreet ? data.billingStreet : data.street,
      postalCode: data.billingPostalCode ? data.billingPostalCode : data.postalCode,
      city: data.billingCity ? data.billingCity : data.city,
      country: data.billingCountry ? data.billingCountry : data.country,
    };

    let billingAddressId;
    let newVersion = version;

    const shippingAddressId = (await addAddress({ address: shippingAddress, version, id })).body.addresses[0].id;
    if (!data.billingAddress) {
      newVersion = version + 1;
      billingAddressId = (await addAddress({ address: billingAddress, version: newVersion, id })).body.addresses[1].id;
    } else {
      billingAddressId = shippingAddressId;
    }

    if ((data.defaultAddress && data.billingAddress) || (data.defaultAddress && !data.billingAddress)) {
      if (shippingAddressId && billingAddressId) {
        customer = await setAddressId({
          shippingAddressId,
          billingAddressId,
          version: newVersion,
          id,
          action1: Action.setDefaultShippingAddress,
          action2: Action.setDefaultBillingAddress,
        });
      }
    }

    if ((!data.defaultAddress && data.billingAddress) || (!data.defaultAddress && !data.billingAddress)) {
      if (shippingAddressId && billingAddressId) {
        customer = await setAddressId({
          shippingAddressId,
          billingAddressId,
          version: newVersion,
          id,
          action1: Action.addShippingAddressId,
          action2: Action.addBillingAddressId,
        });
      }
    }

    return { success: true, data: customer, statusCode: customer?.statusCode };
  } catch (error) {
    return { success: false, error };
  }
}
