'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { AddButtonBase } from '../AddButtonBase'

import { routes } from '@/lib/routes'

type Props = {
  userId: string
}

export const AddSkillButton = ({ userId }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const isMyPage = session?.user?.id === userId
  const onClick = () => router.push(routes.userSkillEdit())

  if (!isMyPage) return null

  return <AddButtonBase onClick={onClick} text='スキルを登録する' />
}
