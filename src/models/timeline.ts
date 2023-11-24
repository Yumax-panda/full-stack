import type { Spanned } from './common'

export type Timeline = Spanned<{
  id: string
  userId: string
  organization: string
  description: string
}>
