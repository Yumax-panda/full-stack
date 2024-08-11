import { Avatar, Box, Typography } from '@mui/material'

import { CardContainer } from '../CardContainer'

import type { User } from '@prisma/client'

import { Link } from '@/app/_components/Link'
import { routes } from '@/lib/routes'

type Props = {
  user: Pick<User, 'id' | 'name' | 'image' | 'bio'>
}

export const UserCard = ({ user: { id, name, image, bio } }: Props) => {
  return (
    <CardContainer>
      <Box sx={{ display: 'flex' }}>
        <Link href={routes.userSkill(id)}>
          <Avatar
            src={image || undefined}
            alt={name || 'user name'}
            sx={{ width: 70, height: 70 }}
          />
        </Link>
        <Typography variant='h6' sx={{ ml: 2, my: 'auto' }} component='div'>
          {name || '無名'}
        </Typography>
      </Box>
      {bio && (
        <Typography variant='body1' sx={{ my: '0.5rem' }}>
          {bio}
        </Typography>
      )}
    </CardContainer>
  )
}
