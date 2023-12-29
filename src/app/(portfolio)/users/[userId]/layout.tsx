import { notFound } from 'next/navigation'

import { getUserById } from '@/repository/user'
import { Box } from '@mui/material'

import { Profile } from './_components/Profile'

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
