import { Avatar, Box, Typography } from '@mui/material'

import type { User } from '@prisma/client'

import { Link } from '@/app/_components/Link'
import { routes } from '@/lib/routes'

type Props = {
  user: Pick<User, 'id' | 'name' | 'image' | 'bio'>
}

export const UserSummary = ({ user: { id, name, image, bio } }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Link href={routes.userSkill(id)}>
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
      <Box sx={{ pl: '1rem', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6' sx={{ my: 'auto' }} component='div'>
          {name}
        </Typography>

        {bio && (
          <Typography
            variant='caption'
            sx={{ color: 'text.secondary', my: 'auto' }}
          >
            {bio}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
