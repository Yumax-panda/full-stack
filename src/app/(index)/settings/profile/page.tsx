import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getUserById } from '@/repository/user'
import { Box } from '@mui/material'

import { EditProfileForm } from './_components/EditProfileForm'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()
  const user = await getUserById(session.user.id)

  if (!user) return notFound()

  return (
    <Box>
      <EditProfileForm {...user} />
    </Box>
  )
}
