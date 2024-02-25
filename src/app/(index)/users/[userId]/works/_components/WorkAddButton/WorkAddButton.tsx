'use client'

import { useSession } from 'next-auth/react'

import { AddButtonBase } from '../../../_components/AddButtonBase'

import { startNewWorkAction } from './action'

type Props = {
  userId: string
}

export const WorkAddButton = ({ userId }: Props) => {
  const { data: session } = useSession()
  const isMyPage = session?.user?.id === userId && session?.user?.id

  if (!isMyPage) {
    return null
  }

  const action = startNewWorkAction.bind(null, userId)

  return (
    <form action={action}>
      <AddButtonBase text='活動記録を追加' type='submit' />
    </form>
  )
}
