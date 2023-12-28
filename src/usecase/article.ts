import type { ArticleToken } from '@prisma/client'
import type {
  Article,
  NoteArticleResponse,
  ZennArticleResponse,
  QiitaArticleResponse,
} from '@/models/article'
import type { Provider } from '@prisma/client'

type Fetcher = (token: ArticleToken) => Promise<Article[]>

export const fetchNoteArticles: Fetcher = async (token) => {
  const url = `https://note.com/api/v2/creators/${token.token}/contents?kind=note`
  const res = await fetch(url)
  const json = (await res.json()) as NoteArticleResponse
  return json.data.contents.map((article) => ({
    provider: `NOTE`,
    publishedAt: article.publishedAt,
    articleUrl: article.noteUrl,
  }))
}

export const fetchZennArticles: Fetcher = async (token) => {
  const url = `https://api.zenn.dev/articles?username=${token.token}?order=latest`
  const res = await fetch(url)
  const json = (await res.json()) as ZennArticleResponse
  return json.articles.map((article) => ({
    provider: `ZENN`,
    publishedAt: article.created_at,
    articleUrl: `https://zenn.dev/${article.path}`,
  }))
}

export const fetchQiitaArticles: Fetcher = async (token) => {
  const url = `https://qiita.com/api/v2/authenticated_user/items`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  })
  const json = (await res.json()) as QiitaArticleResponse
  return json.map((article) => ({
    provider: `QIITA`,
    publishedAt: article.created_at,
    articleUrl: article.url,
  }))
}

export const fetchArticles = async (
  tokens: ArticleToken[],
): Promise<Article[]> => {
  const fetchers: Record<Provider, Fetcher> = {
    NOTE: fetchNoteArticles,
    ZENN: fetchZennArticles,
    QIITA: fetchQiitaArticles,
  }

  const articles = await Promise.all(
    tokens.map(async (token) => {
      const fetcher = fetchers[token.provider]
      return await fetcher(token)
    }),
  )

  return articles.flat()
}
