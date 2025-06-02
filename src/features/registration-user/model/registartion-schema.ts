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

export const passwordSchema = z.object({
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

export const newPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter (A-Z)' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter (a-z)' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit (0-9)' })
    .refine((val) => val === val.trim(), {
      message: 'Password must not contain leading or trailing whitespace',
    }),
});

export const personalInformationSchema = z.object({
  email: z.string().email({
    message:
      'Email address must be properly formatted (user@example.com) and not contain leading or trailing whitespace',
  }),
  firstName: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'Name must contain at least one character (A-Z, a-z) and no special characters or numbers',
  }),
  lastName: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'Name must contain at least one character (A-Z, a-z) and no special characters or numbers',
  }),
  dateOfBirth: z.string().refine((dob) => isAtLeast13(dob) >= MIN_YEARS, {
    message: 'You should be older than 13 years old',
  }),
});

export const shippingAddressSchema = z.object({
  streetName: z.string().min(1, {
    message: 'Street must contain at least one character (A-Z, a-z)',
  }),
  city: z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
    message: 'City must contain at least one character (A-Z, a-z) and no special characters or numbers',
  }),
  postalCode: z
    .string()
    .min(1, {
      message: 'The postal code must contain at least one character',
    })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'The postal code must contain numbers or letters (A-Z, a-z).',
    }),
  country: z.string().nonempty('Select your country from the list'),
  defaultAddress: z.boolean().optional(),
  billingAddress: z.boolean().optional(),
  addressType: z.string().optional(),
});

export const billingAddressSchema = (isBillingAddress: boolean) =>
  z.object({
    billingStreet: !isBillingAddress
      ? z.string().min(1, {
          message: 'Street must contain at least one character (A-Z, a-z)',
        })
      : z.string().optional(),
    billingCity: !isBillingAddress
      ? z.string().regex(/^(?=.*[a-zA-Z])[a-zA-Z]*$/, {
          message: 'City must contain at least one character (A-Z, a-z) and no special characters or numbers',
        })
      : z.string().optional(),
    billingPostalCode: !isBillingAddress
      ? z
          .string()
          .min(1, {
            message: 'The postal code must contain at least one character',
          })
          .regex(/^[a-zA-Z0-9]*$/, {
            message: 'The postal code must contain numbers or letters (A-Z, a-z).',
          })
      : z.string().optional(),
    billingCountry: !isBillingAddress
      ? z.string().nonempty('Select your country from the list')
      : z.string().optional(),
  });

const combinedSchema = passwordSchema.merge(shippingAddressSchema).merge(personalInformationSchema);

export const schema = (isBillingAddress: boolean) => {
  return combinedSchema.merge(billingAddressSchema(isBillingAddress));
};

export const addressSchema = (isBillingAddress: boolean) => {
  return shippingAddressSchema.merge(billingAddressSchema(isBillingAddress));
};

export const changePasswordSchema = passwordSchema.merge(newPasswordSchema);
