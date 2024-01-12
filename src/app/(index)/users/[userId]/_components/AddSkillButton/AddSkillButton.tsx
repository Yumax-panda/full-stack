'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { routes } from '@/lib/routes'

import { AddButtonBase } from '../AddButtonBase'

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
