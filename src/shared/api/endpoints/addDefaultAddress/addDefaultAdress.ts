import { RegistrationFields } from '@features/session/registration/ui/Registration-form';
import { api } from '@shared/api/api';

interface Props {
  data: RegistrationFields;
  version: number;
  id: string;
}

export function addDefaultAddress({ data, version, id }: Props) {
  return api
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName: data.street,
              postalCode: data.postalCode,
              city: data.city,
              country: data.country,
            },
          },
        ],
      },
    })
    .execute();
}
