'use client'

import { useSession } from 'next-auth/react'
import OriginalLink from 'next/link'

import { Container } from '@/app/_components/Container/Container'
import { routes } from '@/lib/routes'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { AccountIconButton } from '../AccountIconButton.tsx'
import { SignInIconButton } from '../SignInIconButton'

type LinkProps = {
  children: React.ReactNode
}

const Link = ({ children }: LinkProps) => (
  <OriginalLink
    href={routes.top()}
    style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
  >
    {children}
  </OriginalLink>
)

export const Header = () => {
  const { data: session } = useSession()
  const user = session?.user ?? null

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Link>
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

          <Link>
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
