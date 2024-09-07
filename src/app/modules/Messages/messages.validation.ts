import { z } from 'zod';

const createMessageValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    contact: z.string(),
    message: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

export const MessagesValidations = {
  createMessageValidationSchema,
};
