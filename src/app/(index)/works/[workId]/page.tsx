import { notFound } from 'next/navigation'

import { getPublicWork } from '@/repository/work'

import { Content } from './_components/Content'

export default async function WorkDetailPage({
  params: { workId },
}: {
  params: {
    workId: string
  }
}) {
  const work = await getPublicWork(workId)
  if (!work) {
    return notFound()
  }

  return <Content {...work} />
}
