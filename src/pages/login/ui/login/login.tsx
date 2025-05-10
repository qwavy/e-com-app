import { Button, Input } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // ignore
    data.email = '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')}></Input>
      <Input {...register('password')}></Input>
      <Button>click</Button>
    </form>
  );
};
