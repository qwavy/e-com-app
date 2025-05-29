import { Group, Stack } from '@mantine/core';
import { ShippingAddress } from '@shared/types/customerTypes';
import { AddressInfo } from '@shared/types/customerTypes';

import { AddressCard } from './AddressCard';

interface AddressListProps {
  data: ShippingAddress[];
  addressInfo: AddressInfo;
}

export const UpdateAddressForm = ({ data, addressInfo }: AddressListProps) => {
  return (
    <Stack>
      <Group grow wrap="wrap">
        {data.map((address) => (
          <AddressCard key={address.id} address={address} addressInfo={addressInfo} />
        ))}
      </Group>
    </Stack>
  );
};
