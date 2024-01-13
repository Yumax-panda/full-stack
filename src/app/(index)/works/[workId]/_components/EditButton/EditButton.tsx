'use client'

import { useRouter } from 'next/navigation'

import { routes } from '@/lib/routes'
import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'

type Props = {
  workId: string
}

export const EditButton = ({ workId }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant='contained'
      startIcon={<Edit />}
      onClick={() => router.push(routes.createNewWork(workId))}
    >
      編集
    </Button>
  )
}
