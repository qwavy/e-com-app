import style from './login.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  email: string;
  password: string;
}

const MIN_PASSWORD_LENGTH = 8;

const schema = z.object({
  email: z.string().email({
    message:
      'Email address must be properly formatted (user@example.com) and not contain leading or trailing whitespace',
  }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter (A-Z)' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter (a-z)' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit (0-9)' })
    .refine((val) => val === val.trim(), {
      message: 'Password must not contain leading or trailing whitespace',
    }),
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
        <PasswordInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Password"
          {...register('password')}
          placeholder="Enter your password"
          description="Password field"
          error={errors.password && errors.password.message}
          type="password"
        />
      </div>

      <Button loading={isSubmitting} fullWidth type="submit" variant="outline">
        Login
      </Button>
    </form>
  );
};
