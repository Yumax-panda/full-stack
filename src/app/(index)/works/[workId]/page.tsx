import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getWorkById } from '@/repository/work'

import { Content } from './_components/Content'

export default async function WorkDetailPage({
  params: { workId },
}: {
  params: {
    workId: string
  }
}) {
  const session = await getSession()
  const work = await getWorkById(workId)

  if (!work) {
    return notFound()
  }

  const isMyWork = session?.user?.id === work.userId

  if (work.isPrivate && !isMyWork) {
    return notFound()
  }

  return <Content {...work} />
}
