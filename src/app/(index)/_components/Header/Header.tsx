'use client'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { AccountIconButton } from '../AccountIconButton'
import { SignInIconButton } from '../SignInIconButton'

import { Container } from '@/app/_components/Container/Container'
import { Link } from '@/app/_components/Link'
import { routes } from '@/lib/routes'

export const Header = () => {
  const { data: session } = useSession()
  const user = session?.user ?? null

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Link href={routes.top()} style={{ flexGrow: 1 }}>
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Full Stack
            </Typography>
          </Link>

          <Link
            href={routes.top()}
            style={{ flexGrow: 1 }}
            aria-label='top-page'
          >
            <Typography
              variant='h5'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Full Stack
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            {user ? <AccountIconButton {...user} /> : <SignInIconButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
