import type { Spanned } from './common'
import type { UserId } from './user'

export type Work = Spanned<{
  id: number
  userId: UserId
  image?: string
  url?: string
  organization: string
  title: string
  description: string
}>
