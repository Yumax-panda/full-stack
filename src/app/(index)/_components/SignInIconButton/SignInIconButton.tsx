import { signIn } from 'next-auth/react'

import { LoginOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

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
      onClick={() => signIn('github')}
      color='inherit'
    >
      <LoginOutlined />
    </IconButton>
  </Tooltip>
)
