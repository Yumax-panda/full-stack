import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'

type Props = {
  tagId?: string
}

type UseDeleteTagReturn = {
  onDelete: (_: any) => Promise<void>
  isDeleting: boolean
}

export const useDeleteTag = ({ tagId }: Props): UseDeleteTagReturn => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const { task: onDelete } = useToastPromise({
    pending: 'タグを削除中...',
    success: 'タグを削除しました',
    setIsLoading: setIsDeleting,
    action: async (_: any) => {
      if (!tagId) {
        throw new Error('タグのIDが指定されていません')
      }
      const res = await client.api.tags[':tagId'].$delete({ param: { tagId } })
      if (!res.ok) {
        throw new Error('タグの削除に失敗しました')
      }
      router.refresh()
    },
  })

  return {
    onDelete,
    isDeleting,
  }
}
