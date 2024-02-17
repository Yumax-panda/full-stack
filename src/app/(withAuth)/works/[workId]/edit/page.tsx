import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { env } from '@/lib/env.mjs'

import { Editor } from './_components/Editor/Editor'
import { getMyWorkByWorkIdWithoutCache } from '@/usecase/work'

export const metadata: Metadata = {
  title: '制作記録を編集',
  metadataBase: new URL(env.NEXTAUTH_URL),
  openGraph: {
    title: '制作記録を編集',
  },
}

export default async function Edit({
  params: { workId },
}: {
  params: { workId: string }
}) {
  const work = await getMyWorkByWorkIdWithoutCache(workId)
  if (!work) notFound()

  return <Editor work={work} />
}
