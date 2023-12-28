import { getArticlesByUserId } from '@/usecase/article'

export default async function Article({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const articles = await getArticlesByUserId(userId)
  console.log(articles)

  return (
    <div>
      <h1>Article</h1>
    </div>
  )
}
