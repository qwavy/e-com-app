import { personalInformationSchema } from '@features/registration-user/model/registartion-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { PersonalInfo } from '@shared/types/customerTypes';
import { updatePersonalInfoAction } from '@widgets/profile/model/updatePersonalInfo-action';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const PersonalInformationForm = ({ customer }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState(customer?.firstName);
  const [lastName, setLastName] = useState(customer?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(customer?.dateOfBirth);
  const [email, setEmail] = useState(customer?.email);

  const bg = {
    input: {
      backgroundColor: isEditable ? '#FFFFFF' : '#DCDCDC',
      color: 'black',
    },
  };

  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInformationSchema),
    mode: 'onChange',
  });

  const id = customer.id;
  const version = customer.version;

  const changePersonalInfo: SubmitHandler<PersonalInfo> = async (data) => {
    setIsEditable(false);
    const a = await updatePersonalInfoAction({ data, id, version });
    console.log(a, '***********');
  };

  return (
    <>
      <form onSubmit={handleSubmit(changePersonalInfo)}>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="First name"
            {...register('firstName')}
            error={errors.firstName && errors.firstName.message}
            disabled={!isEditable}
            styles={!isEditable ? bg : undefined}
            placeholder={!isEditable ? '' : 'Enter your first name'}
            value={firstName}
            onChange={(e) => {
              clearErrors('firstName');
              trigger('firstName');
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Last name"
            {...register('lastName')}
            error={errors.lastName && errors.lastName.message}
            disabled={!isEditable}
            styles={!isEditable ? bg : undefined}
            placeholder={!isEditable ? '' : 'Enter your last name'}
            value={lastName}
            onChange={(e) => {
              clearErrors('lastName');
              trigger('lastName');
              setLastName(e.target.value);
            }}
          />
        </div>
        <div>
          <DateInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Date of birth"
            {...register('dateOfBirth')}
            onChange={(value) => {
              setValue('dateOfBirth', value || '');
              clearErrors('dateOfBirth');
              trigger('dateOfBirth');
              setDateOfBirth(value || undefined);
            }}
            value={dateOfBirth}
            error={errors.dateOfBirth && errors.dateOfBirth.message}
            disabled={!isEditable}
            styles={!isEditable ? bg : undefined}
            placeholder={!isEditable ? '' : 'Select date of birth'}
          />
        </div>
        <div>
          <TextInput
            w={{ base: 280, sm: 360, lg: 540 }}
            withAsterisk
            label="Email"
            {...register('email')}
            error={errors.email && errors.email.message}
            disabled={!isEditable}
            styles={!isEditable ? bg : undefined}
            placeholder={!isEditable ? '' : 'Enter your email'}
            value={email}
            onChange={(e) => {
              clearErrors('email');
              trigger('email');
              setEmail(e.target.value);
            }}
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
    </>
  );
};
