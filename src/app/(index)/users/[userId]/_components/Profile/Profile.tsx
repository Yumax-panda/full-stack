import { CorporateFare, LocationOn } from '@mui/icons-material'
import { Avatar, Box, Stack, Typography } from '@mui/material'

import { Tabs } from '../Tabs'

import type { User } from '@prisma/client'

type Props = Pick<
  User,
  'name' | 'location' | 'organization' | 'image' | 'id' | 'bio'
>
type FieldProps = {
  icon: React.ReactNode
  text: string
}

const Field = ({ icon, text }: FieldProps) => (
  <Box sx={{ display: 'flex' }}>
    <Box>{icon}</Box>
    <Typography variant='body1'>{text}</Typography>
  </Box>
)

export const Profile = ({
  name,
  location,
  organization,
  image,
  id,
  bio,
}: Props) => (
  <div>
    <Box
      sx={{
        py: '2rem',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Avatar
          sx={{
            margin: { xs: 0, sm: 'auto' },
            width: '8rem',
            height: '8rem',
          }}
          src={image || undefined}
          alt={name || "user's icon"}
        />
      </Box>
      <Stack
        spacing={1}
        sx={{
          textAlign: 'left',
          ml: {
            xs: 0,
            sm: '5%',
          },
          m: 'auto',
          p: '1rem',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
          {name}
        </Typography>
        {bio && <Typography variant='body1'>{bio}</Typography>}
        {location && <Field icon={<LocationOn />} text={location} />}
        {organization && <Field icon={<CorporateFare />} text={organization} />}
      </Stack>
    </Box>
    <Tabs userId={id} />
  </div>
)
