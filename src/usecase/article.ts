import type { Provider } from '@prisma/client'
import type { Article } from '@/models/article'

type GetFetcher = (provider: Provider) => Fetcher
type Fetcher = (token: string) => Promise<Article[]>
