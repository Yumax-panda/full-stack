import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getArticleTokenByUserId } from '@/repository/articleToken'
import { getUserById } from '@/repository/user'
import { Box } from '@mui/material'

import { EditProfileForm } from './_components/EditProfileForm'
import { TokenForm } from './_components/TokenForm'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()
  const user = await getUserById(session.user.id)

  if (!user) return notFound()
  const tokens = await getArticleTokenByUserId(user.id)

  return (
    <Box>
      <EditProfileForm {...user} />
      <TokenForm tokens={tokens} userId={user.id} />
    </Box>
  )
}
