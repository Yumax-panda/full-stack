import { LoginOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { signIn } from 'next-auth/react'

export const SignInIconButton = () => (
  <Tooltip
    title='ログイン'
    placement='bottom'
    arrow
    sx={{
      border: '0.5px lightgray solid',
    }}
  >
    <IconButton
      size='large'
      aria-label='sign in'
      onClick={() => signIn()}
      color='inherit'
    >
      <LoginOutlined />
    </IconButton>
  </Tooltip>
)
