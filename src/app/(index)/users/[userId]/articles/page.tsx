import { AutoStoriesOutlined } from '@mui/icons-material'

import { Empty } from '../_components/Empty'

import { ArticleSection } from './_components/ArticleSection'

import { getArticlesByUserId } from '@/usecase/article'

export default async function Article({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const articles = await getArticlesByUserId(userId)

  if (articles.length === 0) {
    return (
      <Empty Icon={AutoStoriesOutlined} title='まだ記事が登録されていません' />
    )
  }

  return <ArticleSection articles={articles} />
}
