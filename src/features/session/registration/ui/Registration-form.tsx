import { schema } from '../../contracts/registartion-schema';
import style from './Registration-form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Button, Checkbox, PasswordInput, Select, Text, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
// eslint-disable-next-line sort-imports
import { useState } from 'react';
// eslint-disable-next-line sort-imports
import { CountryEnum } from '../../contracts/registartion-schema';
import { countries } from '@features/session/contracts/countries';
// eslint-disable-next-line sort-imports
import { DateInput } from '@mantine/dates';
import { registerAction } from '../model/model';
// eslint-disable-next-line sort-imports
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export interface RegistrationFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  date: string;
  street: string;
  city: string;
  postalCode: string;
  country: typeof CountryEnum._type;
  defaultAddress: boolean;
}

export const RegistrationForm = () => {
  const [defaultAddress, setDefaultAddress] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const signin: SubmitHandler<RegistrationFields> = async (data) => {
    const response = await registerAction(data);
    if (response.error) {
      notifications.show({
        position: 'top-center',
        title: 'Error',
        autoClose: 3000,
        message: response.error,
        color: 'red',
      });
    } else {
      notifications.show({
        position: 'top-center',
        autoClose: 3000,
        message: 'Registration successful!',
        color: 'green',
      });
      navigate('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(signin)} className={style.form}>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Email"
            {...register('email')}
            placeholder="Enter your email"
            error={errors.email && errors.email.message}
          />
        </div>
        <div>
          <PasswordInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Password"
            {...register('password')}
            placeholder="Enter your password"
            error={errors.password && errors.password.message}
            type="password"
          />
        </div>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="First name"
            {...register('firstName')}
            placeholder="Enter your first name"
            error={errors.firstName && errors.firstName.message}
          />
        </div>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Last name"
            {...register('lastName')}
            placeholder="Enter your last name"
            error={errors.lastName && errors.lastName.message}
          />
        </div>
        <div>
          <DateInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Date of birth"
            placeholder="Select date of birth"
            {...register('date')}
            onChange={(value) => setValue('date', value || '')}
            error={errors.date && errors.date.message}
          />
        </div>

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
          defaultValue={countries[0]}
          data={countries}
          {...register('country')}
          onChange={(value) => setValue('country', value as (typeof CountryEnum)['_type'])}
          error={errors.country && errors.country.message}
        />

        <Checkbox
          label="Set as default address"
          {...register('defaultAddress')}
          onChange={(event) => setDefaultAddress(event.currentTarget.checked)}
          checked={defaultAddress}
        />

        <Button fullWidth type="submit" variant="outline">
          Sign Up
        </Button>

        <Text>
          Already have an account?
          <Anchor href={'/login'} c="blue" style={{ marginLeft: '0.25rem' }}>
            Sign In here
          </Anchor>
        </Text>
      </form>
    </>
  );
};
