import { z } from 'zod'

export const updateArticleTokenSchema = z
  .object({
    qiita: z
      .string()
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    zenn: z
      .string()
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    note: z
      .string()
      .nullable()
      .transform((v) => (v === '' ? null : v)),
  })
  .partial()

export type UpdateArticleToken = {
  provider: `NOTE` | `ZENN` | `QIITA`
  token: string | null
  userId: string
}
