'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { routes } from '@/lib/routes'
import { Button } from '@mui/material'

export const SigninButton = () => {
  const { data: session } = useSession()
  const user = session?.user ?? null
  const router = useRouter()

  const onClick = user
    ? () => router.push(routes.userSkill(user.id))
    : () => signIn('github')
  const message = user ? 'マイページへ' : 'ログイン / 新規登録'

  return (
    <Button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'lightgray',
        color: 'black',
        textDecoration: 'none',
      }}
    >
      {message}
    </Button>
  )
}
