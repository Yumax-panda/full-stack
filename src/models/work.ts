import { z } from 'zod'

import { titleMaxLength } from '@/constants/works'

// TODO: サーバー側のバリデーションをテスト
// NOTE: for server isEmptyがクライアント専用なので、サーバー側のバリデーションを用意する。
//       認証付けてサイト内のリクエストしか通さないので、サーバー側のバリデーションは少し緩くても問題ないかも
export const updateWorkInServer = z.object({
  id: z.string(),
  userId: z.string(),
  pinned: z.boolean(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  thumbnail: z.string().nullable(),
  isPrivate: z.boolean(),
})

export type UpdateWorkInServer = z.infer<typeof updateWorkInServer>

// for client
export const thumbnailSchema = z
  .string()
  .nullable()
  .transform((v) => (v?.trim().length ? v.trim() : null))

export const updateWorkCommonSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pinned: z.boolean(),
})

export const isEmpty = (html?: string | null) => {
  if (!html) return true
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return !tmp.textContent?.trim()
}

export const nonEmptyHtml = z
  .string()
  .refine((html) => !isEmpty(html), { message: '本文を入力してください。' })

export const NullishHtml = z.string().transform((v) => (isEmpty(v) ? null : v))

export const trimmedNullableTitle = z
  .string()
  .max(titleMaxLength, {
    message: `タイトルは${titleMaxLength}文字以内で入力してください。`,
  })
  .transform((v) => (v?.trim().length ? v.trim() : null))

export const nonEmptyTitle = z
  .string()
  .min(1, { message: 'タイトルを入力してください。' })
  .max(titleMaxLength, {
    message: `タイトルは${titleMaxLength}文字以内で入力してください。`,
  })
  .refine((v) => v.trim(), { message: 'タイトルを入力してください。' })
  .transform((v) => v.trim())

export const privateContentSchema = z.object({
  title: trimmedNullableTitle,
  content: NullishHtml,
  thumbnail: thumbnailSchema,
  isPrivate: z.literal(true),
})

export const publicContentSchema = z.object({
  title: nonEmptyTitle,
  content: nonEmptyHtml,
  thumbnail: thumbnailSchema,
  isPrivate: z.literal(false),
})

export const privateWorkSchema =
  updateWorkCommonSchema.merge(privateContentSchema)

export const publicWorkSchema =
  updateWorkCommonSchema.merge(publicContentSchema)

export const updateWorkSchema = z.union([privateWorkSchema, publicWorkSchema])

export type UpdateWork = z.infer<typeof updateWorkSchema>
