import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

/* Схема для обновлениях данных профиля */
export const formUpdateProfile = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormUpdateProfile = z.infer<typeof formUpdateProfile>;
