import { z } from 'zod'

// TODO: エディタへ何も入力しないと必ずエラーになる不具合を修正する
export const updateWorkCommonSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pinned: z.boolean(),
})

export const privateContentSchema = z.object({
  title: z.string().min(1).max(100).nullish(),
  content: z.string().min(1).max(5000).nullish(),
  thumnail: z.string().nullish(),
  isPrivate: z.literal(true),
})

export const privateWorkSchema =
  updateWorkCommonSchema.merge(privateContentSchema)

export const publicContentSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(5000),
  thumnail: z.string().nullish(),
  isPrivate: z.literal(false),
})

export const publicWorkSchema =
  updateWorkCommonSchema.merge(publicContentSchema)

export const updateWorkSchema = z
  .union([privateWorkSchema, publicWorkSchema])
  .refine((data) => {
    if (data.isPrivate) {
      return privateWorkSchema.safeParse(data).success
    }

    return publicWorkSchema.safeParse(data).success
  })

export type UpdateWork = z.infer<typeof updateWorkSchema>
