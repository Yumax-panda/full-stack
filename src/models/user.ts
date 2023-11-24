import type { SkillId } from './skill'

export type User = {
  id: string
  name: string
  comment?: string
  location?: string
  organization?: string
  skills: SkillId[]
}
