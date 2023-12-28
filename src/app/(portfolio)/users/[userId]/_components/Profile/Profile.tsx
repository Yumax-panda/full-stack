import { Container } from '@/app/_components/Container/Container'
import { CorporateFare, LocationOn } from '@mui/icons-material'
import { Avatar, Box, Grid, Typography } from '@mui/material'

import { Tabs } from '../Tabs'

import type { User } from '@prisma/client'

type Props = Pick<User, 'name' | 'location' | 'organization' | 'image' | 'id'>
type FieldProps = {
  icon: React.ReactNode
  text: string
}

const Field = ({ icon, text }: FieldProps) => (
  <Box sx={{ display: 'flex' }}>
    <Box sx={{ mr: '0.5rem' }}>{icon}</Box>
    <Typography>{text}</Typography>
  </Box>
)

export const Profile = ({ name, location, organization, image, id }: Props) => (
  <Container>
    <Grid container sx={{ py: '2rem' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <Avatar
          sx={{
            margin: 'auto',
            width: '8rem',
            height: '8rem',
            fontSize: '4rem',
          }}
          src={image || undefined}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'left',
          },
          margin: 'auto',
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            lineHeight: '3rem',
          }}
        >
          {name}
        </Typography>
        {location && <Field icon={<LocationOn />} text={location} />}
        {organization && <Field icon={<CorporateFare />} text={organization} />}
        <Typography
          sx={{
            fontSize: '1.2rem',
            lineHeight: '2rem',
            textAlign: 'left',
          }}
        >
          ID: {id}
        </Typography>
      </Grid>
    </Grid>
    <Tabs userId={id} />
  </Container>
)
