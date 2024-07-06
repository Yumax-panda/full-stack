import { Box } from '@mui/material'
import { notFound } from 'next/navigation'

import { BackButton } from '../../_components/BackButton'

import { Content } from './_components/Content'
import { EditButton } from './_components/EditButton'

import type { Metadata } from 'next'

import { Breadcrumbs } from '@/app/_components/Breadcrumbs'
import { getSession } from '@/lib/auth'
import { env } from '@/lib/env.mjs'
import { formatDate } from '@/lib/formatDate'
import { ogImagePaths, routes } from '@/lib/routes'
import { getSignedUrl } from '@/lib/signature'
import { userParser } from '@/parser'
import { getWorkById } from '@/repository/work'

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
          borderBottom: '1px solid lightgray',
          pb: '1rem',
        }}
      >
        <BackButton userId={work.userId} />
        {isMyWork && <EditButton workId={work.id} />}
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <Breadcrumbs
          links={[
            {
              href: routes.userSkill(work.userId),
              label: work.user.name || '無名',
            },
            { href: routes.workDetail(work.id), label: work.title || '無題' },
          ]}
        />
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
    title: `${work.title || '無題'} | ${user.name}`,
    description: `更新日 ${formatDate(work.updatedAt)}`,
    openGraph: {
      title: `${work.title || '無題'} | ${user.name}`,
      description: `更新日 ${formatDate(work.updatedAt)}`,
      url: `${env.NEXTAUTH_URL}${routes.workDetail(work.id)}`,
      siteName: 'Full Stack',
      images: [
        {
          url: ogImagePaths.base(signedUrl),
          width: 500,
          height: 500,
          alt: `${work.title || '無題'} | ${user.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${work.title || '無題'} | ${user.name}`,
      description: `更新日 ${formatDate(work.updatedAt)}`,
    },
  }
}
