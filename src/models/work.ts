import { z } from 'zod'

import { titleMaxLength } from '@/constants/works'

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

export const nonEmptyHtml = z.string().refine((html) => !isEmpty(html))

export const NullishHtml = z.string().transform((v) => (isEmpty(v) ? null : v))

export const trimedNullableTitle = z
  .string()
  .max(titleMaxLength)
  .transform((v) => (v?.trim().length ? v.trim() : null))

export const nonEmptyTitle = z
  .string()
  .min(1)
  .max(titleMaxLength)
  .refine((v) => v.trim())
  .transform((v) => v.trim())

export const privateContentSchema = z.object({
  title: trimedNullableTitle,
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
