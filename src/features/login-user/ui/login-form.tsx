import { loginAction } from '../model/login-action';
import { schema } from '../model/login-schema';
import style from './login-form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const login: SubmitHandler<FormFields> = (data) => {
    loginAction(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(login)} className={style.form}>
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
