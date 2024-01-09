import { z } from 'zod'

// TODO: エディタへ何も入力しないと必ずエラーになる不具合を修正する
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

export const nonEmptyHtml = z.string().refine((html) => !isEmpty(html))

export const NullishHtml = z.string().transform((v) => (isEmpty(v) ? null : v))

export const trimedNullishTitle = z
  .string()
  .max(100)
  .transform((v) => (v?.trim().length ? v.trim() : null))

export const nonEmptyTitle = z
  .string()
  .min(1)
  .max(100)
  .refine((v) => v.trim())
  .transform((v) => v.trim())

export const privateContentSchema = z.object({
  title: trimedNullishTitle,
  content: NullishHtml,
  thumnail: z.string().nullable(),
  isPrivate: z.literal(true),
})

export const publicContentSchema = z.object({
  title: nonEmptyTitle,
  content: nonEmptyHtml,
  thumnail: z.string().nullable(),
  isPrivate: z.literal(false),
})

export const privateWorkSchema =
  updateWorkCommonSchema.merge(privateContentSchema)

export const publicWorkSchema =
  updateWorkCommonSchema.merge(publicContentSchema)

export const updateWorkSchema = z.union([privateWorkSchema, publicWorkSchema])

export type UpdateWork = z.infer<typeof updateWorkSchema>
