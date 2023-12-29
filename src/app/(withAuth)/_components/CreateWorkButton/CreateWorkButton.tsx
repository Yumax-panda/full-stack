'use client'

import { startNewWorkAction } from './action'
import { CreateWorkButtonBase } from './CreateWorkButtonBase'

type Props = {
  userId: string
}

export const CreateWorkButton = ({ userId }: Props) => {
  const action = startNewWorkAction.bind(null, userId)
  return (
    <form action={action}>
      <CreateWorkButtonBase />
    </form>
  )
}
