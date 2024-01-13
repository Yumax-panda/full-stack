import { z } from 'zod'

export const updateUserSchema = z.object({
  id: z.string().refine(Boolean),
  location: z.string().nullable(),
  organization: z.string().nullable(),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema>
