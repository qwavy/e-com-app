import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShippingAddress } from '@shared/types/customerTypes';

import { AddBillingAddressForm } from './AddBillingAddressForm';
import { AddShippingAddressForm } from './AddShippingAddressForm';
import { AddressCard } from './AddressCard';

interface AddressListProps {
  data: ShippingAddress[];
}

export const UpdateAddressForm = ({ data }: AddressListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  return (
    <>
      <Group grow wrap="wrap" style={{ paddingBottom: '2rem' }}>
        <Button variant="default" onClick={open} style={{ backgroundColor: '#F8F8FF', width: '220px', height: '50px' }}>
          Add new shipping address
        </Button>
        <Button
          variant="default"
          onClick={open2}
          style={{ backgroundColor: '#F8F8FF', width: '220px', height: '50px' }}
        >
          Add new billing address
        </Button>
      </Group>

      <Group
        wrap="wrap"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {data.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </Group>
      <Modal size="auto" opened={opened} onClose={close} centered>
        <AddShippingAddressForm close={close} />
      </Modal>
      <Modal size="auto" opened={opened2} onClose={close2} centered>
        <AddBillingAddressForm close={close2} />
      </Modal>
    </>
  );
};
