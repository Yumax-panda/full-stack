import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { Box } from '@mui/material'

import { EditProfileForm } from './_components/EditProfileForm'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()
  return (
    <Box>
      <EditProfileForm {...session.user} />
    </Box>
  )
}
