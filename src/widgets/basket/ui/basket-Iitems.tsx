import { BasketItem } from '@entities/basket/BasketItem';
import { basketStore } from '@entities/basket/basket-store';
import { getBasketItems } from '@entities/basket/get-basket-items';
import { clearBasket } from '@entities/basket/get-basket-items';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const BasketItems = observer(() => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClear = async () => {
    await clearBasket();
    close();
  };

  useEffect(() => {
    getBasketItems().then(basketStore.setItems.bind(basketStore)).catch(console.error);
  }, []);

  return (
    <div>
      <Stack align="center" gap="md" p="md">
        <Text fw={700} size="xl">
          Total Price: {(basketStore.totalPrice / 100).toFixed(2)} USD
        </Text>
        <Button color="red" variant="outline" onClick={open}>
          🗑️ Clear Basket
        </Button>
      </Stack>
      {basketStore.items.map((item) => (
        <div key={item.id}>
          <BasketItem lineItemId={item.id} />
        </div>
      ))}

      <Modal opened={opened} onClose={close} title="Are you sure?">
        <Text>Do you really want to remove all items from your basket? This action cannot be undone.</Text>
        <Group mt="md" justify="flex-end">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleClear}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </div>
  );
});
