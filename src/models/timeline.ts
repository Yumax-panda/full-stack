import type { Spanned } from './common'
import type { UserId } from './user'

export type Timeline = Spanned<{
  id: number
  userId: UserId
  organization: string
  description: string
}>
