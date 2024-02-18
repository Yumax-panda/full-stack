import { z } from 'zod'

export const updateUserSchema = z.object({
  id: z.string().refine(Boolean),
  name: z
    .string()
    .min(1, '1文字以上で名前を入力してください')
    .max(30, '名前は30文字までです')
    .transform((v) => v.trim()),
  location: z.string().max(100, '居住地は100文字までです').nullable(),
  organization: z.string().max(100, '所属は100文字までです').nullable(),
  bio: z.string().max(100, '自己紹介は100文字までです').nullable(),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema>
