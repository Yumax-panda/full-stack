import type { Spanned } from './common'

export type Work = Spanned<{
  id: string
  userId: string
  image?: string
  url?: string
  organization: string
  title: string
  description: string
}>
