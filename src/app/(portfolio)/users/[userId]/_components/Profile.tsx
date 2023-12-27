import { Container } from '@/app/_components/Container/Container';
import { Avatar, Grid, Typography } from '@mui/material';

import type { User } from '@/models'

type Props = {
  userId: string
}

const getProfile = async (userId: string): Promise<User> => {
  return {
    id: userId,
    name: 'John Doe',
    location: 'Tokyo',
    organization: 'Full Stack',
    image: "",
    email: null,
    emailVerified: null
  }
}

export default async function Profile({ userId }: Props) {
  const user = await getProfile(userId)

  return (
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
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              lineHeight: '3rem',
            }}
          >
            {user.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2rem',
              lineHeight: '2rem',
            }}
          >
            {user.location} / {user.organization}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2rem',
              lineHeight: '2rem',
            }}
          >
            ID: {user.id}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
