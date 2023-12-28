'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@mui/material'

export const SigninButton = () => (
  <Button
    onClick={() => signIn()}
    style={{
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'lightgray',
      color: 'black',
      textDecoration: 'none',
    }}
  >
    ログイン / 新規登録
  </Button>
)
