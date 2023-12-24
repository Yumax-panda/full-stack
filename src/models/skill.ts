import type { Tag } from './tag'

export type Skill = {
  id: string
  userId: string
  name: string
  image: string
  level: number
  tags: Tag[]
}
