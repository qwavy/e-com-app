import { countries } from '@features/registration-user/contracts/countries';
import { shippingAddressSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Select, TextInput } from '@mantine/core';
import { ShippingAddress } from '@shared/types/customerTypes';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const UpdateShippingAddressForm = () => {
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

  const updateAddress: SubmitHandler<ShippingAddress> = async (data) => {
    console.log(data, '***********');
  };
  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(updateAddress)}>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Street"
            {...register('street')}
            placeholder="Enter your street"
            error={errors.street && errors.street.message}
            style={{ marginBottom: '2rem' }}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="City"
            {...register('city')}
            placeholder="Enter your city"
            error={errors.city && errors.city.message}
            style={{ marginBottom: '2rem' }}
          />
        </div>

        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Postal Code"
            {...register('postalCode')}
            placeholder="Enter your postal code"
            error={errors.postalCode && errors.postalCode.message}
            style={{ marginBottom: '2rem' }}
          />
        </div>

        <Select
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Country"
          placeholder="Enter your country"
          data={countries}
          {...register('country')}
          onChange={(value) => {
            setValue('country', value as string);
            clearErrors('country');
          }}
          error={errors.country && errors.country.message}
          style={{ marginBottom: '2rem' }}
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
};
