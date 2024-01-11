'use client'

import { useSession } from 'next-auth/react'

import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

import { AccountIconButton } from '../AccountIconButton.tsx'
import { SignInIconButton } from '../SignInIconButton.tsx/SignInIconButton'

export const Header = () => {
  const { data: session } = useSession()
  const user = session?.user ?? null

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Full Stack
          </Typography>

          <Typography
            variant='h5'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Full Stack
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {user ? <AccountIconButton {...user} /> : <SignInIconButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
