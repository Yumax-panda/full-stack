import { notFound, redirect } from 'next/navigation'

import { Editor } from './_components/Editor/Editor'

import type { Metadata } from 'next'

import { getSession } from '@/lib/auth'
import { env } from '@/lib/env.mjs'
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
  const session = await getSession()
  if (!session) {
    notFound()
  }
  const work = await getMyWorkByWorkIdWithoutCache(workId)
  if (!work) {
    notFound()
  }

  return <Editor work={work} />
}
