import { schema } from '../../contracts/registartion-schema';
import style from './Registration-form.module.css';
// eslint-disable-next-line sort-imports
import { DateInput } from '@mantine/dates';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

interface RegistartionFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  date: string;
}

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegistartionFields>({
    resolver: zodResolver(schema),
  });

  const signin: SubmitHandler<RegistartionFields> = (data) => {
    console.log(data, isValid);
  };

  return (
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
          placeholder="Date of birth"
          {...register('date')}
          onChange={(value) => setValue('date', value)}
          error={errors.date && errors.date.message}
        />
      </div>

      <Button fullWidth type="submit" variant="outline">
        Sign In
      </Button>
    </form>
  );
};
//error={errors.date ? errors.date.message : null} // Ошибка, если есть
