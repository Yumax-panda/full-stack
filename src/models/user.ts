import type { Id } from './common'
import type { SkillId } from './skill'

export type UserId = Id<number, 'User'>
export type User = {
  id: UserId
  name: string
  password: string
  comment?: string
  location?: string
  organization?: string
}
