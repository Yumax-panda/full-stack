import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getWorkById } from '@/repository/work'
import { Box } from '@mui/material'

import { BackButton } from '../../_components/BackButton'
import { Content } from './_components/Content'
import { EditButton } from './_components/EditButton'
import { userParser } from '@/parser'
import { getSignedUrl } from '@/lib/signature'
import { env } from '@/lib/env.mjs'
import { routes, ogImagePaths } from '@/lib/routes'
import { formatDate } from '@/lib/formatDate'

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <BackButton userId={work.userId} />
        {isMyWork && <EditButton workId={work.id} />}
      </Box>
      <Content {...work} />
    </>
  )
}

export async function generateMetadata({
  params: { workId },
}: {
  params: {
    workId: string
  }
}): Promise<Metadata> {
  const work = await getWorkById(workId)
  if (!work) notFound()

  const { user } = work
  const signedUrl = await getSignedUrl(userParser.toString(user))

  return {
    metadataBase: new URL(env.NEXTAUTH_URL),
    title: `${work.title} | ${user.name}`,
    description: `更新日 ${formatDate(work.updatedAt)}`,
    openGraph: {
      title: `${work.title} | ${user.name}`,
      description: `更新日 ${formatDate(work.updatedAt)}`,
      url: `${env.NEXTAUTH_URL}${routes.workDetail(work.id)}`,
      siteName: 'Full Stack',
      images: [
        {
          url: ogImagePaths.base(signedUrl),
          width: 500,
          height: 500,
          alt: `${work.title} | ${user.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${work.title} | ${user.name}`,
      description: `更新日 ${formatDate(work.updatedAt)}`,
    },
  }
}
