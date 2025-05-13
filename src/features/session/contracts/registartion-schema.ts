import { countries } from './countries';
import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;
const MIN_YEARS = 8;

const isAtLeast13 = (dateOfBirth: string) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return age - 1;
  }

  return age;
};

export const schema = z.object({
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
  firstName: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'Name must contain at least one character and no special characters or numbers',
  }),
  lastName: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'Name must contain at least one character and no special characters or numbers',
  }),
  date: z.string().refine((dob) => isAtLeast13(dob) >= MIN_YEARS, {
    message: 'You should be older than 13 years old',
  }),
  street: z.string().min(1, {
    message: 'Street must contain at least one character',
  }),
  city: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'City must contain at least one character and no special characters or numbers',
  }),
  postalCode: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'Postal code must contain at least one character and no special characters or numbers',
  }),
  country: z.enum(countries),
  defaultAddress: z.boolean(),
});
