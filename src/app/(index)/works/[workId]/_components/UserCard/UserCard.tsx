import type { User } from '@prisma/client'
import { Avatar, Box, Typography } from '@mui/material'
import { routes } from '@/lib/routes'
import Link from 'next/link'

type Props = {
  user: Pick<User, 'id' | 'name' | 'image' | 'bio'>
}

export const UserCard = ({ user: { id, name, image, bio } }: Props) => {
  return (
    <Box sx={{ backgroundColor: '#F8F9FC', p: '7px', borderRadius: '7px' }}>
      <Box sx={{ display: 'flex' }}>
        <Link href={routes.userSkill(id)} prefetch>
          <Avatar
            src={image || undefined}
            alt={name || 'user name'}
            sx={{ width: 70, height: 70 }}
          />
        </Link>
        <Typography variant='h6' sx={{ ml: 2, my: 'auto' }}>
          {name || '無名'}
        </Typography>
      </Box>
      {bio && (
        <Typography variant='body1' sx={{ my: '0.5rem' }}>
          {bio}
        </Typography>
      )}
    </Box>
  )
}
