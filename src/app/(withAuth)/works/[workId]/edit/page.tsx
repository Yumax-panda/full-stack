import { notFound } from 'next/navigation'

import { getMyWorkByWorkId } from '@/usecase/work'

import { Editor } from './_components/Editor/Editor'

export default async function Edit({
  params: { workId },
}: {
  params: { workId: string }
}) {
  const work = await getMyWorkByWorkId(workId)
  if (!work) notFound()

  return <Editor work={work} />
}
