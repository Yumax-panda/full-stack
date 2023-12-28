import type { Provider } from '@prisma/client'

export type NoteArticle = {
  provider: `NOTE`
  publishedAt: string
  noteUrl: string
}

export type ZennArticle = {
  provider: `ZENN`
  created_at: string
  path: string
}

export type QiitaArticle = {
  provider: `QIITA`
  created_at: string
  url: string
}

export type Article = {
  provider: Provider
  publishedAt: string
  articleUrl: string
}
