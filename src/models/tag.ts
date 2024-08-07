import { z } from 'zod'

const removeWhitespace = (v: string) => v.replace(/\s/g, '')
const hasContent = (v: string) => removeWhitespace(v).length > 0

export const createTagSchema = z.object({
  name: z
    .string()
    .min(1, 'タグ名を入力してください')
    .max(10, 'タグ名は10文字以内で入力してください')
    .refine((v) => {
      const actualLength = v.trim().length
      if (!hasContent(v)) return false
      return actualLength > 0 && actualLength <= 10
    })
    .transform((v) => v.trim()),
  brief: z
    .string()
    .max(20, 'タグの説明は20文字以内で入力してください')
    .nullable()
    .transform((v) => {
      if (v === null) return null
      const trimmed = v.trim()
      return hasContent(trimmed) ? trimmed : null
    }),
  color: z
    .string()
    .min(7, 'カラーコードは#含めて7文字です')
    .max(7, 'カラーコードは#含めて7文字です'),
})

export type CreateTag = z.infer<typeof createTagSchema>

export const updateTagSchema = createTagSchema

export type UpdateTag = z.infer<typeof updateTagSchema>
