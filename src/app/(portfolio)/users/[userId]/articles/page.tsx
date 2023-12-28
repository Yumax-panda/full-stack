import { getArticlesByUserId } from '@/usecase/article'

import { ArticleSection } from './_components/ArticleSection'

export default async function Article({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const articles = await getArticlesByUserId(userId)

  return <ArticleSection articles={articles} />
}
