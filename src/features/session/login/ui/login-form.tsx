import { schema } from '@features/session/contracts/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginAction } from '../model/model';
import style from './login-form.module.css';

interface FormFields {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const login: SubmitHandler<FormFields> = async (data) => {
    const response = await loginAction(data.email, data.password);
    if (response.error) {
      notifications.show({
        position: 'top-center',
        title: 'Error',
        autoClose: 3000,
        message: response.error,
        color: 'red',
      });

      setError('email', { message: response.error });
      setError('password', { message: response.error });
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
    </>
  );
};
