import { RegistrationFields } from '@features/session/registration/ui/Registration-form';
import { addAddress } from '../addAddress/addAdress';
import { api } from '@shared/api/api';
import { setAddressId } from '../setAddressId/setAddressId';

export enum Action {
  setDefaultShippingAddress = 'setDefaultShippingAddress',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  addBillingAddressId = 'addBillingAddressId',
  addShippingAddressId = 'addShippingAddressId',
}

export async function createCustomer(data: RegistrationFields) {
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
        await setAddressId({
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
        await setAddressId({
          shippingAddressId,
          billingAddressId,
          version: newVersion,
          id,
          action1: Action.addShippingAddressId,
          action2: Action.addBillingAddressId,
        });
      }
    }

    return { success: true, data: response, statusCode: response.statusCode };
  } catch (error) {
    return { success: false, error: error };
  }
}
