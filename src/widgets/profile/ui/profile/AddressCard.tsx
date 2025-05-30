import { userStore } from '@entities/user/model/user-store';
import { Card, Modal, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShippingAddress } from '@shared/types/customerTypes';
import { message } from '@shared/utils/message';
import { deleteAddressAction } from '@widgets/profile/model/deleteAddress-action';
import { observer } from 'mobx-react-lite';

import { UpdateShippingAddressForm } from './UpdateShippingAddressForm';

interface AddressProps {
  address: ShippingAddress;
}

export const AddressCard = observer(({ address }: AddressProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = userStore;
  const addressId = address?.id ?? '';
  const version = user?.version ?? 1;
  const id = user?.id ?? '';
  console.log(address.defaultAddress, '****');

  const deleteAddress = async () => {
    const response = await deleteAddressAction({ addressId, id, version });
    if (response.error) {
      message({ message: response.error, title: 'Error' });
    } else {
      message({ message: 'Your address was successfully deleted!' });
    }
  };
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: '#F8F8FF', height: '250px', width: '200px' }}
      >
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
        <Button variant="default" onClick={deleteAddress}>
          Delete Address
        </Button>
        <Modal size="auto" opened={opened} onClose={close} centered>
          <UpdateShippingAddressForm address={address} close={close} />
        </Modal>
      </Card>
    </>
  );
});
