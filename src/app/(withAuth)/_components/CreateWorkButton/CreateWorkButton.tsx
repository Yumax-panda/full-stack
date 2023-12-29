'use client'

import { CreateWorkButtonBase } from './CreateWorkButtonBase'
import { startNewWorkAction } from './action'

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
