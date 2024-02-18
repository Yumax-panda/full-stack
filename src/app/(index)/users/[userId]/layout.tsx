import type { Metadata } from 'next'
import { Box } from '@mui/material'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/app/_components/Breadcrumbs'
import { Profile } from './_components/Profile'
import { getUserById } from '@/repository/user'
import { userParser } from '@/parser'
import { getSignedUrl } from '@/lib/signature'
import { env } from '@/lib/env.mjs'
import { routes, ogImagePaths } from '@/lib/routes'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const user = await getUserById(params.userId)
  if (!user) notFound()

  return (
    <Box>
      <Breadcrumbs
        links={[
          { href: routes.top(), label: 'ホーム' },
          { href: routes.userSkill(user.id), label: user.name || '無名' },
        ]}
      />
      <Profile {...user} />
      <Box sx={{ py: '2rem' }}>{children}</Box>
    </Box>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { userId: string }
}): Promise<Metadata> {
  const user = await getUserById(params.userId)
  if (!user) notFound()
  const signedUrl = await getSignedUrl(userParser.toString(user))
  return {
    metadataBase: new URL(env.NEXTAUTH_URL),
    title: `${user.name} | Full Stack`,
    description: `${user.name}さんのポートフォリオ`,
    openGraph: {
      title: `${user.name} | Full Stack`,
      description: `${user.name}さんのポートフォリオ`,
      url: `${env.NEXTAUTH_URL}${routes.userSkill(params.userId)}`,
      siteName: 'Full Stack',
      images: [
        {
          url: ogImagePaths.base(signedUrl),
          width: 500,
          height: 500,
          alt: `${user.name}さんのポートフォリオ`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${user.name} | Full Stack`,
      description: `${user.name}さんのポートフォリオ`,
    },
  }
}
