import { z } from 'zod'

import type { Skill, Tag } from '@prisma/client'

export type SkillWithTags = Omit<Skill, 'tags'> & {
  tags: Tag[]
}

export const updateSkillSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
  level: z.number().min(0).max(3),
  image: z.string().nullish(),
})

export type UpdateSkillProps = z.infer<typeof updateSkillSchema> & {
  id: string
}

export const createSkillSchema = updateSkillSchema

export type CreateSkillProps = z.infer<typeof createSkillSchema>
