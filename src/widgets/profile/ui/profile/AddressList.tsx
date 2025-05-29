import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShippingAddress } from '@shared/types/customerTypes';

import { AddAddressForm } from './AddAddressForm';
import { AddressCard } from './AddressCard';

interface AddressListProps {
  data: ShippingAddress[];
}

export const UpdateAddressForm = ({ data }: AddressListProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group grow wrap="wrap" style={{ paddingBottom: '2rem' }}>
        <Button variant="default" onClick={open} style={{ backgroundColor: '#F8F8FF', width: '220px', height: '50px' }}>
          Add new shipping address
        </Button>
        <Button variant="default" onClick={open} style={{ backgroundColor: '#F8F8FF', width: '220px', height: '50px' }}>
          Add new billing address
        </Button>
      </Group>

      <Group grow wrap="wrap">
        {data.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </Group>
      <Modal size="auto" opened={opened} onClose={close} centered>
        <AddAddressForm close={close} />
      </Modal>
    </>
  );
};
