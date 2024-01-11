import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { routes } from '@/lib/routes'
import { AccountCircleOutlined, LogoutOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'

import { useMenu } from '../hooks/useMenu'

import type { User } from '@prisma/client'

type Props = Pick<User, 'id' | 'name' | 'image'>

export const AccountIconButton = ({ id, name, image }: Props) => {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMenu()

  const router = useRouter()

  const redirectToMyPage = () => router.push(routes.userSkill(id))

  const handleSignOut = () => {
    signOut()
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
        <Avatar src={image || undefined} />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <Typography>{name}</Typography>
        </MenuItem>
        <MenuItem onClick={redirectToMyPage}>
          <AccountCircleOutlined sx={{ mr: 1 }} />
          マイページ
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutOutlined sx={{ mr: 1 }} />
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  )
}
