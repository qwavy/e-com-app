import { Select, TextInput } from '@mantine/core';

import { countries } from '../contracts/countries';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ShippingAddressFields = ({ register, errors, setValue, clearErrors }: any) => {
  return (
    <>
      <div>
        <TextInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Street"
          {...register('street')}
          placeholder="Enter your street"
          error={errors.street && errors.street.message}
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
      />
    </>
  );
};
