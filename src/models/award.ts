export type AwardType = 'award' | 'certificate'
export type Award = {
  id: string
  userId: string
  image?: string
  url?: string
  type: AwardType
  title: string
  description: string
  at: Date
}
