import { z } from 'zod'

export const updateUserSchema = z.object({
  id: z.string().refine(Boolean),
  name: z
    .string()
    .min(1, '1文字以上で名前を入力してください')
    .max(30, '名前は30文字までです')
    .transform((v) => v.trim()),
  location: z.string().nullable(),
  organization: z.string().nullable(),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema>
