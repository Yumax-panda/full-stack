import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { env } from '@/lib/env.mjs'
import { getSession } from '@/lib/auth'
import { getArticleTokenByUserId } from '@/repository/articleToken'
import { getUserById } from '@/repository/user'
import { Box } from '@mui/material'

import { TopContent } from '../_components/TopContent'
import { EditProfileForm } from './_components/EditProfileForm'
import { TokenForm } from './_components/TokenForm'

export const metadata: Metadata = {
  title: 'プロフィールを編集',
  metadataBase: new URL(env.NEXTAUTH_URL),
  openGraph: {
    title: 'プロフィールを編集',
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
      <EditProfileForm {...user} />
      <TokenForm tokens={tokens} userId={user.id} />
    </Box>
  )
}
