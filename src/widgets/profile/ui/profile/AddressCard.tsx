import { Card, Modal, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShippingAddress } from '@shared/types/customerTypes';
import { AddressInfo } from '@shared/types/customerTypes';

import { UpdateShippingAddressForm } from './UpdateShippingAddressForm';

interface AddressProps {
  address: ShippingAddress;
  addressInfo: AddressInfo;
}

export const AddressCard = ({ address, addressInfo }: AddressProps) => {
  console.log(addressInfo);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="sm" mt="xs" c="dimmed">
          Postal code: {address.postalCode}
        </Text>
        <Text size="sm" mt="xs" c="dimmed">
          Country: {address.country}
        </Text>
        <Text size="sm" mt="xs" c="dimmed">
          City: {address.city}
        </Text>
        <Text size="sm" mt="xs" c="dimmed">
          Street: {address.streetName}
        </Text>
        <Button variant="default" onClick={open}>
          Edit
        </Button>
        <Modal size="auto" opened={opened} onClose={close} centered>
          <UpdateShippingAddressForm />
        </Modal>
      </Card>
    </>
  );
};
