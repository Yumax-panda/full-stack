import type { User } from '@prisma/client'
import { routes } from '@/lib/routes'
import { Avatar, Box, Typography } from '@mui/material'
import Link from 'next/link'

export type Props = {
  user: Pick<User, 'id' | 'name' | 'image' | 'bio'>
}

export const UserSummary = ({ user: { id, name, image, bio } }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Link href={routes.userSkill(id)} prefetch>
        <Avatar
          src={image || undefined}
          alt='user avatar'
          sx={{
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            m: 'auto',
          }}
        />
      </Link>
      <Box sx={{ pl: '1rem', display: 'flex' }}>
        <Typography variant='h4' sx={{ my: 'auto' }}>
          {name}
        </Typography>

        <Typography
          variant='body1'
          sx={{ color: 'text.secondary', my: 'auto' }}
        >
          {bio}
        </Typography>
      </Box>
    </Box>
  )
}
