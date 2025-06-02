import { userStore } from '@entities/user/model/user-store';
import { countries } from '@features/registration-user/contracts/countries';
import { billingAddressSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { BillingAddress } from '@shared/types/customerTypes';
import { addAddressAction } from '@widgets/profile/model/addAddress-action';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddressProps {
  close: () => void;
}

export const AddBillingAddressForm = observer(({ close }: AddressProps) => {
  const { user } = userStore;
  const [defaultAddress, setDefaultAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<BillingAddress>({
    resolver: zodResolver(billingAddressSchema(true)),
    mode: 'onChange',
  });

  const version = user?.version;
  const id = user?.id;

  const updateAddress: SubmitHandler<BillingAddress> = async (data) => {
    const data2 = {
      streetName: data.billingStreet,
      postalCode: data.billingPostalCode,
      city: data.billingCity,
      country: data.billingCountry,
      defaultAddress: data.defaultAddress,
    };

    const response = await addAddressAction({ data: data2, id, version, isBilling: true });
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
            {...register('billingStreet')}
            placeholder="Enter your street"
            style={{ marginBottom: '2rem' }}
            error={errors.billingStreet && errors.billingStreet.message}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="City"
            {...register('billingCity')}
            placeholder="Enter your city"
            style={{ marginBottom: '2rem' }}
            error={errors.billingCity && errors.billingCity.message}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Postal Code"
            {...register('billingPostalCode')}
            placeholder="Enter your postal code"
            style={{ marginBottom: '2rem' }}
            error={errors.billingPostalCode && errors.billingPostalCode.message}
          />
        </div>

        <Select
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Country"
          placeholder="Enter your country"
          style={{ marginBottom: '2rem' }}
          data={countries}
          {...register('billingCountry')}
          onChange={(value) => {
            setValue('billingCountry', value as string);
            clearErrors('billingCountry');
          }}
          error={errors.billingCountry && errors.billingCountry.message}
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
