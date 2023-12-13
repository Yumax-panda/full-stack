import type { Id } from './common'

type NullString = {
  String: string | null
  Valid: boolean
}

export type UserId = Id<number, 'User'>
export type User = {
  id: UserId
  name: string
  email: string
}
