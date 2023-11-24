export type ArticleType = 'qiita' | 'zenn'

export type Article = {
  type: ArticleType
  title: string
  likes: number
  url: string
  createdAt: Date
}
