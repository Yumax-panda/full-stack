import { z } from 'zod'

export const updateArticleTokenSchema = z.object({
  userId: z.string(),
  provider: z.union([z.literal(`NOTE`), z.literal(`ZENN`), z.literal(`QIITA`)]),
  token: z.string().nullable(),
})

export type UpdateArticleToken = z.infer<typeof updateArticleTokenSchema>
