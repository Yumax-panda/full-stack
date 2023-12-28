import { notFound } from 'next/navigation'

import { Container } from '@/app/_components/Container/Container'
import { getUserById } from '@/repository/user'
import { Avatar, Grid, Typography } from '@mui/material'

type Props = {
  userId: string
}

export default async function Profile({ userId }: Props) {
  const user = await getUserById(userId)
  if (!user) notFound()

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
