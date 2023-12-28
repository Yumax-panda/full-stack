import type { Tag, Skill } from '@prisma/client'

export type SkillWithTags = Omit<Skill, 'tags'> & {
  tags: Tag[]
}
