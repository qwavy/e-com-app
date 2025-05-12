import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

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
});
