import { userStore } from '@entities/user/model/user-store';
import { countries } from '@features/registration-user/contracts/countries';
import { Card, Modal, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShippingAddress } from '@shared/types/customerTypes';
import { message } from '@shared/utils/message';
import { deleteAddressAction } from '@widgets/profile/model/deleteAddress-action';
import { observer } from 'mobx-react-lite';

import { UpdateShippingAddressForm } from './UpdateAddressForm';

function findCountryName(countryCode: string) {
  return countries.find((c) => c.value === countryCode)?.label;
}

function findMatch(array: string[], search: string) {
  return array.find((str: string) => str === search);
}

interface AddressProps {
  address: ShippingAddress;
}

export const AddressCard = observer(({ address }: AddressProps) => {
  let isShipping;
  let isBilling;
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = userStore;
  const addressId = address?.id ?? '';
  const version = user?.version ?? 1;
  const id = user?.id ?? '';
  if (user?.shippingAddressIds) {
    isShipping = findMatch(user?.shippingAddressIds, addressId);
  }
  if (user?.billingAddressIds) {
    isBilling = findMatch(user?.billingAddressIds, addressId);
  }

  const isDefault = user?.defaultShippingAddressId === addressId || user?.defaultBillingAddressId ? true : false;
  const bg = isDefault ? '#A9A9A9' : '#F8F8FF';
  const color = isDefault ? '#F8F8FF' : '#A9A9A9';

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
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '300px',
          width: '220px',
          color: 'white',
          justifyContent: 'space-between',
          backgroundColor: bg,
        }}
      >
        <Text size="xl" fw={700} c={color}>
          {isShipping && 'Shipping Address'}
        </Text>
        <Text size="xl" fw={700} c={color}>
          {isBilling && 'Billing address'}
        </Text>
        <Text size="sm" mt="xs" c={color}>
          Postal code: {address.postalCode}
        </Text>
        <Text size="sm" mt="xs" c={color}>
          Country: {findCountryName(address.country)}
        </Text>
        <Text size="sm" mt="xs" c={color}>
          City: {address.city}
        </Text>
        <Text size="sm" mt="xs" c={color}>
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
