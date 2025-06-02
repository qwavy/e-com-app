import { userStore } from '@entities/user/model/user-store';
import { countries } from '@features/registration-user/contracts/countries';
import { shippingAddressSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Select, TextInput } from '@mantine/core';
import { ShippingAddress } from '@shared/types/customerTypes';
import { message } from '@shared/utils/message';
import { updateAddressAction } from '@widgets/profile/model/updateAddress-action';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddressProps {
  address: ShippingAddress;
  isDefault: boolean;
  close: () => void;
}

export const UpdateShippingAddressForm = observer(({ address, close, isDefault }: AddressProps) => {
  const { user } = userStore;
  // const isDefaultBillingAddress = user?.defaultBillingAddressId;
  const [defaultAddress, setDefaultAddress] = useState(isDefault);
  const [city, setCity] = useState(address?.city);
  const [country, setCountry] = useState(address?.country);
  const [postalCode, setPostalCode] = useState(address?.postalCode);
  const [streetName, setStreetName] = useState(address?.streetName);

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

  const addressId = address?.id;
  const version = user?.version;
  const userId = user?.id;

  const updateAddress: SubmitHandler<ShippingAddress> = async (data) => {
    const response = await updateAddressAction({ data, addressId, userId, version });
    if (response.error) {
      message({ message: response.error, title: 'Error' });
    } else {
      message({ message: 'Your address was successfully changed!' });
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
            error={errors.streetName && errors.streetName.message}
            style={{ marginBottom: '2rem' }}
            value={streetName}
            onChange={(e) => {
              clearErrors('streetName');
              setStreetName(e.target.value);
            }}
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
            value={city}
            onChange={(e) => {
              clearErrors('city');
              setCity(e.target.value);
            }}
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
            value={postalCode}
            onChange={(e) => {
              clearErrors('postalCode');
              setPostalCode(e.target.value);
            }}
          />
        </div>

        <Select
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Country"
          placeholder="Enter your country"
          data={countries}
          defaultValue={country}
          {...register('country')}
          onChange={(value) => {
            setValue('country', value as string);
            clearErrors('country');
            setCountry(value as string);
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
});
