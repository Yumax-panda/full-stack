import type { UserId } from './user'

export type AwardType = 'award' | 'certificate'
export type Award = {
  id: number
  userId: UserId
  image?: string
  url?: string
  type: AwardType
  title: string
  description: string
  at: Date
}
