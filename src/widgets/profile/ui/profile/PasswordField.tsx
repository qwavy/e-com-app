import { changePasswordSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, PasswordInput } from '@mantine/core';
import { ChangePassword } from '@shared/types/customerTypes';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const ChangePasswordForm = () => {
  const [isEditable, setIsEditable] = useState(false);

  const bg = {
    input: {
      backgroundColor: isEditable ? '#FFFFFF' : '#DCDCDC',
      color: 'black',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const changePassword: SubmitHandler<ChangePassword> = async (data) => {
    setIsEditable(false);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(changePassword)}>
      <div>
        <PasswordInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="Password"
          {...register('password')}
          placeholder="Enter your current password"
          error={errors.password && errors.password.message}
          disabled={!isEditable}
          styles={!isEditable ? bg : undefined}
          type="password"
        />
      </div>
      <div>
        <PasswordInput
          w={{ base: 280, sm: 360, lg: 540 }}
          withAsterisk
          label="New Password"
          {...register('newPassword')}
          placeholder="Enter new password"
          error={errors.newPassword && errors.newPassword.message}
          disabled={!isEditable}
          styles={!isEditable ? bg : undefined}
          type="password"
        />
      </div>

      <Group mt="md">
        <Button type="button" onClick={() => setIsEditable(true)}>
          Edit
        </Button>
        <Button type="submit" disabled={!isEditable}>
          Save
        </Button>
      </Group>
    </form>
  );
};
