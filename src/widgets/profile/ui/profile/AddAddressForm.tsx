import { userStore } from '@entities/user/model/user-store';
import { countries } from '@features/registration-user/contracts/countries';
import { shippingAddressSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ShippingAddress } from '@shared/types/customerTypes';
import { addAddressAction } from '@widgets/profile/model/addAddress-action';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddressProps {
  close: () => void;
}

export const AddAddressForm = observer(({ close }: AddressProps) => {
  const { user } = userStore;
  const [defaultAddress, setDefaultAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    mode: 'onChange',
  });

  const version = user?.version;
  const id = user?.id;

  const updateAddress: SubmitHandler<ShippingAddress> = async (data) => {
    const response = await addAddressAction({ data, id, version });
    if (response.error) {
      notifications.show({
        position: 'top-center',
        title: 'Error',
        autoClose: 8000,
        message: response.error,
        color: 'red',
      });
    } else {
      notifications.show({
        position: 'top-center',
        autoClose: 3000,
        message: 'Your new address was successfully add!',
        color: 'green',
      });
      close();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateAddress)}>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Street"
            {...register('streetName')}
            placeholder="Enter your street"
            style={{ marginBottom: '2rem' }}
            error={errors.streetName && errors.streetName.message}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="City"
            {...register('city')}
            placeholder="Enter your city"
            style={{ marginBottom: '2rem' }}
            error={errors.city && errors.city.message}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Postal Code"
            {...register('postalCode')}
            placeholder="Enter your postal code"
            style={{ marginBottom: '2rem' }}
            error={errors.postalCode && errors.postalCode.message}
          />
        </div>

        <Select
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Country"
          placeholder="Enter your country"
          style={{ marginBottom: '2rem' }}
          data={countries}
          {...register('country')}
          onChange={(value) => {
            setValue('country', value as string);
            clearErrors('country');
          }}
          error={errors.country && errors.country.message}
        />

        <Checkbox
          label="Set as default address"
          {...register('defaultAddress')}
          onChange={(e) => setDefaultAddress(e.currentTarget.checked)}
          checked={defaultAddress}
          style={{ marginBottom: '2rem' }}
        />

        <Button type="submit">Save</Button>
      </form>
    </>
  );
});
