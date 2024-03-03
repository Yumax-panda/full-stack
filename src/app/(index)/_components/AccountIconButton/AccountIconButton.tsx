import {
  AccountCircleOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'

import { useMenu } from '../hooks/useMenu'

import type { Session } from 'next-auth'

import { routes } from '@/lib/routes'

type User = NonNullable<Session['user']>
type Props = Pick<User, 'id' | 'name' | 'image'>

export const AccountIconButton = ({ id, name, image }: Props) => {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMenu()

  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <NextLink
      href={href}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={handleCloseMenu}
      prefetch
    >
      {children}
    </NextLink>
  )

  const handleSignOut = () => {
    signOut()
    handleCloseMenu()
  }

  return (
    <div>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenMenu}
        color='inherit'
      >
        <Avatar
          src={image || undefined}
          alt='user icon'
          sx={{
            width: 40,
            height: 40,
          }}
        />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
      >
        <Link href={routes.userSkill(id)}>
          <MenuItem>
            <Typography>{name}</Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={routes.userSkill(id)}>
          <MenuItem>
            <AccountCircleOutlined sx={{ mr: 1 }} />
            マイページ
          </MenuItem>
        </Link>
        <Link href={routes.userProfileSettings()}>
          <MenuItem>
            <SettingsOutlined sx={{ mr: 1 }} />
            設定
          </MenuItem>
        </Link>

        <MenuItem onClick={handleSignOut}>
          <LogoutOutlined sx={{ mr: 1 }} />
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  )
}
