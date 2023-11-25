import type { UserId } from './user'

export type ProviderType = 'qiita' | 'zenn'
export type Provider = {
  id: number
  userId: UserId
  type: ProviderType
  token: string
}
