import { Box } from '@mui/material'
import { notFound } from 'next/navigation'

import { TopContent } from '../_components/TopContent'

import type { Metadata } from 'next'

import { Breadcrumbs } from '@/app/_components/Breadcrumbs'
import { getSession } from '@/lib/auth'
import { env } from '@/lib/env.mjs'
import { routes } from '@/lib/routes'
import { getArticleTokenByUserId } from '@/repository/articleToken'
import { getUserById } from '@/repository/user'

export const metadata: Metadata = {
  title: 'ユーザー詳細を編集',
  metadataBase: new URL(env.NEXTAUTH_URL),
  openGraph: {
    title: 'ユーザー詳細を編集',
  },
}

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()
  const user = await getUserById(session.user.id)

  if (!user) return notFound()
  const tokens = await getArticleTokenByUserId(user.id)

  return (
    <Box>
      <TopContent userId={user.id} />
      <Box sx={{ my: '1.5rem' }}>
        <Breadcrumbs
          links={[
            { href: routes.userProfileSettings(), label: 'ユーザー詳細を編集' },
          ]}
        />
      </Box>
    </Box>
  )
}
