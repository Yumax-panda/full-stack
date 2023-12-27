'use client'

import { signIn } from 'next-auth/react'

type Props = {
  id: string
}

export const SigninButton = ({ id }: Props) => {
  return (
    <button className='btn btn-primary' onClick={() => signIn(id)}>
      Sign in
    </button>
  )
}
