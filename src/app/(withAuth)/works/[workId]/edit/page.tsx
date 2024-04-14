import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { Editor } from './_components/Editor/Editor'

import type { Metadata } from 'next'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }
  const work = await getMyWorkByWorkIdWithoutCache(workId)
  if (!work) {
    notFound()
  }

  return <Editor work={work} />
}
