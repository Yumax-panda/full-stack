import { z } from 'zod'

const removeWhitespace = (v: string) => v.replace(/\s/g, '')
const hasContent = (v: string) => removeWhitespace(v).length > 0

export const createTagSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(10)
    .refine((v) => {
      const actualLength = v.trim().length
      if (!hasContent(v)) return false
      return actualLength > 0 && actualLength <= 10
    })
    .transform((v) => v.trim()),
  brief: z
    .string()
    .max(20)
    .nullable()
    .transform((v) => {
      if (v === null) return null
      const trimmed = v.trim()
      return hasContent(trimmed) ? trimmed : null
    }),
  color: z.string().min(7).max(7),
})

export type CreateTag = z.infer<typeof createTagSchema>

export const updateTagSchema = z.object({
  id: z.string(),
  ...createTagSchema.shape,
})

export type UpdateTag = z.infer<typeof updateTagSchema>
