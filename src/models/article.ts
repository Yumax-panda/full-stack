import type { Provider } from '@prisma/client'

export type NoteArticle = {
  provider: `NOTE`
  publishAt: string
  noteUrl: string
}

export type NoteArticleResponse = {
  data: {
    contents: NoteArticle[]
  }
}

export type ZennArticle = {
  provider: `ZENN`
  published_at: string
  path: string
}

export type ZennArticleResponse = {
  articles: ZennArticle[]
}

export type QiitaArticle = {
  provider: `QIITA`
  created_at: string
  url: string
}

export type QiitaArticleResponse = QiitaArticle[]

export type Article = {
  provider: Provider
  publishedAt: string
  articleUrl: string
}
