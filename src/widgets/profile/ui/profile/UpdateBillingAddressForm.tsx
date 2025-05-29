import { countries } from '@features/registration-user/contracts/countries';
import { Select, TextInput } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateBillingAddressForm = ({ register, errors, setValue, clearErrors }: any) => {
  return (
    <>
      <div>
        <TextInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Street"
          {...register('billingStreet')}
          placeholder="Enter your street"
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
          error={errors.billingPostalCode && errors.billingPostalCode.message}
        />
      </div>
      <div>
        <Select
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Country"
          placeholder="Enter your country"
          data={countries}
          {...register('billingCountry')}
          onChange={(value) => {
            setValue('billingCountry', value as string);
            clearErrors('billingCountry');
          }}
          error={errors.billingCountry && errors.billingCountry.message}
        />
      </div>
    </>
  );
};
