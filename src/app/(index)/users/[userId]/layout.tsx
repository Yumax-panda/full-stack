import { Box } from '@mui/material'
import { notFound } from 'next/navigation'

import { Profile } from './_components/Profile'
import { getUserById } from '@/repository/user'

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
      <Profile {...user} />
      <Box sx={{ py: '2rem' }}>{children}</Box>
    </Box>
  )
}
