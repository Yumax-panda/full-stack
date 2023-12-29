'use client'

import { Button } from '@mui/material'

import { startNewWorkAction } from './action'

type Props = {
  userId: string
}

export const CreateWorkButton = ({ userId }: Props) => {
  const action = startNewWorkAction.bind(null, userId)
  return (
    <form action={action}>
      <Button type='submit'>新規追加</Button>
    </form>
  )
}
