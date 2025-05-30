import { userStore } from '@entities/user/model/user-store';
import { changePasswordSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, PasswordInput } from '@mantine/core';
import { ChangePassword } from '@shared/types/customerTypes';
import { message } from '@shared/utils/message';
import { changePasswordAction } from '@widgets/profile/model/changePassword-action';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const UpdatePasswordForm = observer(() => {
  const { user } = userStore;
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
    reset,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const changePassword: SubmitHandler<ChangePassword> = async (data) => {
    const response = await changePasswordAction({
      newPassword: data.newPassword,
      currentPassword: data.password,
      id: user?.id ?? '',
      version: user?.version ?? 1,
    });
    setIsEditable(false);
    if (response.error) {
      message({ message: response.error, title: 'Error' });
    } else {
      message({ message: 'Your password was successfully changed!' });
      reset();
    }
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
});
