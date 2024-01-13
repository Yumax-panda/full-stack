import type { Tag, Skill } from '@prisma/client'
import { z } from 'zod'

export type SkillWithTags = Omit<Skill, 'tags'> & {
  tags: Tag[]
}

export const updateSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagIds: z.array(z.string()),
  level: z.number().min(0).max(3),
  image: z.string().nullable(),
  userId: z.string(),
})

export type UpdateSkillProps = z.infer<typeof updateSkillSchema>
