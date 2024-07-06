import { fetchOgp } from '@/lib/ogp'
import type {
  Article,
  NoteArticleResponse,
  QiitaArticleResponse,
  ZennArticleResponse,
} from '@/models/article'
import { getArticleTokenByUserId } from '@/repository/articleToken'
import type { ArticleToken, Provider } from '@prisma/client'

type Fetcher = (token: ArticleToken) => Promise<Article[]>
export type ArticleWithOgp = Article & { ogp?: string }

const fetchNoteArticles: Fetcher = async (token) => {
  const url = `https://note.com/api/v2/creators/${token.token}/contents?kind=note`
  const res = await fetch(url)
  const json = (await res.json()) as NoteArticleResponse
  return json.data.contents.map((article) => ({
    provider: `NOTE`,
    publishedAt: article.publishAt,
    articleUrl: article.noteUrl,
  }))
}

const fetchZennArticles: Fetcher = async (token) => {
  const url = `https://zenn.dev/api/articles?username=${token.token}&order=latest`
  const res = await fetch(url)
  const json = (await res.json()) as ZennArticleResponse
  return json.articles.map((article) => ({
    provider: `ZENN`,
    publishedAt: article.published_at,
    articleUrl: `https://zenn.dev/${article.path}`,
  }))
}

const fetchQiitaArticles: Fetcher = async (token) => {
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

const fetchArticles = async (tokens: ArticleToken[]): Promise<Article[]> => {
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

export async function getArticlesByUserId(
  userId: string,
): Promise<ArticleWithOgp[]> {
  const tokens = await getArticleTokenByUserId(userId)
  const articles = await fetchArticles(tokens)
  return await Promise.all(
    articles.map(async (article) => {
      const ogp = await fetchOgp(article.articleUrl)
      return { ...article, ogp }
    }),
  )
}

export function getProviderNick(provider: Provider): string {
  const nicknames: Record<Provider, string> = {
    NOTE: 'Note',
    ZENN: 'Zenn',
    QIITA: 'Qiita',
  }
  return nicknames[provider]
}
