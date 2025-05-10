import style from './login.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  email: string;
  password: string;
}

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 12;

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: 'Password is too short' })
    .max(MAX_PASSWORD_LENGTH, { message: 'Password is too long' }),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const login: SubmitHandler<FormFields> = (data) => {
    // ignore code
    data.email = '';
  };

  return (
    <form onSubmit={handleSubmit(login)} className={style.form}>
      <h1>Login</h1>
      <div>
        <TextInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Email"
          {...register('email')}
          placeholder="Enter your email"
          description="Email field"
          error={errors.email && errors.email.message}
        />
      </div>

      <div>
        <TextInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Password"
          {...register('password')}
          placeholder="Enter your password"
          description="Password field"
          error={errors.password && errors.password.message}
        />
      </div>

      <Button loading={isSubmitting} fullWidth type="submit" variant="outline">
        Login
      </Button>
    </form>
  );
};
