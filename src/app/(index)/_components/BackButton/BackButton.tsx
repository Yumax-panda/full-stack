'use client'

import { ArrowBackOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'

import { routes } from '@/lib/routes'

type Props = {
  userId: string
}

export const BackButton = ({ userId }: Props) => {
  const router = useRouter()
  const back = () => router.push(routes.userSkill(userId))

  return (
    <Tooltip title='プロフィールへ戻る' arrow placement='top-start'>
      <IconButton onClick={back}>
        <ArrowBackOutlined />
      </IconButton>
    </Tooltip>
  )
}
