import { z } from 'zod';
import { BloodGroup, Gender, UserRole, UserStatus } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum([...UserRole] as [string, ...string[]]),
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    img: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    img: z.string().optional(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const UserValidation = {
  createUserValidationSchema,
  changeStatusValidationSchema,
};
