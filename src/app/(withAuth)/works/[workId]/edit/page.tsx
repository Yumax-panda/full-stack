import { notFound } from 'next/navigation'

import { Editor } from './_components/Editor/Editor'
import { getMyWorkByWorkIdWithoutCache } from '@/usecase/work'

export default async function Edit({
  params: { workId },
}: {
  params: { workId: string }
}) {
  const work = await getMyWorkByWorkIdWithoutCache(workId)
  if (!work) notFound()

  return <Editor work={work} />
}
