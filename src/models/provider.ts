export type ProviderType = 'qiita' | 'zenn'
export type Provider = {
  id: string
  userId: string
  type: ProviderType
  token: string
}
