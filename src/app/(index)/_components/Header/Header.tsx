'use client'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import OriginalLink from 'next/link'
import { useSession } from 'next-auth/react'

import { AccountIconButton } from '../AccountIconButton'
import { SignInIconButton } from '../SignInIconButton'

import { Container } from '@/app/_components/Container/Container'
import { routes } from '@/lib/routes'

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
