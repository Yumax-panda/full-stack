'use client'

import { useSession } from 'next-auth/react'
import { AddButtonBase } from '../../../_components/AddButtonBase'
import { useAddWork } from '../hooks/useAddWork'

type Props = {
  userId: string
}

export const WorkAddButton = ({ userId }: Props) => {
  const { data: session } = useSession()
  const isMyPage = session?.user?.id === userId && session?.user?.id
  const { addNewWorkAndRedirect, isLoading } = useAddWork()

  if (!isMyPage) {
    return null
  }

  return (
    <AddButtonBase
      text='活動記録を追加'
      onClick={addNewWorkAndRedirect}
      disabled={isLoading}
    />
  )
}
