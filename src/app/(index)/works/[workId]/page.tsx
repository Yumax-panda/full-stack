import { notFound } from 'next/navigation'

import { Tiptap } from '@/app/(withAuth)/works/[workId]/edit/_components/Tiptap/Tiptap'
import { getPublicWork } from '@/repository/work'
import { Container } from '@mui/material'

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

  return (
    <Container>
      <h1>{work.title}</h1>
      <Tiptap content={work.content || ''} editable={false} />
    </Container>
  )
}
