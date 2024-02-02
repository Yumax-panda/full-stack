import { z } from 'zod'

export const createTagSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(10)
    .refine((v) => v.trim().length > 0),
  brief: z
    .string()
    .nullable()
    .transform((v) => v?.trim() ?? v),
  color: z.string().min(7).max(7),
})

export type CreateTag = z.infer<typeof createTagSchema>
